function check_login_state()
{
	$.ajax(
	{
		url: "backend/checklogin.php",
		dataType: "json",
		type:"POST",

		data:
		{
			
		},
		success: function(json)
		{
			if(json.loggedin == "true")
			{
				if(json.password == "empty")
				{
					$("#wordesc").load("login-2.html", function() {
						$("#intermediate").hide();
						$("#wordesc #welcome-msg").html("<h4 class='header'>Welcome to Wordesc, " + json.fname + ".</h4>");
					});
				}
				else if(json.password == "non-empty")
				{
					$("#sidebar").load("sidebar.html", function() {
						$("#intermediate").hide();
						gotoURL();
					});
				}
			}
			else if(json.loggedin == "false")
			{
				$("#wordesc").load("login-1.html", function() {
					$("#intermediate").hide();
				});
			}
		},
		error : function()
		{
			
		}
	});
}

window.onload = check_login_state();

function goto_read()
{
	$(".page-title").html("Read");
	$("#wordesc").load("read.html", function() {
		$("#wordesc").show();
	});
	all_inactive();
	$("#sidebar #goto_read").addClass("active");
	window.history.pushState('read', 'read', 'read');
	document.title = "Read - Top Desciptions For You";
}

function goto_describe()
{
	$(".page-title").html("Describe");
	$("#wordesc").load("describe.html", function() {
		$("#wordesc").show();
	});
	all_inactive();
	$("#goto_describe").addClass("active");
	window.history.pushState('describe', 'describe', 'describe');
	document.title = "Describe - Describe a Word";
}

function all_inactive()
{
	if($("#goto_read").hasClass("active"))
	{
		$("#goto_read").removeClass("active");
	}
	if($("#goto_describe").hasClass("active"))
	{
		$("#goto_describe").removeClass("active");
	}
	if($("#goto_notif").hasClass("active"))
	{
		$("#goto_notif").removeClass("active");
	}
	if($("#goto_profile").hasClass("active"))
	{
		$("#goto_profile").removeClass("active");
	}
	if($("#goto_about").hasClass("active"))
	{
		$("#goto_about").removeClass("active");
	}
	if($("#goto_privpol").hasClass("active"))
	{
		$("#goto_privpol").removeClass("active");
	}
	if($("#goto_contact").hasClass("active"))
	{
		$("#goto_contact").removeClass("active");
	}
}

function gotoURL()
{
	var url = window.location.href;
	if(url == "http://localhost:8080/wordesc/read")
	{
		goto_read();
	}
	else if(url == "http://localhost:8080/wordesc/describe")
	{
		goto_describe();
	}
	else
	{
		goto_read();
	}
}