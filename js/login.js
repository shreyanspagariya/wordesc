function login()
{
	$("#wordesc #login-btn").hide();
	$("#wordesc #email-pass-feedback-loader").show();

	var email = $("#wordesc #email").val();
	var password = $("#wordesc #password").val();

	$.ajax(
	{
		url: "backend/login.php",
		dataType: "json",
		type:"POST",

		data:
		{
			email:email,
			password:password,
		},
		success: function(json)
		{
			if(json.msg == "success")
			{
				$("#wordesc").hide();
				$("#intermediate").show();

				$("#sidebar").load("sidebar.html", function() {
					$("#intermediate").hide();
					gotoURL();
					$("#sidebar").show();
				});
			}
			else if(json.msg == "invalid")
			{
				$("#wordesc #email-pass-feedback-loader").hide();
				$("#wordesc #login-btn").show();
				Materialize.toast('Invalid Email or Password', 3000);
			}
		},
		error : function()
		{
			
		}
	});
}