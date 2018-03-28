function onSignIn(googleUser) 
{
	$("#wordesc").hide();
	$("#intermediate").show();

	var id_token = googleUser.getAuthResponse().id_token;

	$.ajax(
	{
		url: "backend/googlesignin.php",
		dataType: "json",
		type:"POST",

		data:
		{
			id_token:id_token,
		},

		success: function(json)
		{
			if(json.msg == "success_signup" || json.msg == "success_login_no_pass")
			{
				$("#wordesc").load("login-2.html", function() {
					$("#wordesc #welcome-msg").html("<h4 class='header'>Welcome to Wordesc, " + json.fname + ".</h4>");
					$("#intermediate").hide();
					$("#wordesc").show();
				});
			}
			else if(json.msg == "success_login")
			{
				$("#sidebar").load("sidebar.html", function() {
					$("#intermediate").hide();
					gotoURL();
					$("#sidebar").show();
				});y
			}
		},

		error : function()
		{
			//console.log("something went wrong");
		}
	});
};