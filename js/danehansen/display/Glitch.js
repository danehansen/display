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
		return {node: canvas, context: canvas.getContext("2d")};
	}
	
	var _canvas = _makeCanvas();
	var _checkURLRegex = /url\(['"]?([^\)'"']+)['"]?\)/;
	var _imageDataRegex = /(data:image\/[\S]+;base64,)([\S]+)/;

	function Glitch(element)
	{
		this._fucked = 0;
		this._onError = this._onError.bind(this);
		this._onLoad = this._onLoad.bind(this);
		this.element = element;
		this._offscreen = new Image();

		var nodeName = element.nodeName;
		if(nodeName)
		{
			if(nodeName.toLowerCase() == "img")
			{
				this._initImg(element);
			}
			else
			{
				var bgImg = window.getComputedStyle(element).backgroundImage;
				if(/url\(/.test(bgImg))
					this._initBG(element, bgImg);
			}
		}
		else
		{
			this._src = element.src;
			this.element = element.dest;
			if(this._src && this.element)
				this._initVideo(element.mirror);
		}
	}

		Glitch.prototype._initStatic = function(src)
		{
			this._onLoaded = this._onLoaded.bind(this);
			this._offscreen.setAttribute("src", src);
			if(!this._offscreen.width > 0)
				this._offscreen.addEventListener("load", this._onLoaded);
			else
				this._onLoaded();
		}

	Glitch.prototype._initImg = function(element)
	{
		this._type = "img";
		this._initStatic(element.getAttribute("src"));
	}

	Glitch.prototype._initBG = function(element, bgImg)
	{
		this._type = "bg";
		this._initStatic(_checkURLRegex.exec(bgImg)[1]);
	}

	Glitch.prototype._initVideo = function(mirror)
	{
		this._mirror = mirror || false;
		this._type = "video";
		this._onVideoLoaded = this._onVideoLoaded.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this._onVideoLoaded();
		this.start();
	}

	Glitch.prototype.start = function()
	{
		if(this._type !== "video")
			return;
		else
			this._interval = setInterval(this._onInterval, 1000 / 30);
	}

	Glitch.prototype.stop = function()
	{
		if(this._type !== "video")
			return;
		else
			clearInterval(this._interval);
	}

	Glitch.prototype._sizeAndFlipCanvas = function()
	{
		var node = _canvas.node;
		node.width = this._destWidth;
		node.height = this._destHeight;
		if(this._mirror)
			_canvas.context.scale(-1, 1);
	}

	Glitch.prototype._onVideoLoaded = function(evt)
	{
		if(evt)
			this._offscreen.removeEventListener("load", this._onVideoLoaded);
		this._destWidth = this.element.offsetWidth;
		this._destHeight = this.element.offsetHeight;
		this.element.width = this._destWidth;
		this.element.height = this._destHeight;
		var node = _canvas.node;
		this._sizeAndFlipCanvas();
		var style = node.style;
		style.width = this._destWidth + "px";
		style.height = this._destHeight + "px";
		this._onInterval = this._onInterval.bind(this);
	}

	Glitch.prototype._calculateGlitch = function()
	{
		var regex = _imageDataRegex.exec(_canvas.node.toDataURL('image/jpeg'));
		this._prefix = regex[1];
		this._decoded = atob(regex[2]);
	}

	Glitch.prototype._onInterval = function()
	{
		_canvas.context.drawImage(this._src, this._destWidth * (this._mirror ? -1 : 1), 0, this._destWidth, this._destHeight);
		try
		{
			this._calculateGlitch();
			this._offscreen.addEventListener("load", this._onLoad);
			this._offscreen.addEventListener("error", this._onError);
			this._offscreen.setAttribute("src", this._prefix+btoa(this._randomizeCharacter(this._decoded)));
		}
		catch(err)
		{
			_canvas = _makeCanvas();
			this._sizeAndFlipCanvas();
		}
	}

	Glitch.prototype._onLoaded = function(evt)
	{
		if(evt)
			this._offscreen.removeEventListener("load", this._onLoaded);
		var w = this._offscreen.width;
		var h = this._offscreen.height;
		_canvas.node.width = w;
		_canvas.node.height = h;
		_canvas.context.drawImage(this._offscreen, 0, 0);
		try
		{
			this._calculateGlitch();
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
				if(this._type !== "video")
				{
					this._offscreen.addEventListener("load", this._onLoad);
					this._offscreen.addEventListener("error", this._onError);
					this._offscreen.setAttribute("src", this._prefix+btoa(this._randomizeCharacter(this._decoded)));
				}
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
		if(this._type === "img")
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
