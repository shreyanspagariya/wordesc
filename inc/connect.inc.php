<?php

define('DB_HOST','localhost');
define('DB_NAME','_');
define('DB_USER','root');
define('DB_PASSWORD','');

$con = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME) or die("Failed to connect to MySQL: " . mysql_error());

/*Global urls*/
$g_url = "http://localhost:8080/wordesc/";

/*Universally useful functions*/
function spit_ip()
{
	if(!empty($_SERVER['HTTP_CLIENT_IP'])) 
	{
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} 
	elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) 
	{
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} 
	else 
	{
	    $ip = $_SERVER['REMOTE_ADDR'];
	}
	return($ip);
}

function getDateTimeIST()
{
	date_default_timezone_set("Asia/Kolkata");
	return(date("Y-m-d H:i:sa"));
}

date_default_timezone_set('Asia/Kolkata');
function time_elapsed_string($datetime, $full = false) {
	
	$time = time() - strtotime($datetime);
	$time = ($time<1)? 1 : $time;
	$tokens = array (
		31536000 => 'year',
		2592000 => 'month',
		604800 => 'week',
		86400 => 'day',
		3600 => 'hour',
		60 => 'minute',
		1 => 'second'
	);

	foreach ($tokens as $unit => $text) 
	{
		if ($time < $unit) continue;
		$numberOfUnits = floor($time / $unit);
		return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'')." ago";
	}
}

?>