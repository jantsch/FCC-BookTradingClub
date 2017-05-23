$(function() {

$(document).ready(function() {
	

	$.ajax({
		url: window.location.origin + '/api/getUser',
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
		$('#city').val(data.city);
		$('#state').val(data.state);
	})
	.fail(function() {
		console.log("error");
	});
	
});

	$('#submit-btn').click(function(event) {
	
		if(($('#password').val() == $('#confirm-password').val()) && $('#confirm-password').val() != "")
		{
			$.ajax({
				url: window.location.origin + '/api/updateUser',
				type: 'POST',
				dataType: 'json',
				data: {city: $('#city').val(), state: $('#state').val(),password: $('#password').val() },
			})
			.done(function() {
				$('#message-status').text("Profile updated with success!")
			})
			.fail(function() {
				$('#message-status').text("Profile updated with error!")
			});
		}
		else
			$('#message-status').text("Password doesn't match!")	


	});








});