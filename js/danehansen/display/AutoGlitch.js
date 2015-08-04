//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	//requires danehansen/display/Glitch.js
	if(typeof module != "undefined")
		var Glitch = require("./Glitch");

	AutoGlitch.prototype=Object.create(Glitch.prototype);
	AutoGlitch.prototype.constructor=AutoGlitch;
	function AutoGlitch(element, cleanTime, glitchTime, fuckLimit)
	{
		Glitch.call(this, element);

		this.cleanTime = cleanTime || 1500;
		this.glitchTime = glitchTime || 100;
		this.fuckLimit = fuckLimit || 5;
		this._timeout = null;

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);
		this._onDelay = this._onDelay.bind(this);

		this.activate();
	}

	AutoGlitch.prototype.activate = function()
	{
		this._onDelay();
	}

	AutoGlitch.prototype.deactivate = function()
	{
		clearTimeout(this._timeout);
		this.fucked(0);
	}

	AutoGlitch.prototype._onDelay = function()
	{
		if(this._fucked == 0)
		{
			this.fucked(Math.random() * this.fuckLimit);
			this._timeout = setTimeout(this._onDelay, Math.random() * this.glitchTime);
		}
		else
		{
			this.fucked(0);
			this._timeout = setTimeout(this._onDelay, Math.random() * this.cleanTime);
		}
	}

	if(typeof module != "undefined")
		module.exports = AutoGlitch;
})();