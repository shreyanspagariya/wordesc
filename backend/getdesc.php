<?php
	include("../inc/connect.inc.php");

	function is_seen($description_id, $seen, $size)
	{
		for($i=0; $i<$size; $i++)
		{
			if($description_id == $seen[$i])
			{
				return(1);
			}
		}
		return(0);
	}

	$datetime_now = getDateTimeIST();

	session_start();
	$user_id = $_SESSION["user_id"];

	$seen = [];
	$size = 0;
	$getposts = mysqli_query($con,"SELECT * FROM seen_desc WHERE user_id='$user_id'");
	while($row = mysqli_fetch_assoc($getposts))
	{
		$seen[$size++] = $row["description_id"];
	}

	$descid = [];
	$word = [];
	$description = [];
	$datetime = [];
	$likes = [];
	$islike = [];
	$count = 0;

	$getposts = mysqli_query($con,"SELECT * FROM descriptions ORDER BY likes_count DESC");
	while($row = mysqli_fetch_assoc($getposts))
	{
		if(!is_seen($row["id"], $seen, $size))
		{
			$descid[$count] = $row["id"];
			$word[$count] = base64_decode($row["word"]);
			$description[$count] = base64_decode($row["description"]);
			$datetime[$count] = time_elapsed_string($row["time_described"]);
			$likes[$count] = $row["likes_count"];

			$query = "SELECT * FROM likes WHERE description_id='$descid[$count]' AND user_id='$user_id'";
			$result = mysqli_query($con,$query);
			$get = mysqli_fetch_assoc($result);
			$numResults = mysqli_num_rows($result);

			if($numResults == 0)
			{
				$islike[$count] = 0;
			}
			else
			{
				$islike[$count] = $get["islike"];
			}

			mysqli_query($con, "INSERT INTO seen_desc (description_id, user_id, time_seen) VALUES ('$descid[$count]','$user_id','$datetime_now')");

			$count++;
			if($count >= 10)
			{
				break;
			}
		}
	}

	$result = array('descid' => $descid, 'words' => $word, 'descriptions' => $description, 'datetime' => $datetime, 'likes_count' => $likes, 'islike' => $islike);
	echo json_encode($result);
?>