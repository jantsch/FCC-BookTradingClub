
var Trades = require('../models/trades.js');
var Books = require('../models/books.js');
var _ = require('underscore');



function tradeHandler(){

	this.tradeBook = function(req,res) {		
		Trades.findOne({"id_own": req.body.id_owner ,"id_book_proposed":  req.body.id_book_proposed,
						"id_want":req.user._id,"id_book":req.params.id},
			function(err,result)
			{
				if(err)	console.log(err);
				else
				{	
					if(result == null)
					{	
						var trade = new Trades();
						trade.id_own = req.body.id_owner;
						trade.id_book_proposed = req.body.id_book_proposed;
						trade.id_want = req.user._id
						trade.id_book = req.params.id;
						trade.book_wanted_thumbnail = req.body.book_wanted_thumbnail;
						trade.book_proposed_thumbnail = req.body.book_proposed_thumbnail;
						trade.state = false;
						trade.save(function(err){
							if(err)
								console.log(err);

							res.send({message: "Inserted"})
						})
					}
					else{
						res.status(401).send({message: "Already Exists"})
					}
				}
			})
	}
	
	this.getProposedTrades = function (req,res) {
		Trades.find({"id_own": req.user._id, "state": false},function(err,results){
			if(err)
					console.log(err);
			else
			{
				res.send(results);
			}
		})		
	}
	
	this.getMyProposedTrades = function (req,res) {
		
		Trades.find({"id_want": req.user._id, "state": false},function(err,results){
			if(err)
					console.log(err);
			else
			{	
				res.send(results);
			}
		})
	}

	this.getTrade = function (req,res) {
		Trades.findOne({"_id": req.params.id},function (err,result) {
			if (err) {console.log(err);}
			else
				res.send(result);
		})		
	}
	this.acceptTrade = function (req,res) {
		Trades.findOne({"_id": req.params.id},function (err,result) {
			if (err) {console.log(err);}
			else
			{
				result.state = true;
				result.save(function(err){ if(err) console.log(err);})
				
				Books.findOne({"_id": result.id_book_proposed}, function(err,book) {
					book.id_owner = result.id_own;
					book.save(function(err){ if (err) { console.log(err);}})

				})

				Books.findOne({"_id": result.id_book}, function(err,book) {
					book.id_owner = result.id_want;
					book.save(function(err){ if (err) { console.log(err);}})

				})
			
			}
				res.send({message: "Transaction Realized with Success!"})
		})
	}
}

module.exports = tradeHandler;