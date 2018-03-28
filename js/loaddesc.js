function loaddesc()
{
	$("#wordesc #loader").show();

	$.ajax(
	{
		url: "backend/getdesc.php",
		dataType: "json",
		type:"POST",
		data:
		{
			
		},
		success: function(json)
		{
			$("#wordesc #loader").hide();

			words = (json.words).slice(0);
			descriptions = (json.descriptions).slice(0);
			datetime = (json.datetime).slice(0);
			descid = (json.descid).slice(0);
			likes_count = (json.likes_count).slice(0);
			islike = (json.islike).slice(0);
			
			for(var i=0; i<words.length; i++)
			{
				if(islike[i] == 0)
				{
					$("#wordesc #descriptions-feed").append
					(
						"<div id='desc" + descid[i] + "'>" +
						"<h4 class='header'>" + words[i] + 
						"</h4><div class='grey-text'>Shreyans Pagariya, " + datetime[i] + 
						"</div><p style='font-size:18px;'>" + descriptions[i] + 
						"</p><span id='like-btn'><a class='waves-effect waves-light btn' onclick='like(" + descid[i] + ")'>" + likes_count[i] + "&nbsp;&nbsp;|&nbsp;&nbsp;LIKE</a></span>"+
						"<a class='waves-effect waves-light btn-flat grey-text'>Comments</a><br><br><hr>"+
						"</div>"
					);
				}
				else if(islike[i] == 1)
				{
					$("#wordesc #descriptions-feed").append
					(
						"<div id='desc" + descid[i] + "'>" +
						"<h4 class='header'>" + words[i] + 
						"</h4><div class='grey-text'>Shreyans Pagariya, " + datetime[i] + 
						"</div><p style='font-size:18px;'>" + descriptions[i] + 
						"</p><span id='like-btn'><a class='waves-effect waves-light btn-flat grey-text btn-flat-color' onclick='like(" + descid[i] + ")'>" + likes_count[i] + "&nbsp;&nbsp;|&nbsp;&nbsp;LIKED</a></span>"+
						"<a class='waves-effect waves-light btn-flat grey-text'>Comments</a><br><br><hr>"+
						"</div>"
					);
				}
			}
		},
		error : function()
		{
			
		}
	});
}

$(window).scroll(function() 
{
	if($(window).scrollTop() + $(window).height() == $(document).height()) 
	{
		loaddesc();
	}
});

window.onload = loaddesc();