<?php 
	include ("../inc/connect.inc.php");
	
	session_start();
	session_destroy();

	$result = array('msg' => "success");
	echo json_encode($result);
?>