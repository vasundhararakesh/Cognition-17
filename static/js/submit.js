$(function(){
	$('#btnSignUp').click(function(){
		$.ajax({
			url: '/submit',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			err: function(error){
				console.log(error);
			}
		});
	});
});