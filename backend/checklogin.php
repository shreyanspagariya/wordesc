<?php
	include("../inc/connect.inc.php");

	session_start();

	if(isset($_SESSION["email"]))
	{
		$email = $_SESSION["email"];

		$query = "SELECT * FROM users WHERE email='$email'";
		$result = mysqli_query($con,$query);
		$get = mysqli_fetch_assoc($result);
		$password = $get['password'];
		$fname = $get['fname'];

		if($password == "")
		{
			$result = array('loggedin' => "true", 'password' => "empty", 'fname' => $fname);
			echo json_encode($result);
		}
		else
		{
			$result = array('loggedin' => "true", 'password' => "non-empty");
			echo json_encode($result);
		}
	}
	else
	{
		$result = array('loggedin' => "false");
		echo json_encode($result);
	}
?>