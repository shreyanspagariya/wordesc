function logout()
{
	$.ajax(
	{
		url: "backend/logout.php",
		dataType: "json",
		type:"POST",

		data:
		{
			
		},
		success: function(json)
		{
			signOut();

			window.history.pushState('page2', 'Read', '.');
			document.title = "Wordesc - The best description to any word";

			$("#sidebar").hide();
			$("#wordesc").hide();
			$("#intermediate").show();

			$("#wordesc").load("login-1.html", function() {
				$("#intermediate").hide();
				$("#wordesc").show();
			});
		},
		error : function()
		{
			
		}
	});
}
function signOut() 
{
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	console.log('User signed out.');
	});
}
function onLoad() {
	gapi.load('auth2', function() {
		gapi.auth2.init();
	});
}