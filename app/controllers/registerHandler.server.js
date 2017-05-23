

var Users = require('../models/users.js');



function userHandler(){

	this.registerUser = function(req,res)
	{	
		Users.findOne({ 'username': req.body.username}, function (err, person) {
			  if (err) return err;
			  var user = new Users();
			  user.username	= req.body.username;
			  user.email = req.body.email;
			  user.password = req.body.password;
			  user.save(function(err){
			  	if(err) return err;
			  	else res.send({message : "User Registered"});
			  })			 
		})
	}

	this.updateUser = function (req,res) {
	
		Users.findOne({ '_id': req.user._id}, function (err, user) {
			  if (err) return err;
			  if(user)
			  {
			  	user.city = req.body.city == ""? user.city: req.body.city;
			  	user.state = req.body.state== ""? user.state: req.body.state;
			  	user.password = req.body.password;
			  	user.save(function(err){
			  		if(err) return err;
			  		else res.send({message : "User Updated"});
			  	})
			  }			 
		})
		
	}
}

module.exports = userHandler;