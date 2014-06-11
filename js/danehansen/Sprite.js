"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js
  	// TODO: SuperSprite, PlayThrough

Sprite.ENTER_FRAME="onEnterFrame";
Sprite.COMPLETE="onComplete";
Sprite.REVERSE_COMPLETE="onReverseComplete";

function Sprite(element, columns, totalFrames, loop, frameRate)
{
	if(arguments.length>0)
	{
		this.element=element;
		this._columns=columns;
		this._totalFrames=totalFrames;
		this.loop=loop||false;
		this.frameRate=frameRate||60;

		this._progress=0;
		this._frame=0;
		this._actualFrame=0;
		this._dest=null;
		this._callbacks={};
		this.resize=this.resize.bind(this);
		this.progress=this.progress.bind(this);
		this.frame=this.frame.bind(this);
		this.progressTo=this.progressTo.bind(this);
		this.frameTo=this.frameTo.bind(this);
		this.play=this.play.bind(this);
		this.rewind=this.rewind.bind(this);
		this.stop=this.stop.bind(this);
		this.prevFrame=this.prevFrame.bind(this);
		this.nextFrame=this.nextFrame.bind(this);
		this.addEventListener=this.addEventListener.bind(this);
		this.removeEventListener=this.removeEventListener.bind(this);
		this.dispatchEvent=this.dispatchEvent.bind(this);
		
		this.resize();
	}
}

Sprite.prototype.resize=function()
{
	this._width=this.element.offsetWidth;
	this._height=this.element.offsetHeight;
	this._showFrame(this._frame);
}

Sprite.prototype.progress=function(value)
{
	if(typeof value!="number")
	{
		return this._progress;
	}
	else
	{
		value=this._limit(value);
		if(this._progress!=value)
		{
			var dispatch=true;
			var forward=value>this._progress;
		}
		this._progress=value;
		var dest=this._progressToFrame(value);
		this._frame=dest;
		while(dest<0)
		{
			dest+=this._totalFrames;
		}
		dest=dest%this._totalFrames;
		if(this._actualFrame!=dest)
		{
			this._showFrame(dest);
			this.dispatchEvent(Sprite.ENTER_FRAME);
		}
		if(dispatch && value%1==0)
			this.dispatchEvent(forward?Sprite.COMPLETE:Sprite.REVERSE_COMPLETE);
	}
}

Sprite.prototype.frame=function(value)
{
	if(typeof value!="number")
		return this._frame;
	else
		this.progress(this._frameToProgress(value));
}

Sprite.prototype.progressTo=function(num, _loopDir)
{
	num=this._limit(num);
	if(this._progress!==num && this._dest!==num)
	{
		this._dest=num;
		var dur=Math.abs(num-this._progress)*this._totalFrames/this.frameRate;
		TweenLite.to(this, dur, {progress:num, ease:Linear.easeNone, onComplete:this._resetDest, onCompleteScope:this, onCompleteParams:[_loopDir]});
	}
}

Sprite.prototype.frameTo=function(integer)
{
	this.progressTo(this._frameToProgress(integer));
}

Sprite.prototype.nextFrame=function()
{
	this.frame(this._frame+1);
}

Sprite.prototype.prevFrame=function()
{
	this.frame(this._frame-1);
}

Sprite.prototype.play=function(loop)
{
	this.progressTo(Math.round(this._progress+0.5), loop===true?1:null);
}

Sprite.prototype.rewind=function(loop)
{
	this.progressTo(Math.round(this._progress-0.500000001), loop===true?-1:null);
}

Sprite.prototype.stop=function()
{
	this._dest=null;
	TweenLite.killTweensOf(this);
}

Sprite.prototype.addEventListener=function(type, listener)
{
	var callbacks=this._callbacks[type];
	if(!callbacks)
	{
		callbacks=[];
		this._callbacks[type]=callbacks;
	}
	if(callbacks.indexOf(listener)==-1)
		callbacks.push(listener);
}

Sprite.prototype.removeEventListener=function(type, listener)
{
	var callbacks=this._callbacks[type];
	if(callbacks)
	{
		var index=callbacks.indexOf(listener);
		if(index>=0)
			callbacks.splice(index,1);
	}
}

Sprite.prototype.dispatchEvent=function(type)
{
	var callbacks=this._callbacks[type];
	if(callbacks)
	{
		var obj={target:this, type:type};
		for(var i=0, iLen=callbacks.length; i<iLen; i++)
		{
			callbacks[i](obj);
		}
	}
}

Sprite.prototype._showFrame=function(integer)
{
	this._actualFrame=integer;
	this.element.style.backgroundPosition=-(this._width*(integer%this._columns))+"px "+-(this._height*Math.floor(integer/this._columns))+"px";
}

Sprite.prototype._progressToFrame=function(num)
{
	if(num<0)
		return Math.ceil(num*(this._totalFrames-(this.loop?0:1)));
	else
		return Math.floor(num*(this._totalFrames-(this.loop?0:1)));
}

Sprite.prototype._frameToProgress=function(integer)
{
	if(this.loop)
		return integer/(this._totalFrames-0);
	else
		return integer/(this._totalFrames-1);
}

Sprite.prototype._limit=function(num)
{
	if(!this.loop)
		return Math.max(0,Math.min(num,1));
	else
		return num;
}

Sprite.prototype._resetDest=function(loopDir)
{
	this._dest=null;
	if(loopDir==1)
		this.progressTo(this._progress+1, loopDir);
	else if(loopDir==-1)
		this.progressTo(this._progress-1, loopDir);
}