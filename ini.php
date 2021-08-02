<?php

$ini["base_url"] = '/gnosis-dev/';

// временная зона сайта
$ini["timezone"] = 'Europe/Kiev';

// параметры доступа к БД
$ini["db"]["charset"] = "utf8";
$ini["db"]["collation"] = "utf8_general_ci";


$ini["db"]["host"] = "localhost";
$ini["db"]["user"] = "root";
$ini["db"]["name"] = "gnosis";
$ini["db"]["password"] = "";
$ini["is_local"] = 1;




// служебные настройки сайта
$ini["session"]["time"] = "30000";




// код ниже не менять!!!

if ( !isset($ini["root"]) ) {
	$self_fn = str_ireplace('\\','/',__FILE__);
	$ini["root"] = str_ireplace( basename($self_fn ), "", $self_fn );
};



