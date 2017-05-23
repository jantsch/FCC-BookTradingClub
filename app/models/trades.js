'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trade = new Schema({		
		id_want: String,
		id_book_proposed: String,
		id_own: String,
		id_book: String,
		state: Boolean,
		book_wanted_thumbnail: String,
		book_proposed_thumbnail: String
});


module.exports = mongoose.model('Trade', Trade);
