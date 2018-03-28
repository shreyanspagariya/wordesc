<?php
	include("../inc/connect.inc.php");

	$datetime = getDateTimeIST();

	$description_id = mysqli_real_escape_string($con,$_POST['description_id']);

	session_start();
	$user_id = $_SESSION["user_id"];

	$query = "SELECT * FROM descriptions WHERE id='$description_id'";
	$result = mysqli_query($con,$query);
	$get = mysqli_fetch_assoc($result);

	$likes_count = $get["likes_count"];

	$query = "SELECT * FROM likes WHERE description_id='$description_id' AND user_id='$user_id'";
	$result = mysqli_query($con,$query);
	$numResults = mysqli_num_rows($result);
	$get = mysqli_fetch_assoc($result);

	if($numResults==0)
	{
		mysqli_query($con, "INSERT INTO likes (description_id, user_id, time_liked, islike) VALUES ('$description_id','$user_id','$datetime','1')");
		mysqli_query($con, "UPDATE descriptions SET likes_count = likes_count+1 WHERE id='$description_id'");

		$result = array('islike' => 'true', 'likes_count' => $likes_count+1);
		echo json_encode($result);
	}
	else
	{
		$like_id = $get["id"];
		$islike = $get["islike"];
		$new_islike = !$islike;

		mysqli_query($con, "UPDATE likes SET islike='$new_islike', time_liked='$datetime' WHERE id='$like_id'");

		if($new_islike == 0)
		{
			mysqli_query($con, "UPDATE descriptions SET likes_count = likes_count-1 WHERE id='$description_id'");

			$result = array('islike' => 'false', 'likes_count' => $likes_count-1);
			echo json_encode($result);
		}
		else if($new_islike == 1)
		{
			mysqli_query($con, "UPDATE descriptions SET likes_count = likes_count+1 WHERE id='$description_id'");

			$result = array('islike' => 'true', 'likes_count' => $likes_count+1);
			echo json_encode($result);
		}
	}
?>