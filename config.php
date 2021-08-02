<?php

require_once("ini.php");


mb_internal_encoding("UTF-8");

session_set_cookie_params( $ini["session"]["time"], $ini["base_url"], false, false );
ini_set('session.gc_maxlifetime', $ini["session"]["time"] );
ini_set('session.use_cookies', 1);
session_start();


ini_set('display_errors', E_ALL & ~E_DEPRECATED); 
error_reporting( E_ALL & ~E_DEPRECATED );


/* Константы по работе с БД */

//define("ASSETS_PATH", "assets");
//define("LIBS_PATH", "libs");
define( 'ROOT', $ini["root"] );
define( 'DB_HOST', $ini["db"]["host"] );
define( 'DB_USER', $ini["db"]["user"] );
define( 'DB_PASSWORD', $ini["db"]["password"] );
define( 'DB_NAME', $ini["db"]["name"] );
define( 'DB_CHARSET', $ini["db"]["charset"] );
define( 'DB_COLLATION', $ini["db"]["collation"] );

define( 'BASE_URL', $ini["base_url"] );			



// ~~~~~~~~~~~~~~~~~~~~~~~		Автозагрузка
function main_autoload( $class_name ) {
	
	$filename = ROOT . 'classes/'.$class_name.'.php';
	
	if ( file_exists($filename) ) require_once($filename); 
	else trigger_error("Не найден класс {$class_name} [{$filename}]", E_USER_ERROR);
	
};
spl_autoload_register('main_autoload');


date_default_timezone_set( $ini["timezone"] );
iDB::exec("SET `time_zone`='".date('P')."'");


if ( file_exists("dev") ) require_once("dev/index.php");