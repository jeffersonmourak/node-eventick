(function(){
	"use strict";

	var request = require('sync-request');

	function listAttendees(eventId){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events/' + eventId + '/attendees.json', {
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

	function getAttendee(eventId,id){
		var response = request('GET', 'https://www.eventick.com.br/api/v1/events/' + eventId + '/attendees/' + id + '.json', {
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
        		attendeeCheckin(data.code,self.auth,eventId,time);
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

    function check_all(eventId,list){
        var response = request('PUT', 'https://www.eventick.com.br/api/v1/events/' + eventId + '/attendees/check_all.json', {
            'headers': {
                'Authorization': this.auth,
                'Content-Type': 'application/json',
            },
            'json':{
                'attendees': list
            } 

        });

        if(response.statusCode == 200){
            var body = response.getBody('utf8');
            return true;
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

	function Attendees(token){
		this.auth = "Basic " + new Buffer(token + ":").toString("base64");
	}

	Attendees.prototype = {
		list: listAttendees,
		get: getAttendee,
        check_all: check_all
	}

	module.exports = Attendees;

})();