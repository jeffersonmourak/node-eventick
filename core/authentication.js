(function() {
    "use strict";
    var request = require('sync-request');

    function getToken(username, password) {
        var authCode = "Basic " + new Buffer(username + ":" + password).toString("base64");

        var response = request('GET', 'https://www.eventick.com.br/api/v1/tokens.json', {
            'headers': {
                'Authorization': authCode
            }
        });

        if(response.statusCode == 200){
        	var body = response.getBody('utf8');
        	return JSON.parse(body).token;
	        
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

    module.exports = getToken;

})();
