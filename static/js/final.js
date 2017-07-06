$(function(){
	$(document).on('keydown', function(e){
        if ( e.which == 68 ){
    		$.ajax({
	    		url: '/logData',
		    	data: { json : JSON.stringify(data)} ,
			    type: 'POST',
                dataType : 'json', 
    			success: function(response){
	    			console.log(response);
                    window.location.href="/startTrial";
			    },
    			err: function(error){
	    			console.log("shit");
		        }
    		});
        }
	});
});
