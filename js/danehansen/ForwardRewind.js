"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires danehansen/Sprite.js

ForwardRewind.prototype=new Sprite();
ForwardRewind.prototype.constructor=Sprite;
function ForwardRewind(element, columns, totalFrames, frameRate)
{
	console.log("ForwardRewind", element, columns, totalFrames, frameRate);
	Sprite.call(this, element, columns, totalFrames, false, frameRate);
	this._onMouseOver=this._onMouseOver.bind(this);
	this._onMouseOut=this._onMouseOut.bind(this);
	this.activate();
}

ForwardRewind.prototype.activate=function()
{
	console.log("ForwardRewind.activate");
	this.element.addEventListener("mouseover", this._onMouseOver);
	this.element.addEventListener("mouseout", this._onMouseOut);
}

ForwardRewind.prototype._onMouseOver=function(evt)
{
	console.log("ForwardRewind._onMouseOver");
	this.play();
}

ForwardRewind.prototype._onMouseOut=function(evt)
{
	console.log("ForwardRewind._onMouseOut");
	this.rewind();
}

ForwardRewind.prototype.deactivate=function()
{
	console.log("ForwardRewind.deactivate");
	this.element.removeEventListener("mouseover", this._onMouseOver);
	this.element.removeEventListener("mouseout", this._onMouseOut);
}