$(function() {

$(document).ready(function() {

	$.ajax({
		url:  window.location.origin + '/api/trade/' +getID(),
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
				$('#image').attr({src: data.book_wanted_thumbnail});
				$('#image-2').attr({src: data.book_proposed_thumbnail});
			
				$.ajax({
					url: window.location.origin + '/api/book/'+data.id_book,
					type: 'GET',
					dataType: 'json'
				})
				.done(function(result) {
					$('#title').text(result.title);
					$('#author').text(result.authors);
				})
				.fail(function() {
					console.log("error");
				});

				$.ajax({
				url: window.location.origin + '/api/user/'+data.id_own,
				type: 'GET',
				dataType: 'json'
				})
				.done(function(result) {
					$('#owner').text(result.username);
				})
				.fail(function() {
					console.log("error");
				});



				$.ajax({
					url: window.location.origin + '/api/book/'+data.id_book_proposed,
					type: 'GET',
					dataType: 'json'
				})
				.done(function(result) {
					$('#title-2').text(result.title);
					$('#author-2').text(result.authors);
				})
				.fail(function() {
					console.log("error");
				});

				$.ajax({
					url: window.location.origin + '/api/user/'+data.id_want,
					type: 'GET',
					dataType: 'json'
				})
				.done(function(result) {
					$('#owner-2').text(result.username);
				})
				.fail(function() {
					console.log("error");
				});
	})
	.fail(function() {
		console.log("error");
	});

	$('#change-book-btn').click(function(event) {

		$.ajax({
			url:  window.location.origin + '/api/trade/' +getID(),
			type: 'POST',
			dataType: 'JSON'
		})
		.done(function(data) {
			$('#message').text("Transaction realized with success!");
			console.log("success");
		})
		.fail(function() {
			$('#message').text("Impossible to trade books");
			console.log("error");
		});
	});

	function getID()
	{
	    var id_array = window.location.href.split('/');
	    return id_array[id_array.length -1];
	}
})})