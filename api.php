<?php

require_once("config.php");

if ( isset($_REQUEST["filepond"]) )  {
	
	
	if ( isset($_REQUEST["load"]) ) {
		$upld_id = (int) $_REQUEST["load"];
		$upld = iDB::row("SELECT * FROM uploads WHERE id={$upld_id}");
		
		if ( !is_null($upld) ) {

			header('Access-Control-Expose-Headers: Content-Disposition, Content-Length, X-Content-Transfer-Id');
			header('Content-Type: ' . $upld ->type);
			header('Content-Length: ' . $upld ->size);
			header('Content-Disposition: inline; filename="'. $upld ->name . '"');    
			header('X-Content-Transfer-Id: ' . $upld_id);	
			
			echo file_get_contents( $upld ->rel_url );	
		};
		
	
	} elseif ( isset($_FILES['filepond'] ) ) {
		
		$upload_dir = 'uploads/';	
		$path_info = pathinfo($_FILES['filepond']['name']);

		$upload_filename = md5( time() . $_FILES['filepond']['name'] ) . "." . $path_info['extension'];
		$upload_file = $upload_dir . $upload_filename;	
		
		if (move_uploaded_file($_FILES['filepond']['tmp_name'], $upload_file)) {
		
			$row_insert = [
				"origin_name" => $_FILES['filepond']['name'],
				"type" => $_FILES['filepond']['type'],
				"size" => $_FILES['filepond']['size'],
				"name" => $upload_filename,
				"rel_url" => $upload_file,
				"user_id" => $_SESSION["user"]["id"]
			];
			
			$row_insert["md5"] = md5( $row_insert["origin_name"] . " / " .  $row_insert["type"] . " / " . $row_insert["size"]);
		
		
			$insert_id = iDB::insertSQL("uploads", $row_insert);
		
			echo $insert_id;	
			exit();
		} else {
			
		}
	}
};

if ( isset($_REQUEST["db_scheme"]) ) {

$scheme = [
/*
	"fields" => [
		"car_images" => [
			"manager_enabled" => [
				"validator" => "bool"
			],
			"senior_enabled" => [
				"validator" => "bool"
			],
			"service_enabled" => [
				"validator" => "bool"
			],
			"client_enabled" => [
				"validator" => "bool"
			],

		]
	]
*/
];


$vue = new Vue();
$vue->createDBScheme( $scheme );
echo "db scheme was updated";
exit();

};

$vue = new Vue();


$output = ["status" => 200, "notify" => []];	
$response_code = 200;
$params = json_decode(file_get_contents("php://input"), TRUE);

if (!isset($params["data"]) ) return false;

$updated_types = [];
$added_keys = [];
$replace_data = [];
$alias_pri = [];


