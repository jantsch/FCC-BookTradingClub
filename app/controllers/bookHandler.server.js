

var books = require('google-books-search');
var Book = require('../models/books.js');

function bookHandler(){

	this.searchBook = function(req,res)
	{		
			books.search(req.query.name, function(error, results) {
		    if ( ! error ) {
		        res.send(results)
		    } else {
		        console.log(error);
		    }
		})
	}
	this.addBook= function(req,res)
	{

		
		books.search(req.body.name, function(error, result) {
		    if ( ! error ) {
		        var book = new Book();
		        book.id_owner = req.user._id;
		        book.title = result[0].title;
		        book.authors = result[0].authors;
		        book.description = result[0].description;
		        book.thumbnail = result[0].thumbnail;
		        book.id = result[0].id;
		        book.save(function(err){
		        	if(err)
		        		throw err;		       
		       		 res.send(book);
		        })

		       
		    } else {
		        console.log(error);
		    }
		})
	}

	this.getMyBooks= function(req,res)
	{
		Book.find({'id_owner': req.user._id},function(err,mybooks){
			 if ( ! err ) {			 
			 	res.send(mybooks)
			 }
			 else
			 {
			 	console.log(err);
			 }
		})
	}

	this.allBooks= function(req,res)
	{
		Book.find({},function(err,allbooks){
			 if ( ! err ) {			 
			 	res.send(allbooks)
			 }
			 else
			 {
			 	console.log(err);
			 }
		})
	}
	this.bookDetails = function (req,res) {

		Book.findOne({'_id': req.params.id},function(err,book)
		{
			if(!err)
			{
				res.send(book);
			}
			else
				console.log(err);
		})
	}
}

module.exports = bookHandler;