(function(){
	"use strict";

	var request = require('sync-request');

	function listEvents(){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events.json', {
            'headers': {
                'Authorization': this.auth
            }
        });

        if(response.statusCode == 200){
        	var body = response.getBody('utf8');
        	return JSON.parse(body);
	        
        }
        else{
        	if(response.statusCode == 401){
        		throw "AUTHENTICATION ERROR, CHECK YOURS CREDENTIALS";
        	}
        	else{
        		throw "CONNECTION ERROR, ERROR: " + response.statusCode;
        	}
        }

	}

	function getEvent(id){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events/' + id + '.json', {
            'headers': {
                'Authorization': this.auth
            }
        });

        if(response.statusCode == 200){
        	var body = response.getBody('utf8');
        	return JSON.parse(body).events[0];
	        
        }
        else{
        	if(response.statusCode == 401){
        		throw "AUTHENTICATION ERROR, CHECK YOURS CREDENTIALS";
        	}
        	else if(response.statusCode == 404){
        		return {}
        	}
        	else{
        		throw "CONNECTION ERROR, ERROR: " + response.statusCode;
        	}
        }
	}

	function Events(token){
		this.auth = "Basic " + new Buffer(token + ":").toString("base64");
	}

	Events.prototype = {
		list: listEvents,
		get: getEvent
	}

	module.exports = Events;

})();