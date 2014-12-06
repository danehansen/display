"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires danehansen/events/EventDispatcher.js

Preloader.COMPLETE="complete";
Preloader._START_ANGLE=-Math.PI*0.5;

Preloader.prototype=Object.create(EventDispatcher.prototype);
Preloader.prototype.constructor=Preloader;
function Preloader(element, color, hole, duration)
{
	EventDispatcher.call(this);

	hole=typeof hole=="number"?hole:0;
	this.duration=typeof duration=="number"?duration:1;
	this._progress=0;
	this._isPlaying=false;
	this._isShowing=false;
	this._callback;
	this.element=element;
	var width=this.element.offsetWidth;
	var height=this.element.offsetHeight;
	this.element.width=width;
	this.element.height=height;
	this._context=this.element.getContext("2d");
	this._context.strokeStyle=color;
	this._size=Math.min(width, height);
	this._square={x:(width-this._size)/2, y:(height-this._size)/2};
	this._center={x:width/2, y:height/2};
	this._context.lineWidth=this._size/2*(1-hole);
	this._radius=this._size/2-this._context.lineWidth/2;

	this.play=this.play.bind(this);
	this.stop=this.stop.bind(this);
	element.style.display="none";
}

Preloader.prototype.progress=function(num)
{
	if(num)
	{
		if(num!=this._progress)
		{
			this._context.clearRect(this._square.x, this._square.y, this._size, this._size);
			this._progress=num;
			var modulo=num%2;
			if(modulo==0)
			{
				if(!this._isPlaying)
				{
					this.dispatchEvent(Preloader.COMPLETE);
					if(this._isShowing)
					{
						this.element.style.display="none";
						this._isShowing=false;
					}
				}
			}
			else
			{
				this._context.beginPath();
				this._context.arc(this._center.x, this._center.y, this._radius, Preloader._START_ANGLE, Preloader._START_ANGLE+Math.PI*2*modulo, modulo>1);
				this._context.stroke();
				if(!this._isShowing)
				{
					this.element.style.display="";
					this._isShowing=true;
				}
			}
		}
	}
	else
	{
		return this._progress;
	}
}

Preloader.prototype.play=function()
{
	this._isPlaying=true;
	this.revolve();
}

Preloader.prototype.stop=function(callback)
{
	this._isPlaying=false;
	this._callback=callback;
}

Preloader.prototype.revolve=function()
{
	if(this._isPlaying || this._progress%2!=0)
	{
		TweenLite.to(this, this.duration, {progress:Math.round(this._progress+1), ease:Cubic.easeInOut, onComplete:this.revolve, onCompleteScope:this});
	}
	else if(!this._isPlaying && this._progress%2==0 && !(!this._callback))
	{
		this._callback();
		this._callback=null;
	}
}