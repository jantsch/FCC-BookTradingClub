var Users = require('../models/users.js');


function profileHandler () {

	this.getUser = function (req, res) {
		Users
			.findOne({ '_id': req.params.id })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
}

module.exports = profileHandler;
