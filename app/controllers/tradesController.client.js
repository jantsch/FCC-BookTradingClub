$(function() {

$(document).ready(function() {

	$.ajax({
		url: window.location.origin +  '/api/proposedTrades',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		var tabNumber = 0;
		
		if(data.length > 5)
		{
			createNavCarousel("1");
		}
		createItemList("1",tabNumber);
		data.forEach(function(elem,index) {
			if(index % 6 == 0 && index != 0)
			{
				tabNumber++;
				$('#inner-items').append(' </ul></div>  <div class="item"> <ul class="thumbnails"  id="1_carr_tab_'+ tabNumber +'">')
			}
			addBookToDisplay("1","_carr_tab_"+ tabNumber, elem._id, elem.book_wanted_thumbnail);
		});
	})
	.fail(function() {
			console.log("error");
	});


	$.ajax({
		url: window.location.origin +  '/api/myProposedTrades',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		var tabNumber = 0;
		if(data.length > 5)
			createNavCarousel("2");

		createItemList("2",tabNumber);

		data.forEach(function(elem,index) {
			if(index % 6 == 0 && index != 0)
			{
				tabNumber++;
				$('#inner-items').append(' </ul></div>  <div class="item"> <ul class="thumbnails"  id="2_carr_tab_'+ tabNumber +'">')
			}
			addBookToDisplayWithoutClick("2","_carr_tab_"+ tabNumber, elem._id, elem.book_wanted_thumbnail);	
			});
	})
	.fail(function() {
			console.log("error");
	});

	function createNavCarousel(car_number) {
		$('#myCarousel-'+car_number).append('<nav><ul class="control-box pager">'+
										'<li><a data-slide="prev" href="#myCarousel-'+car_number+'" class="">'+
										'<i class="glyphicon glyphicon-chevron-left"></i></a></li> '+
										'<li><a data-slide="next" href="#myCarousel-'+car_number+'" class="">' +
										'<i class="glyphicon glyphicon-chevron-right"></i></a></li>'+
										'</ul></nav>')
		
	}
	function createItemList(car_number, tabNumber) {
		$('#inner-items-'+car_number).append('  <div class="item active"><ul class="thumbnails" id="'+car_number+'_carr_tab_'+ tabNumber+'">')
	}

	function addBookToDisplayWithoutClick(car_number,tab_number,id_trade, book_src) {
		$('#'+car_number+tab_number).append('<li  id="'+ id_trade + '" class="col-xs-2 col-md-2"><div class="thumbnail"> ' + 
					 '<a href="#"><img src="'+ book_src + '" alt=""></a>' +
					 '</div></li>')	
	}
	function addBookToDisplay(car_number,tab_number,id_trade, book_src) {
		
		$('#'+car_number+tab_number).append('<li  id="'+ id_trade + '" class="col-xs-2 col-md-2"><div class="thumbnail"> ' + 
					 '<a href="/trade/'+ id_trade +'"><img src="'+ book_src + '" alt=""></a>' +
					 '</div></li>')	
	}
	


})
})