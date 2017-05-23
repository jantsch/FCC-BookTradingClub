'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

 passport.use(new LocalStrategy(
    function(username, password, done) {
       User.findOne({ username: username }, function(err, user) {
  	        if (err) { return done(err); }
            if (!user) {      	
              return done(null, false);
            }
            if (!user.validPassword(password)) {
              return done(null, false);
            }
            return done(null, user);
        });
    }
  ));
};
