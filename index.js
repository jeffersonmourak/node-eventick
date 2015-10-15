(function(){
	"use strict";

	var token = require("./core/authentication");
	var Events = require("./core/events");

	function Eventick(email, password){
		this.token = token(email,password);
		this.events = new Events(this.token);
	}

	var n = new	Eventick("jefinho.moura14@gmail.com","230296s2");
	console.log(n.events.get(20533));


})();