<?php

require_once( ROOT . "classes/PhpUserAgent-master/src/UserAgentParser.php");

if ( isset($_SESSION["user"]["id"]) ) {

	$log = [
		"host" => $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"],
		"ip" => $_SERVER["REMOTE_ADDR"]
	];

	if ( isset($_SESSION["user"]["id"]) ) {
		$log["user_id"] = $_SESSION["user"]["id"];
	};

	$ua_info = parse_user_agent(  $_SERVER["HTTP_USER_AGENT"] );

	if ( is_array($ua_info) && isset($ua_info["platform"]) && isset($ua_info["browser"]) && isset($ua_info["version"])	) {
		$log["platform"] = $ua_info["platform"];
		$log["browser"] = $ua_info["browser"];
		$log["version"] = $ua_info["version"];
	};

	iDB::insertSQL("ip_logs", $log);
	
};