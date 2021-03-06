//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

//requires danehansen/display/Sprite.js
var Sprite = Sprite || require("./Sprite");

(function(){
	"use strict";

	ForwardRewind.prototype = Object.create(Sprite.prototype);
	ForwardRewind.prototype.constructor = ForwardRewind;
	function ForwardRewind(element, columns, totalFrames, frameRate)
	{
		Sprite.call(this, element, columns, totalFrames, false, frameRate);

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);

		this.activate();
	}

	ForwardRewind.prototype.activate = function()
	{
		this.element.addEventListener("mouseover", this.play);
		this.element.addEventListener("mouseout", this.rewind);
	}

	ForwardRewind.prototype.deactivate = function()
	{
		this.element.removeEventListener("mouseover", this.play);
		this.element.removeEventListener("mouseout", this.rewind);
	}

	if(typeof module != "undefined")
		module.exports = ForwardRewind;
	else if(typeof window != "undefined")
		window.ForwardRewind = ForwardRewind;
})();
