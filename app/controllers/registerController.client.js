$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
  });
   $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
  });


  $('#login-submit').click(function(e){
    
         $.ajax({
           type: "POST",
           url:  window.location.origin + '/auth',          
           data: { username: $('#username').val(), password:$('#password').val() },       
         })
         .done(function(data) {
           window.location.replace("news");
         })
         .fail( function(obj) {
           $('#error').text("User/Password doesn't exist!");

         });
         

      e.preventDefault();


  })

  $("#register-submit").click(function(event) {
    $('#error-register').text("");
    if($('#password-register').val() == $('#confirm-password').val())
    {
          $.ajax({
            url: window.location.origin +'/auth/register',
            type: 'POST',
            dataType: 'json',
            data: { username: $('#username-register').val(), password:$('#password-register').val(),email: $('#email').val() }, 
          })
          .done(function() {
            $('#error-register').text("User created!");
          })
          .fail(function() {
              $('#error-register').text("User/Password already exists!");
          })
    }
    else
          $('#error-register').text("Password doesn't match!");

  });
  

});