<?php
	include("../inc/connect.inc.php");

	$datetime = getDateTimeIST();

	session_start();
	$user_id = $_SESSION["user_id"];

	$word = mysqli_real_escape_string($con,$_POST['word']);
	$description = mysqli_real_escape_string($con,$_POST['description']);

	if(strlen($word) == 0)
	{
		$result = array('msg' => "no_word");
		echo json_encode($result);
	}
	else if(strlen($description) == 0)
	{
		$result = array('msg' => "no_desc");
		echo json_encode($result);
	}
	else if(strlen($description) > 200)
	{
		$result = array('msg' => "long");
		echo json_encode($result);
	}
	else
	{
		$word = base64_encode($word);
		$description = base64_encode($description);

		mysqli_query($con,"INSERT INTO descriptions (word,user_id,description,time_described) VALUES ('$word','$user_id','$description','$datetime')");

		$result = array('msg' => "success");
		echo json_encode($result);
	}
?>