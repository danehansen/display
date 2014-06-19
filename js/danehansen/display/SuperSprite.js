"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires danehansen/events/EventDispatcher.js
	//requires danehansen/display/Sprite.js

SuperSprite.prototype=Object.create(Sprite.prototype);
SuperSprite.prototype.constructor=SuperSprite;
function SuperSprite(sprites, loop, frameRate)
{
	Sprite.call(this, null, null, null, loop, frameRate);

	this.sprites=sprites;
	this._frames=0;
	this._spriteFrames=[];
	for(var i=0, iLen=sprites.length; i<iLen; i++)
	{
		var sprite=sprites[i];
		if(i==0)
			this._spriteShowing=sprite;
		else
			sprite.element.style.display="none";
		for(var j=0, jLen=sprite._frames; j<jLen; j++)
		{
			this._spriteFrames.push({sprite:sprite,frame:j});
		}
		this._frames+=jLen;
	}
	this._showFrame(this._frame);
}

SuperSprite.prototype._showFrame=function(integer)
{
	this._actualFrame=integer;
	var data=this._spriteFrames[integer];
	var sprite=data.sprite;
	if(sprite!=this._spriteShowing)
	{
		this._spriteShowing.element.style.display="none";
		sprite.element.style.display="";
		this._spriteShowing=sprite;
	}
	sprite._showFrame(data.frame);
}

SuperSprite.prototype.resize=function()
{
	for(var i=0, iLen=sprites.length; i<iLen; i++)
	{
		var sprite=this.sprites[i];
		if(sprite!=this._spriteShowing)
		{
			var style=sprite.element.style;
			style.display="";
		}
		this.sprites[i].resize();
		if(style)
			style.display="none";
	}
	this._showFrame(this._frame);
}