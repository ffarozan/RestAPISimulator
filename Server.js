var express = require('express'),
	httpProxy = require('http-proxy'),
	path = require('path');

var base_dir, config, server;

base_dir = process.cwd();
config = require(base_dir + path.sep + 'config');

function setupSimulator(server){
	"use strict";
	var userProfiles, userTransactions;

	userProfiles = require(base_dir + path.sep + config.userProfilesFile);
	userTransactions = require(base_dir + path.sep + config.userTransactionsFile);

	var httpResponseConstructor = function(p_body, p_res){
		var l_statusCode = p_body[0];
		var l_contentType = p_body[1];

		if (l_contentType === "application/json;charset=\"utf-8\"") {
			var l_content = p_body[2] ? JSON.stringify(p_body[2]) : '';
		} else {
			var l_content = p_body[2] ? p_body[2] : "";
		}

		p_res.status(l_statusCode)
			.header('Content-Type', l_contentType)
			.header('Content-Length', l_content.length)
			.end(l_content);
	};

	var userProfilesRequestHandler = function(req, res){
		console.log("I'm here - " + req.originalUrl);
		var upmGet = userProfiles['GET'];
		var l_body = upmGet[req.originalUrl];

		if (!l_body) {
			res.send(404);
		} else {
			httpResponseConstructor(l_body, res);
		}
	};

	var userTransactionsRequestHandler = function(req, res){
		var l_body = userTransactions[req.originalUrl];

		if (!l_body) {
			res.send(404);
		}
		else {
			httpResponseConstructor(l_body, res);
		}
	};

	server.get('/userProfiles/*', userProfilesRequestHandler)
		.post('/userProfiles/*', userProfilesRequestHandler)
		.get('/userTransations/*', userTransactionsRequestHandler)
		.put('/userTransations/*', userTransactionsRequestHandler);
		
}

server = express();

if (config.enableLogging) {
	server.use(express.logger('dev'));
}

console.log("Using Bibo Server");
setupSimulator(server);

server.listen(config.port);

console.log('Listening on port ' + config.port);
