'use strict';

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
//var dust = require('dustjs-linkedin');

var routes = require('./routes');
var app = express();

// view engine setup
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, '..', 'views'));


// uncomment after placing your favicon in /public
app.use(logger('dev', {
	skip: function(req) {
		return req.path.match(/\.js|css|png$/);
	}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));


// Configure custom routes
routes.configure(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log('Path not found:', req.path);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res/*, next*/) {
    	console.log(err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res/*, next*/) {
	console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//Start server
module.exports.start = function() {

	var server = app.listen(3000, 5000, function() {
		var host = server.address().address,
			port = server.address().port,
			env = app.get('env');

		console.log('Application listening at http://%s:%s (enviroment: %s)', host, port, env);
	});
};
