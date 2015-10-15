(function(){
	"use strict";

	var token = require("./core/authentication");
	var Events = require("./core/events");

	function Eventick(email, password){
		this.token = token(email,password);
		this.events = new Events(this.token);
	}

	module.exports = Eventick;

})();