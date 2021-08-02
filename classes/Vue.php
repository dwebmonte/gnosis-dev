<?php

class Vue {
	
	public $request;
	public $db_scheme;
	public $output;
	
	private $store;




	// добавить / получить данные из хранилища
	public function store( $key = null, $data = null ) {
		
		if ( is_null( $key ) ) {
			return json_encode( $this->store );
		} else {
			$this->store[] = [ "name" => $key, "store" => $data, "key" => null ];		
		};
		
	}

	public function storeDB() {
		foreach ( $this->db_scheme["onload"] as $table_name => $fields ) {
			$this->store[] = [ 
				"name" => $table_name, 
				"store" => iDB::rows("SELECT ". implode(",", $fields) ." FROM `{$table_name}`"), 
				"request" => null 
			];		
		}
	}


	function checkAttrTypes( $method, $type, $attr ) {
		foreach ( $attr as $field_name => $field_value ) {
			if ( !$this->fieldExists( $method, $type, $field_name ) ) { unset( $attr[ $field_name ] ); continue;	};
		
			$attr[ $field_name ] = $this->validateField( $method, $type, $field_name, $attr[ $field_name ]  );
		};
		
		
		
		return $attr;
	}



	function createDBScheme( $merge_scheme = [] ) {

		$scheme = [ "onload" => [] ];

		foreach ( array_keys( DB::tables() ) as $table_name ) {
			foreach( DB::columns( $table_name ) as $column ) {
				$column_name = $column["name"];
				
				
				$scheme["onload"][$table_name][] = '`' . $column_name . '`';
				
				$scheme["fields"][ $table_name ][ $column_name ] = [
					"name" => $column["name"],
					"type" => $column["type"],
					"length" => $column["length"],
					"default" => $column["default"],
				];
				
				if ( in_array( $column["type"], ["int", "tinyint", "mediumint", "bigint"]) ) {
					$scheme["fields"][ $table_name ][ $column_name ]["validator"] = "int";
				};
				
				if ( $column["key"] == "PRI" ) {
					$scheme["primary"][ $table_name ][] = $column_name;
				};

			};
			
		};


		foreach ( DB::fkeys() as $item ) {
			$scheme["fk"][ $item["table"] ][ $item["column"] ] = [
				"name" => $item["fk_name"],
				"table" => $item["table"],
				"field" => $item["column"],
				"ref_table" => $item["ref_table"],
				"ref_field" => $item["ref_column"],
			];
		};

	
		$scheme = array_replace_recursive ( $scheme, $merge_scheme );

		$json = json_encode( $scheme, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
		file_put_contents("classes/db_scheme.json", $json);

	}
	
	
	function output() {
		http_response_code( $this->output["response_code"] );
		
		$output = $this->output["response"];
		$output["errors"] = $this->output["errors"];
		echo json_encode( $output );
		exit();		
	}
	

	function validateField( $method, $type, $field, $value ) {
		
		$validator = isset( $this->db_scheme["fields"][$type][$field]["validator"] ) ? $this->db_scheme["fields"][$type][$field]["validator"] : false;
		
		/*
		if ( $field == "cars_id" ) {
			var_dump("validator = " . $validator);
			var_dump("value = " . $value);
			var_dump(is_null($value));
			var_dump($value == "null");
			var_dump($value === "null");			
		};
		*/
		
		if ( $validator ) {
			switch ($validator) {
				
				case "bool":

					if ( is_null($value) || $value === "null" ) $value = null;					
					elseif ( $value == "true" ) $value = 1;
					elseif ( $value == "false" ) $value = 0;
					else $value = (int) (bool) $value;
				break;		

				case "int":
					if ( is_null($value) || $value === "null" ) $value = null;					
					else $value = (int) $value;
				break;	
					 
			
				default: 
					$this->error( "Unknown validator type={$validator}" );
			}
		};
		
		return $value;
	}

	function typeExists( $method, $type ) {
		return isset( $this->db_scheme["fields"][$type] );
	}
	
	function fieldExists( $method, $type, $field ) {
		if ( !$this->typeExists( $method, $type ) ) return false;
		
		$allowed_fields = $this->db_scheme["fields"][$type];
		unset( $allowed_fields["id"] );
		
		return isset( $allowed_fields[$field] );
	}
	
	function primaryKey( $type ) {
		if ( !$this->typeExists( 'get', $type ) ) return false;
		return $this->db_scheme["primary"][$type][0];
	}
	
	function foreignKeys( $type ) {
		if ( !$this->typeExists( 'get', $type ) ) return false;
		return isset($this->db_scheme["fk"][$type]) ? $this->db_scheme["fk"][$type] : [];
	}
	
	
	function error( $err_title, $err_text = false ) {
		
		if ( is_array( $err_title ) ) $error = $err_title;
		else {
			$error = ["title" => $err_title];
			if ( $err_text ) $error["text"] = $err_text;
		};
		
		$this->output["errors"][] = $error;
	}
	
	
	function __construct() {
		
		$this->request = new stdClass();
		
		$this->request->method = $_SERVER["REQUEST_METHOD"];
		$this->request->path = isset($_SERVER["PATH_INFO"]) ? $_SERVER["PATH_INFO"] : "/";
		// удаляем завершающий пробел
		$this->request->path = preg_replace("#(\w)/$#", "$1", $this->request->path);
		$this->request->paths = preg_split("#/#", $this->request->path, -1, PREG_SPLIT_NO_EMPTY);

		$this->request->post = json_decode(file_get_contents("php://input"), TRUE);
		if ( is_null($this->request->post) ) $this->request->post = [];

		parse_str( $_SERVER["QUERY_STRING"], $this->request->get );

		$this->request->var = array_merge_recursive( $this->request->post, $this->request->get );		
		
		
		
		$this->db_scheme = json_decode(file_get_contents("classes/db_scheme.json"), true);
		
		
		$this->output = [
			"response_code" => 200,
			"response" => [
				"data" => []
			],
			"errors" => []
		];
		
	}
	
	
}