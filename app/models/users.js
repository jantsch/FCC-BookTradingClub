'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var passwordHash = require('password-hash');

var User = new Schema({
		username: String,
		email: String,
		password: String,
		city: String,
		state: String
});

User.pre('save',function(next){
	var hashedPassword = passwordHash.generate(this.password);
	this.password = hashedPassword;
	next();
})

User.methods.validPassword = function(pass)
{
	return passwordHash.verify(pass, this.password);
}

module.exports = mongoose.model('User', User);
