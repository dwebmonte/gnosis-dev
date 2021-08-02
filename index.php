<?php

require_once("config.php");
require_once( ROOT . "classes/PhpUserAgent-master/module_ip_logs.php");

$engine = new engine();

$Vue = new Vue();


if ( isset($_REQUEST["action"])) require_once("actions.php");

$_SESSION["user"]["id"] = 1;

if ( isset($_SESSION["user"]["id"]) ) {
	
	
	$oUser = iDB::row("SELECT id, login, firstname, role, avatar FROM users WHERE id = " . iS::n($_SESSION["user"]["id"]));
	
	if ( is_null( $oUser ) || !isset($oUser->role) ) {
		unset( $_SESSION["user"]);
		header( 'Location: ' . BASE_URL ); 
		exit();
	};
	
	$role_id = $oUser->role;
	$oUser->role = iDB::value("SELECT `name` FROM `user_roles` WHERE id={$role_id}");
	$oUser->role_title = iDB::value("SELECT `title` FROM `user_roles` WHERE id={$role_id}");
	
	define("ACCESS", $oUser->role );
	
	$Vue->store( "session", $oUser );

	
} else {
	define("ACCESS", "public");	
};



// Базовые настройки сайта
$Vue->store( "app", ["base" => BASE_URL] );

if ( ACCESS !== "public" ) {
	$Vue->storeDB();
	
	// if ( ACCESS == "client" ) $content_template_index = "index-material-client.php"; else $content_template_index = "index-material.php";
	$content_template_index = "index-material.php";
	
} else {
	$content_template_index = "index-material-login.php";
};

$content_template_index = "index-material-test.php";


require_once("classes/index/{$content_template_index}");
