function fname()
{
	$.ajax(
	{
		url: "backend/fname.php",
		dataType: "json",
		type:"POST",

		data:
		{
			
		},
		success: function(json)
		{
			$("#sidebar #profile_name").html("<li><a class='waves-effect waves-teal' href='#'>" + json.fname + "<i class='material-icons'>perm_identity</i></a></li>");
		},
		error : function()
		{
			
		}
	});
}

window.onload = fname();