$(function() {

$(document).ready(function() {
	
	var book_selection_enabled = false;
	var id_book_proposed;
	var book_proposed_thumbnail;
	var book;

	$.ajax({
		url: window.location.origin + '/api/book/'+getId(),
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {		
	 	book = data;
		$('#title').text(data.title);
		$('#author').text(data.authors);
		$('#image').attr({src: data.thumbnail});
		$('#resume').text(data.description);
	})
	.fail(function() {
		console.log("error");
	});


	$( "body" ).on( "click"," #trade-btn", function() {
		$.ajax({
			url:  window.location.origin + '/api/book/'+getId(),
			type: 'POST',
			dataType: 'JSON',
			data: {"id_owner": book.id_owner,"id_book_proposed": id_book_proposed, "book_wanted_thumbnail": book.thumbnail, "book_proposed_thumbnail": book_proposed_thumbnail},
		})
		.done(function() {
			$('#message-trade').text("Request submited!");
		})
		.fail(function() {
			$('#message-trade').text("Request already submited!");
		});
	});

	$('#enable-book-selection').click(function(event) {

		if(!book_selection_enabled)
		{
			renderSelectBox();

			$.ajax({
				url:  window.location.origin +  '/api/myBooks',
				type: 'GET',
				dataType: 'json'
			})
			.done(function(data) {
				var tabNumber = 0;

				if(data.length > 5)
				{
					renderCarousel();
				}
				
				renderTab(tabNumber);
				
				data.forEach(function(elem,index) {

					if(index % 6 == 0 && index != 0)
					{
						tabNumber++;
						createNewTab(tabNumber);					
					}
					addBookToDisplay("tab_"+ tabNumber, elem._id, elem.thumbnail);
					
				});
				
			})
			.fail(function() {
				console.log("error");
			});
		
			book_selection_enabled = true;
		}
	});

	// Get Book that was selected to propose request
	$( "body" ).on( "click"," li", function() {
	  id_book_proposed = this.id;
	  book_proposed_thumbnail = ($(this).find('img')[0]).src;	  
	});

	function renderCarousel() {
		$('#myCarousel').append('<nav><ul class="control-box pager">'+
										'<li><a data-slide="prev" href="#myCarousel" class="">'+
										'<i class="glyphicon glyphicon-chevron-left"></i></a></li> '+
										'<li><a data-slide="next" href="#myCarousel" class="">' +
										'<i class="glyphicon glyphicon-chevron-right"></i></a></li>'+
										'</ul></nav>')
	}

	function renderTab(tabNumber) {
		$('#inner-items').append('  <div class="item active"><ul class="thumbnails" id="tab_'+ tabNumber+'">')	
	}
	function createNewTab(tabNumber) {
		$('#inner-items').append(' </ul></div>  <div class="item"> <ul class="thumbnails"  id="tab_'+ tabNumber +'">')		
	}
	function renderSelectBox() {
		$('body').append('<div class="container"><div class="jumbotron">'+
						 '<h2 class="text-center">  Select a book to change!  </h2>'+
						 '<div class="row">	<div class="carousel slide" id="myCarousel">'+
						 '<div class="carousel-inner" id="inner-items"></div></div>'+
	          			 '<button class="btn btn-primary center-block " id="trade-btn">'+
	          			 'Propose Trade</button><p class="text-center" id="message-trade"></p></div></div>')
	}
	function addBookToDisplay(tab_number,id_book, book_src) {
		$('#'+tab_number).append('<li  id="'+ id_book + '" class="col-xs-2 col-md-2"><div class="thumbnail"> ' + 
					 '<a href="#"><img src="'+ book_src + '" alt=""></a>' +
					 '</div></li>')
	}
	function getId(){
	    var id_array = window.location.href.split('/');
	    return id_array[id_array.length -2];
	}
	


	
		
	
})})