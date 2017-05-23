$(function() {

$(document).ready(function() {

	$.ajax({
		url: window.location.origin + '/api/myBooks',
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
		if(Array.isArray(data))
		{
			data.forEach(function(elem) {
				addBook(elem.thumbnail ,elem.title);					
			});
		}
		else
			addBook(data.thumbnail ,data.title)
	})
	.fail(function() {
		console.log("error");
	});

	function addBook(thumbnail,title) {
		$("#book-list").append(' <div class="col-xs-2 col-md-2"><a href="#" class="thumbnail">' +
						      '<img src="'+thumbnail +'"'+ 
						      'alt="'+title+'"></a></div>')
	}
	

	// Research available books 
	$( "#name-book" ).keyup(function() {
	    delay(function(){
		  	if($('#name-book').val() !="")
		  	 {
		  	 	$.ajax({
					url: window.location.origin + '/api/searchBooks',
					type: 'GET',
					dataType: 'json',
					data: {name: $('#name-book').val()},
				})
				.done(function(data) {
					$('#list-of-possibilities').empty();
					data.forEach(function(elem) {
						addBookAvailable(elem.title,elem.authors)
					});
				})
				.fail(function() {
					console.log("error");
				});
		  	}
		  	else
		  		$('#list-of-possibilities').empty();
		  }, 500 );
});

	function addBookAvailable(title,authors) {
		 $('#list-of-possibilities').append("<option value=\""+title +"\">"+authors+" </option>");
	}
	var delay = (
		function(){
				  var timer = 0;
				  return function(callback, ms){
				  clearTimeout (timer);
				  timer = setTimeout(callback, ms);
				 };
				}
	)();

	// Add book
	$('#submit-name').click(function(event) {
		$.ajax({
			url: window.location.origin + '/api/addBook',
			type: 'POST',
			dataType: 'json',
			data: {name: $('#name-book').val()},
		})
		.done(function(data) {		 
     			addBook(data.thumbnail,data.title)
		})
		.fail(function() {
			console.log("error");
		});
		
	});








})})