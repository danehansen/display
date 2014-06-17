"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires danehansen/events/EventDispatcher.js
	//requires danehansen/display/Sprite.js

ForwardRewind.prototype=Object.create(Sprite.prototype);
ForwardRewind.prototype.constructor=ForwardRewind;
function ForwardRewind(element, columns, totalFrames, frameRate)
{
	Sprite.call(this, element, columns, totalFrames, false, frameRate);
	
	this.activate=this.activate.bind(this);
	this.deactivate=this.deactivate.bind(this);
	
	this.activate();
}

ForwardRewind.prototype.activate=function()
{
	this.element.addEventListener("mouseover", this.play);
	this.element.addEventListener("mouseout", this.rewind);
}

ForwardRewind.prototype.deactivate=function()
{
	this.element.removeEventListener("mouseover", this.play);
	this.element.removeEventListener("mouseout", this.rewind);
}