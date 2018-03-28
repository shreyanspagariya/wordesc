<?php
	include ("../inc/connect.inc.php");

	$id_token = mysqli_real_escape_string($con,$_POST['id_token']);
	$result = file_get_contents("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$id_token", false);
	$res1 = json_decode($result, true);

	$fname = $res1['given_name'];
	$lname = $res1['family_name'];
	$google_id = $res1['sub'];
	$email = $res1['email'];
	$google_locale = $res1['locale'];
	if(array_key_exists("picture",$res1))
	{
		$google_picture_url = $res1['picture'];
	}
	else
	{
		$google_picture_url = "https://s.ytimg.com/yts/img/avatar_720-vflYJnzBZ.png";
	}

	$query = "SELECT email FROM users WHERE email='$email'";
	$result = mysqli_query($con,$query);
	$numResults = mysqli_num_rows($result);

	if($numResults==0)
	{
		mysqli_query($con,"INSERT INTO users (fname,lname,email,google_id,google_picture_url,google_locale,verified) 
			VALUES ('$fname','$lname','$email','$google_id','$google_picture_url','$google_locale','1')");

		$result = array('msg'=>'success_signup','fname' => $fname);
		echo json_encode($result);
	}
	else
	{
		$query = "SELECT * FROM users WHERE email='$email'";
		$result = mysqli_query($con,$query);
		$get = mysqli_fetch_assoc($result);
		$google_id_before = $get['google_id'];
		$password = $get['password'];

		if($google_id_before=="")
		{
			mysqli_query($con,"UPDATE users SET google_id='$google_id', google_picture_url='$google_picture_url', 
				google_locale='$google_locale', verified='1' WHERE email='$email'");
		}

		mysqli_query($con,"UPDATE table2 SET google_picture_url='$google_picture_url' WHERE email='$email'");

		if($password!="")
		{
			$result = array('msg'=>'success_login');
			echo json_encode($result);
		}
		else
		{
			$result = array('msg'=>'success_login_no_pass','fname' => $fname);
			echo json_encode($result);
		}
	}

	$query = "SELECT * FROM users WHERE email='$email'";
	$result = mysqli_query($con,$query);
	$get = mysqli_fetch_assoc($result);

	session_start();
	$_SESSION["email"] = $email;
	$_SESSION["user_id"] = $get["id"];
?>