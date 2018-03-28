<?php
	include("../inc/connect.inc.php");

	session_start();
	$email = $_SESSION["email"];

	$query = "SELECT * FROM users WHERE email='$email'";
	$result = mysqli_query($con,$query);
	$get = mysqli_fetch_assoc($result);

	$fname = $get["fname"];

	$result = array('fname' => $fname);
	echo json_encode($result);
?>