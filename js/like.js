function like(descid)
{
	$.ajax(
	{
		url: "backend/like.php",
		dataType: "json",
		type:"POST",
		data:
		{
			description_id:descid
		},
		success: function(json)
		{
			if(json.islike == "true")
			{
				$("#desc"+descid+" #like-btn").html("<a class='waves-effect waves-light btn-flat grey-text btn-flat-color' onclick='like(" + descid + ")'>" + json.likes_count + "&nbsp;&nbsp;|&nbsp;&nbsp;LIKED</a></span>")
				Materialize.toast('Liked', 3000);
			}
			else if(json.islike == "false")
			{
				$("#desc"+descid+" #like-btn").html("<a class='waves-effect waves-light btn' onclick='like(" + descid + ")'>" + json.likes_count + "&nbsp;&nbsp;|&nbsp;&nbsp;LIKE</a></span>");
				Materialize.toast('Unliked', 3000);
			}
			
		},
		error : function()
		{
			
		}
	});
}