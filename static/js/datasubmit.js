$(function(){
	$(document).on('keydown', function(e){
		if ( e.which == 68 ){
			$.ajax({
				url: '/data',
				data: { json : JSON.stringify(data)},
				type: 'POST',
    			success: function(response){
					console.log("success");
                	window.location.href="/endTrial";
				},
				err: function(error){
					console.log("error");
				}
			});
		}
	});
});
