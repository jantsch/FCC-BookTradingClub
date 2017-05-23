'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
		id_owner: String,
		id: String,
		title: String,
		description: String,
		thumbnail: String,
		authors: String
});


module.exports = mongoose.model('Book', Book);
