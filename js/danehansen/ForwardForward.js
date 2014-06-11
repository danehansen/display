"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires danehansen/Sprite.js

ForwardForward.prototype=new Sprite();
ForwardForward.prototype.constructor=Sprite;
function ForwardForward(element, columns, totalFrames, overFrame, frameRate)
{
	Sprite.call(this, element, columns, totalFrames, true, frameRate);
	this.activate=this.activate.bind(this);
	this.deactivate=this.deactivate.bind(this);
	this._onMouseOver=this._onMouseOver.bind(this);
	this.overFrame=this.overFrame.bind(this);
	this.overFrame(overFrame);
	this.activate();
}

ForwardForward.prototype.overFrame=function(overFrame)
{
	if(typeof overFrame=="number")
		this._overProgress=this._frameToProgress(overFrame);
	else
		return this._progressToFrame(this._overProgress);
}

ForwardForward.prototype.activate=function()
{
	this.element.addEventListener("mouseover", this._onMouseOver);
	this.element.addEventListener("mouseout", this.play);
}

ForwardForward.prototype._onMouseOver=function(evt)
{
	this.progressTo(Math.ceil(this.progress())+this._overProgress);
}

ForwardForward.prototype.deactivate=function()
{
	this.element.removeEventListener("mouseover", this._onMouseOver);
	this.element.removeEventListener("mouseout", this.play);
}