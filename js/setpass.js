function setpass()
{
	var password = $("#wordesc #setup-password").val();

	$("#wordesc #pass_submit_button").hide();
	$("#wordesc #pass-feedback-loader").show();

	$.ajax(
	{
		url: "backend/setpass.php",
		dataType: "json",
		type:"POST",

		data:
		{
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
			else if(json.msg == "empty_pass")
			{
				$("#wordesc #pass-feedback-loader").hide();
				$("#wordesc #pass_submit_button").show();
				Materialize.toast('Please enter a password', 3000);
			}
		},

		error : function()
		{
			//console.log("something went wrong");
		}
	});
}