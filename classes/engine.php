<?php

class engine {
	
	
	function load( $url ) {
		
		$path = str_ireplace(basename(__FILE__),'',__FILE__);
		$coockie=$path."cookie.txt";
		$userAgent='Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3';

		$ch = curl_init( $url ); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_USERAGENT, $userAgent); 
		curl_setopt($ch, CURLOPT_TIMEOUT, 10); 
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
		curl_setopt($ch, CURLOPT_COOKIEJAR, $coockie);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $coockie);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

		$text = curl_exec($ch); 
		//$text = iconv("CP1251", "UTF-8",$text);
		curl_close($ch); 
		
		return $text;
		
	}
	
	
}

