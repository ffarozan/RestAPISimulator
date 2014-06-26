var express = require('express'),
	httpProxy = require('http-proxy'),
	path = require('path');

var base_dir, config, server;

base_dir = process.cwd();
config = require(base_dir + path.sep + 'config');

function setupSimulator(server){
	"use strict";
	var userProfiles, userTransactions, categories;

	userProfiles = require(base_dir + path.sep + config.userProfilesFile);
	userTransactions = require(base_dir + path.sep + config.userTransactionsFile);
	categories = require(base_dir + path.sep + config.categoriesFile);

	var httpResponseConstructor = function(request, response, simulatorContent){
		var httpMethodSpecificContent = simulatorContent[request.method];
		var p_body = httpMethodSpecificContent[request.originalUrl];
		if (!p_body) {
			response.send(404);
		}
		
		var l_statusCode = p_body[0];
		var l_contentType = p_body[1];

		if (l_contentType === "application/json;charset=\"utf-8\"") {
			var l_content = p_body[2] ? JSON.stringify(p_body[2]) : '';
		} else {
			var l_content = p_body[2] ? p_body[2] : "";
		}

		response.status(l_statusCode)
			.header('Content-Type', l_contentType)
			.header('Content-Length', l_content.length)
			.end(l_content);
	};

	var userProfilesRequestHandler = function(request, response){
		httpResponseConstructor(request, response, userProfiles);
	};

	var userTransactionsRequestHandler = function(request, response){
		httpResponseConstructor(request, response, userTransactions);
	};
	
	var categoriesRequestHandler = function(request, response){
		httpResponseConstructor(request, response, categories);
	};

	server.get('/userProfiles*', userProfilesRequestHandler)
		.post('/userProfiles*', userProfilesRequestHandler)
		.put('/userProfiles*', userProfilesRequestHandler)
		.delete('/userProfiles*', userProfilesRequestHandler)
		.get('/userTransactions*', userTransactionsRequestHandler)
		.put('/userTransactions*', userTransactionsRequestHandler)
		.get('/categories*', categoriesRequestHandler)
		.get('/items*', categoriesRequestHandler);
		
}

server = express();

if (config.enableLogging) {
	server.use(express.logger('dev'));
}

console.log("Using Bibo Server");
setupSimulator(server);

server.listen(config.port);

console.log('Listening on port ' + config.port);
