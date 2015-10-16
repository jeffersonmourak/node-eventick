(function(){
	"use strict";

	var token = require("./core/authentication");
	var Events = require("./core/events");
	var Attendees = require('./core/attendees');
	function Eventick(email, password){
		this.token = token(email,password);
		this.events = new Events(this.token);
		this.attendees = new Attendees(this.token);
	}

	module.exports = Eventick;

})();