"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

function EventDispatcher()
{
	this._callbacks={};
}

EventDispatcher.prototype.addEventListener=function(type, listener)
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

EventDispatcher.prototype.removeEventListener=function(type, listener)
{
	var callbacks=this._callbacks[type];
	if(callbacks)
	{
		var index=callbacks.indexOf(listener);
		if(index>=0)
			callbacks.splice(index,1);
	}
}

EventDispatcher.prototype.dispatchEvent=function(type)
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