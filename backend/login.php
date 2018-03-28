<?php 
	include("../inc/connect.inc.php"); 

	$email1 = mysqli_real_escape_string($con,$_POST['email']);
	$password1 = mysqli_real_escape_string($con,$_POST['password']);
	$password2 = md5($password1);

	$strSQL = mysqli_query($con,"SELECT * from users where email='$email1' and password='$password2'");
	$Results = mysqli_fetch_array($strSQL);

	if(count($Results)>=1)
	{
		$query = "SELECT * FROM users WHERE email='$email1'";
		$result = mysqli_query($con,$query);
		$get = mysqli_fetch_assoc($result);

		session_start();
		$_SESSION["email"] = $email1;
		$_SESSION["user_id"] = $get["id"];

		$result = array('msg' => 'success');
		echo json_encode($result);
	}
	else
	{
		$result = array('msg' => 'invalid');
		echo json_encode($result);
	}
?>