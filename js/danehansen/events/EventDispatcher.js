//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	var _callbacks = {};

	function EventDispatcher()
	{
		this._callbacks = {};
	}

	function _addEventListener(callbackHolder, type, listener)
	{
		var callbacks = callbackHolder[type];
		if(!callbacks)
		{
			callbacks = [];
			callbackHolder[type] = callbacks;
		}
		if(callbacks.indexOf(listener) == -1)
			callbacks.push(listener);
	}

		EventDispatcher.prototype.addEventListener = function(type, listener)
		{
			_addEventListener(this._callbacks, type, listener);
		}

		EventDispatcher.addEventListener = function(type, listener)
		{
			_addEventListener(_callbacks, type, listener);
		}

	function _removeEventListener(callbackHolder, type, listener)
	{
		var callbacks = callbackHolder[type];
		if(callbacks)
		{
			var index = callbacks.indexOf(listener);
			if(index >= 0)
				callbacks.splice(index, 1);
		}
	}

		EventDispatcher.prototype.removeEventListener = function(type, listener)
		{
			_removeEventListener(this._callbacks, type, listener);
		}

		EventDispatcher.removeEventListener = function(type, listener)
		{
			_removeEventListener(_callbacks, type, listener);
		}

	EventDispatcher.prototype.dispatchEvent = function(type)
	{
		var callbacks = this._callbacks[type];
		if(callbacks)
		{
			var obj = {target: this, type: type};
			for(var i = 0, iLen = callbacks.length; i < iLen; i++)
			{
				callbacks[i](obj);
			}
		}
	}

	EventDispatcher.dispatchEvent = function(type)
	{
		var callbacks = _callbacks[type];
		if(callbacks)
		{
			var args = Array.prototype.slice.call(arguments, 1);
			for(var i = 0, iLen = callbacks.length; i < iLen; i++)
			{
				var callback = callbacks[i];
				callback.apply(callback, args);
			}
		}
	}

	if(typeof module != "undefined")
		module.exports = EventDispatcher;
	else if(typeof window != "undefined")
		window.EventDispatcher = EventDispatcher;
})();
