(function(){
	"use strict";

	var request = require('sync-request');

	function listAttendees(){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events/' + this.event + '/attendees.json', {
            'headers': {
                'Authorization': this.auth
            }
        });

        if(response.statusCode == 200){
        	var body = response.getBody('utf8');
        	return JSON.parse(body).attendees;
	        
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

	function attendeeCheckin(code,auth,event,time){
		var response = request('PUT', 'https://www.eventick.com.br/api/v1/events/' + event + '/attendees/' + code + '.json?checked_at=' + time, {
            'headers': {
                'Authorization': auth
            }

        });

        if(response.statusCode == 204){
        	var body = response.getBody('utf8');
        	return true
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

	function getAttendee(id){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events/' + this.event + '/attendees/' + id + '.json', {
            'headers': {
                'Authorization': this.auth
            }
        });

        if(response.statusCode == 200){
        	var body = response.getBody('utf8');
        	var self = this;
        	var data = JSON.parse(body).attendees[0];
        	
        	data.checkin = function(time){
        		time = time || new Date().toISOString();
        		attendeeCheckin(data.code,self.auth,self.event,time);
        	}
        	
        	return data;
	        
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

	function Attendees(eventId,auth){
		this.event = eventId;
		this.auth = auth;
	}

	Attendees.prototype = {
		list: listAttendees,
		get: getAttendee,
	}

	module.exports = Attendees;

})();