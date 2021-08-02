<?php

ini_set( 'display_errors', E_ALL ); 
error_reporting( E_ALL );


$output = ["status" => 200, "notify" => []];	
$response_code = 200;




switch ($_REQUEST["action"]) {
	
	
	case "login_admin":
		$params = json_decode(file_get_contents("php://input"), TRUE);
		$user_id = iDB::value("SELECT id FROM users WHERE `login`=" . iS::sq( $params["login"] ) . " AND `password`=" . iS::sq( $params["password"] ));
		
		if ( is_null($user_id) ) $output["status"] = 401; else $_SESSION["user"]["id"] = $user_id;
	break;
	
	case "logout":
		unset( $_SESSION["user"] );
	
	break;
	

	
	default: 
		$response_code = 200;	
};




http_response_code( $response_code );
echo json_encode($output);
exit();