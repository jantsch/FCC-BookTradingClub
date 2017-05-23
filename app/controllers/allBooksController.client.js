$(function() {

$(document).ready(function() {
	var book_list = [];
	
	$.ajax({
		url: window.location.origin + '/api/books',
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
		book_list = data;
		displayList(book_list);
	})
	.fail(function() {
		console.log("error");
	});
	

	$( "#book-name" ).keyup(function() {
	    delay(function(){
		  	if($('#book-name').val() !="")
		  	 {
			  	 	var list_to_display = book_list.filter(function(elem){
		  	 			return (elem.title).indexOf($('#book-name').val()) != -1;
		  	 		})
		  	 		displayList(list_to_display);
		  	 }
		  	else
		  		displayList(book_list);
		}, 500 );
	});
	var delay = (
		function(){
				  var timer = 0;
				  return function(callback, ms){
				  clearTimeout (timer);
				  timer = setTimeout(callback, ms);
				 };
				}
	)();

	function displayList(list_to_display)
	{

		$('#book-list').empty();
		list_to_display.forEach(function(elem) {
			$("#book-list").append(' <div class="col-xs-2 col-md-2"><a href="/book/'+elem._id +'/'+elem.id_owner+'" class="thumbnail">' +
						      '<img src="'+elem.thumbnail +'"'+ 
						      'alt="'+elem.title+'"></a></div>')			
		});
	}

		
	
})})