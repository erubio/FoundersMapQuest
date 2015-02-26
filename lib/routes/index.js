'use strict';

module.exports.configure = function(app) {

	/* GET home page. */
	app.get('/', function homeController(req, res/*, next*/) {
			res.render('index');
	});
};

