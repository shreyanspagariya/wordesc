<?php
include('../inc/connect.inc.php');

session_start();
$email = $_SESSION["email"];

$password = mysqli_real_escape_string($con,$_POST['password']);

if($password == "")
{
	$result = array('msg'=>'empty_pass');
	echo json_encode($result);
}
else
{
	$password = md5($password);
	mysqli_query($con,"UPDATE users SET password='$password' WHERE email='$email'");

	$result = array('msg'=>'success');
	echo json_encode($result);
}

?>