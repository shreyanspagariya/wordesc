$(document).ready(function() {
	$('textarea#description').characterCounter();
});

function add_describe()
{
	$("#wordesc #add_description #describe-btn").hide();
	$("#wordesc #add_description #describe-feedback-loader").show();

	var word = $("#wordesc #add_description #word").val();
	var description = $("#wordesc #add_description #description").val();

	$.ajax(
	{
		url: "backend/add_description.php",
		dataType: "json",
		type:"POST",

		data:
		{
			word:word,
			description:description,
		},
		success: function(json)
		{
			if(json.msg == "no_word")
			{
				$("#wordesc #add_description #describe-feedback-loader").hide();
				$("#wordesc #add_description #describe-btn").show();
				Materialize.toast('Please Enter a Word', 3000);
			}
			else if(json.msg == "no_desc")
			{
				$("#wordesc #add_description #describe-feedback-loader").hide();
				$("#wordesc #add_description #describe-btn").show();
				Materialize.toast('Please Enter a Description', 3000);
			}
			else if(json.msg == "long")
			{
				$("#wordesc #add_description #describe-feedback-loader").hide();
				$("#wordesc #add_description #describe-btn").show();
				Materialize.toast('Description Too Long', 3000);
			}
			else if(json.msg == "success")
			{
				goto_read();
				Materialize.toast('Description Successful', 3000);
			}
		},
		error : function()
		{
			
		}
	});
}