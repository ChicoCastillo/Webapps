'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

module.exports = function(db) {
	// Initialize express app
	var app = express();


	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Enable jsonp
	app.enable('jsonp callback');

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});


var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

	console.log('connecting');
   socket.on('clickhandler', function(data){
   	console.log(data.input1);
   		var a = getTweets(data);
   		console.log(a);
   });

});



function getTweets(data)
{
var tweetArray = [];

	var Twit = require('../node_modules/twit/lib/twitter');
   	var T = new Twit({
    consumer_key:        'TLMVkVzLc31fE6NGluyk30aPK',
    consumer_secret:      '9RHCIaiuIwlThmHuZqbM9b8IMWaY0WAqQmV32fVmqLJf26A2cR',
    access_token:        '481384292-er40MHCi5zA4IbbfgLhMtKEXd8fMWoRrHSIwQsca',
    access_token_secret:  'iOrlnuzQJH850koN7npB8gWp6TaSNiFu966mdMhf8TaW1'});

	


	T.get('statuses/user_timeline', {screen_name: data.input1, count: 100, trim_user: true ,exclude_replies: true, include_rts: false}, function(err, datatwit, response) {

   		var counts = {};
var arr = [];
datatwit.forEach(function(element) {
var ele = element.created_at.toString();
var splitted = ele.split(' ');
var textdate = splitted[2]+'/'+splitted[1]+'/'+splitted[5];
var tweetdate = new Date(textdate);

//console.log(tweetdate.toLocaleDateString());
counts[tweetdate.toLocaleDateString()] = (counts[tweetdate.toLocaleDateString()] || 0) + 1;

  arr.push({user:data.input1, date:tweetdate.toLocaleDateString(), count: counts[tweetdate.toLocaleDateString()]});
});
		console.log(arr);
		tweetArray=arr;
   		//console.log(datatwit);
   		//console.log('------error section------');
   		//console.log(err);
   		//console.log(response);

   	});


 T.get('statuses/user_timeline', {screen_name: data.input2, count: 100, trim_user: true ,exclude_replies: true, include_rts: false}, function(err, datatwit, response) {

var counts1 = {};
var Arr1 = [];
datatwit.forEach(function(element) {
var ele1 = element.created_at.toString();
var splitted1 = ele1.split(' ');
var textdate1 = splitted1[2]+'/'+splitted1[1]+'/'+splitted1[5];
var tweetdate1 = new Date(textdate1);

//console.log(tweetdate.toLocaleDateString());
counts1[tweetdate1.toLocaleDateString()] = (counts1[tweetdate1.toLocaleDateString()] || 0) + 1;

  Arr1.push({user:data.input2, date:tweetdate1.toLocaleDateString(), count: counts1[tweetdate1.toLocaleDateString()]});
});
		
		console.log(Arr1);
	//tweetArray = Arr1;
   		//console.log(datatwit);
   		//console.log('------error section------');
   		//console.log(err);
   		//console.log(response);

   	});



  	//T.get('search/tweets', { q: 'from: ChicoCastilloDL', count: 100 }, function(err, datarrr, response) {
//console.log(datarrr);
//});
//tweetArray = arr.concat(Arr1);
//console.log(Arr1);
//console.log(arr);
console.log(tweetArray);

return tweetArray;
}

	//app.listen(config.port)
    app.io= io;

server.listen(config.port);

	return app;
};