'use strict';

var path = process.cwd();
var UserHandler = require(path + '/app/controllers/registerHandler.server.js');
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');
var TradeHandler = require(path + '/app/controllers/tradeHandler.server.js');
var ProfileHandler = require(path + '/app/controllers/profileHandler.server.js');

module.exports = function (app, passport) {

	var userHandler = new UserHandler();
	var bookHandler = new BookHandler();
	var tradeHandler = new TradeHandler();
	var profileHandler = new ProfileHandler();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/register');
		}
	}

	// Routes
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/register.html');
		});

	app.route('/register')
		.get(function (req, res) {
			res.sendFile(path + '/public/register.html');
		});

	app.route('/news')
		.get(function (req, res) {
			if (req.isAuthenticated()) 
				res.sendFile(path + '/public/news-auth.html');
			else
				res.sendFile(path + '/public/news.html');
		});
	app.route('/book/:id/:id_owner')
		.get(isLoggedIn, function (req, res) {
			if(req.params.id_owner == req.user._id){
				res.sendFile(path + '/public/mybook.html');
			}
			else
				res.sendFile(path + '/public/book.html');
		});
	app.route('/allbooks')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/allbooks.html');
		});
	app.route('/mybooks')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/mybooks.html');
		});
	app.route('/trades')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/trades.html');
		});
	app.route('/trade/:id')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/trade.html');
		});
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/news');
		});
	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});


	// REST API
	app.route('/auth')
		.post(passport.authenticate('local'),
			 function(req,res)
		{
			res.send(req.user._id)
		})
	app.route('/auth/register')
		.post(function(req,res)
			{
				userHandler.registerUser(req,res);
			});
	app.route('/api/getUser')
		.get(function(req,res)
			{	
				res.json(req.user);
			});
	app.route('/api/user/:id')
		.get(isLoggedIn, profileHandler.getUser);
	app.route('/api/updateUser')
		.post(isLoggedIn, userHandler.updateUser);
	app.route('/api/searchBooks')
		.get(isLoggedIn, bookHandler.searchBook);
	app.route('/api/addBook')
		.post(isLoggedIn, bookHandler.addBook);
	app.route('/api/myBooks')
		.get(isLoggedIn, bookHandler.getMyBooks);
	app.route('/api/books')
		.get(isLoggedIn, bookHandler.allBooks);
	app.route('/api/book/:id')
		.get(isLoggedIn, bookHandler.bookDetails)
		.post(isLoggedIn,tradeHandler.tradeBook);
	app.route('/api/proposedTrades')
		.get(isLoggedIn, tradeHandler.getProposedTrades);
	app.route('/api/myProposedTrades')
		.get(isLoggedIn, tradeHandler.getMyProposedTrades);
	app.route('/api/trade/:id')
		.get(isLoggedIn, tradeHandler.getTrade)
		.post(isLoggedIn, tradeHandler.acceptTrade);
};