$report_needs = false;
foreach ( $params["data"] as $key_req => $req ) {

	if ( !$vue->typeExists( $req["method"], $req["type"] ) ) {
		$vue->error([ "title" => "type not found", "text" => "type \"{$req["type"]}\" not found in scheme" ]);
		continue;
	};
	
	if ( !isset($req["attr"]) ) {
		$vue->error("Отсутствует параметр атрибутов attr");	
		continue;
	};


	
	$db_table = $req["type"];
	$method = $req["method"];
	
	$updated_types[ $db_table ] = true;
	
	// первичный ключ
	$pri_key = $vue->primaryKey( $db_table );
	
	// берем значение первичного ключа из атрибутов
	$pri_value = null;
	if ( isset($req["attr"][$pri_key]) ) $pri_value = $req["attr"][$pri_key];
	

	// предобработка атрибутов
	/*
	if ( $req["type"] == "votes" ) {
		if ( !isset($req["attr"]["user_created_id"]) ) $req["attr"]["user_created_id"] = $_SESSION["user"]["id"];
	};
	*/

	$attr = $vue->checkAttrTypes( $req["method"], $req["type"], $req["attr"] ) ;
	
	// обновляем родительские ключи	
	foreach ( $vue->foreignKeys($db_table) as $ref ) {
		if ( !isset($attr[$ref["field"]]) ) continue;
		
		if ( isset($alias_pri[ $ref["ref_table"] ][ $ref["ref_field"] ][ $attr[$ref["field"]] ]) ) {
			$attr[$ref["field"]] = $alias_pri[ $ref["ref_table"] ][ $ref["ref_field"] ][ $attr[$ref["field"]] ];
		};
	};
	
	/*
	if ( ( $db_table == "car_images" && isset($attr["cars_id"]) ) ) { 

		$updated_fk = ( isset($alias_pri["cars"]["id"][ $attr["cars_id"] ]) ) ? $alias_pri["cars"]["id"][ $attr["cars_id"] ] : false;
		if ( $updated_fk ) $attr["cars_id"] = $updated_fk;
		
	};
	*/	
		
	switch ( $req["method"] ) {
		
		case "delete":
			iDB::exec("DELETE FROM `{$db_table}` WHERE `{$pri_key}`={$pri_value}");
		break;
				
		// ~~~~~~~~~~~~~~				patch
		case "patch":
		
			if ( is_null($pri_value) ) { $vue->error(["title" => "Нет значения первичного ключа"]); continue;	};
			
			iDB::updateSQL( $db_table, $attr, "`{$pri_key}`={$pri_value}");				
		break;

		// ~~~~~~~~~~~~~~				post	
		case "post":
			
			$pri_value = iDB::insertSQL( $db_table, $attr );
				

			$old_pri_value = ( isset($req["attr"][$pri_key]) ) ? $req["attr"][$pri_key] : 0;
			$alias_pri[$db_table][$pri_key][$old_pri_value] = $pri_value;
			
		break;

		// ~~~~~~~~~~~~~~				replace
		case "replace":
		
			// получаем и обрабатываем ключи относительно которых будет удаление старых данных	
			if ( !isset( $req["key"] )  ) { $vue->error(["title" => "Отсутствует key для replace"]); continue; }
			elseif ( !isset( $req["key"]["name"] )  ) { $vue->error(["title" => "Отсутствует key[name] для replace"]); continue; }
			elseif ( !isset( $req["key"]["value"] )  ) { $vue->error(["title" => "Отсутствует key[value] для replace"]); continue; }
			elseif ( !$vue->fieldExists( $method, $db_table, $req["key"]["name"] ) ) { $vue->error(["title" => "Отсутствует key = \"{$req["key"]["name"]}\" в схеме базы для replace"]); continue; };

			$replace_key = $req["key"]["name"];
			$replace_value = $vue->validateField( $method, $db_table, $replace_key, $req["key"]["value"] );
			
			$replace_data[ $db_table ]["remove"] = [ "name" => $replace_key, "value" => $replace_value ];
			$replace_data[ $db_table ]["insert"][] = $attr;
			
		break;

		default: 
			$vue->error( ["title" => "unknown method = \"{$req["method"]}\""] );
			continue;
	};
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~					постобработка
	
	// if ( $db_table == 'vote_items_res' && in_array( $req["method"], ['post'] ) ) $report_needs = true;
	
};


foreach ( $replace_data as $repl_table => $repl_item ) {
	
	// удаляем старые значения
	iDB::delete( "DELETE FROM `{$repl_table}` WHERE `{$repl_item["remove"]["name"]}` = '{$repl_item["remove"]["value"]}'" );
	
	// вставляем новые значения
	foreach ( $repl_item["insert"] as $row_insert ) {
		iDB::insertSQL( $repl_table,  $row_insert );
	};
	
};	


// выборка данных для вывода
foreach ( $updated_types as $type => $item_type ) {
	$data_fetch = iDB::rows_assoc("SELECT * FROM `{$type}`", []);
	
	$vue->output["response"]["data"][] = [	
		"type" => $type,
		"data" => $data_fetch,
		"method" => "full update"
	];

};




$vue->output();