//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	function _makeCanvas()
	{
		var canvas = document.createElement("canvas");
		return {canvas: canvas, context: canvas.getContext("2d")};
	}

	var _canvas = _makeCanvas();
	var _REGEX = /url\(['"]?([^\)'"']+)['"]?\)/;

	function Glitch(element)
	{
		this._isImg = element.nodeName.toUpperCase() == "IMG";
		if(!this._isImg)
		{
			var bgImg = window.getComputedStyle(element)["backgroundImage"];
			this._hasBG = /url\(/.test(bgImg);
		}
		if(this._isImg || this._hasBG)
		{
			this._offscreen = new Image();
			if(this._isImg)
				this._offscreen.setAttribute("src", element.getAttribute("src"));
			else
				this._offscreen.setAttribute("src", _REGEX.exec(bgImg)[1]);
			this._fucked = 0;
			this._onLoaded = this._onLoaded.bind(this);
			this._onError = this._onError.bind(this);
			this._onLoad = this._onLoad.bind(this);
			this.element = element;
			if(!this._offscreen.width > 0)
				this._offscreen.addEventListener("load", this._onLoaded);
			else
				this._onLoaded();
		}
	}

	Glitch.prototype._onLoaded = function(evt)
	{
		if(evt)
			this._offscreen.removeEventListener("load", this._onLoaded);
		var w = this._offscreen.width;
		var h = this._offscreen.height;
		_canvas.canvas.width = w;
		_canvas.canvas.height = h;
		_canvas.context.drawImage(this._offscreen, 0, 0);
		try
		{
			var regex = /(data:image\/[\S]+;base64,)([\S]+)/.exec(_canvas.canvas.toDataURL('image/jpeg'));
			this._prefix = regex[1];
			this._decoded = atob(regex[2]);
			if(this._toFuck)
				this.fucked(this._toFuck);
		}
		catch(err)
		{
			_canvas = _makeCanvas();
		}
	}

	Glitch.prototype.fucked = function(num)
	{
		if(typeof num == "number")
		{
			if(this._decoded)
			{
				this._fucked = num;
				this._offscreen.addEventListener("load", this._onLoad);
				this._offscreen.addEventListener("error", this._onError);
				this._offscreen.setAttribute("src", this._prefix+btoa(this._randomizeCharacter(this._decoded)));
			}
			else
			{
				this._toFuck = num;
			}
		}
		else
		{
			return this._fucked;
		}
	}

	Glitch.prototype._onError = function()
	{
		this._offscreen.setAttribute("src", this._prefix + btoa(this._randomizeCharacter(this._decoded)));
	}

	Glitch.prototype._onLoad = function(evt)
	{
		evt.target.removeEventListener("load", this._onLoad);
		evt.target.removeEventListener("error", this._onError);
		if(this._isImg)
			this.element.src = evt.target.src;
		else
			this.element.style.backgroundImage = "url(" + evt.target.src + ")";
	}

	Glitch.prototype._randomizeCharacter = function(data)
	{
		for(var i = 0; i < this._fucked; i++)
		{
			var randomIndex = Math.floor(Math.random() * data.length);
			data = data.substring(0, randomIndex) + String.fromCharCode(Math.floor(Math.random() * 256)) + data.substring(randomIndex + 1);
		}
		return data;
	}

	if(typeof module != "undefined")
		module.exports=Glitch;
	else if(typeof window != "undefined")
		window.Glitch=Glitch;
})();