"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js

// TODO: Sprite, SuperSprite, ForwardRewind, PlayThrough

function Sprite(element, columns, totalFrames, loop, frameRate)
{
	this.element=element;
	this._columns=columns;
	this._totalFrames=totalFrames;
	this._isLoop=loop||false;
	this._frameRate=frameRate||60;

	this._progress=0;
	this._currentFrame=0;
	this._dest=null;
	this._isLooping=false;
	
	this.resize();
}

Sprite.prototype.resize=function()
{
	this._columnWidth=this.element.offsetWidth;
	this._rowHeight=this.element.offsetHeight;
	this._showFrame(this._currentFrame);
}

Sprite.prototype.progress=function(num)
{
	if(typeof num!="number")
	{
		return this._progress;
	}
	else
	{
		if(!this._isLoop)
			num=this._clamp(num);
		this._progress=num;
		var dest=this._progressToFrame(num)%this._totalFrames;
		if(this._currentFrame!=dest)
			this._showFrame(dest);
	}
}

Sprite.prototype.currentFrame=function(integer)
{
	if(typeof integer!="number")
		return this._currentFrame;
	else
		this.progress(this._frameToProgress(integer));
}

Sprite.prototype.progressTo=function(num)
{
	num=this._clamp(num);
	if(this._progress!==num && this._dest!==num)
	{
		this._dest=num;
		var dur=Math.abs(num-this._progress)*this._totalFrames/this._frameRate;
		TweenLite.to(this, dur, {progress:num, ease:Linear.easeNone, onComplete:this._resetDest, onCompleteScope:this});
	}
}

Sprite.prototype.frameTo=function(integer)
{
	this.progressTo(this._frameToProgress(integer));
}

Sprite.prototype.play=function()
{
	this.progressTo(Math.round(this._progress+0.5));
}

Sprite.prototype.rewind=function()
{
	this.progressTo(Math.round(this._progress-0.5));
}

Sprite.prototype.loop=function()
{
	this._isLooping=true;
	this.play();
}

Sprite.prototype.stop=function()
{
	this._isLooping=false;
	this._dest=null;
	TweenLite.killTweensOf(this);
}

Sprite.prototype._showFrame=function(integer)
{
	this._currentFrame=integer;
	this.element.style.backgroundPosition=-(this._columnWidth*(integer%this._columns))+"px "+-(this._rowHeight*Math.floor(integer/this._columns))+"px";
}

Sprite.prototype._progressToFrame=function(num)
{
	return Math.floor(num*this._totalFrames);
}

Sprite.prototype._frameToProgress=function(integer)
{
	return integer/(this._totalFrames-1);
}

Sprite.prototype._clamp=function(num)
{
	if(this._isLoop)
		return Math.max(0,Math.min(num,1));
	else
		return num;
}

Sprite.prototype._resetDest=function()
{
	this._dest=null;
	if(this._isLooping)
		this.progressTo(this._progress+1);
}