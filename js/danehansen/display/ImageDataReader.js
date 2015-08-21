//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	ImageDataReader.WHITE = 765;

	ImageDataReader.brightness = function(data, width, height, x, y, mirror)
	{
		x = mirror ? (width - x - 1) : x;
		var start = (y * width + x) * 4;
		var total = data[start] + data[start + 1] + data[start + 2];
		return total;
	}

	function ImageDataReader(src, mirror)
	{
		this._mirror = !!mirror;
		this._src = src;
		this._canvas = document.createElement("canvas");
		this._context = this._canvas.getContext("2d");
		this._width = src.offsetWidth;
		this._height = src.offsetHeight;
		this._canvas.width = this._width;
		this._canvas.height = this._height;
		this._array = new Array(this._width);
		this.adjustContrast(true);
	}

	ImageDataReader.prototype.gather = function()
	{
			this._context.drawImage(this._src, 0, 0, this._width, this._height);
			this.data = this._context.getImageData(0, 0, this._width, this._height).data;
	}

	ImageDataReader.prototype.brightness = function(x, y, fraction, mirror)
	{
		var b =  ImageDataReader.brightness(this.data, this._width, this._height, x, y, this._mirror);
		if(this._shouldAdjust)
		{
			if(b < this._avg)
			{
				b = Math.round(MyMath.relativePercentage(this._low, this._avg, b) / 2 * ImageDataReader.WHITE);
			}
			else
			{
				b = Math.round(MyMath.relativePercentage(this._avg, this._high, b) / 2 * ImageDataReader.WHITE + Math.floor(ImageDataReader.WHITE / 2));
			}
		}
		if(fraction)
			b /= ImageDataReader.WHITE;
		return b;
	}

	ImageDataReader.prototype.adjustContrast = function(reset)
	{
		if(reset)
		{
			this._low = 0;
			this._high = ImageDataReader.WHITE;
			this._avg = Math.floor(ImageDataReader.WHITE / 2);
		}
		else
		{
			this._high = 0;
			this._low = ImageDataReader.WHITE;
			if(!this.data)
				this.gather();
			this._avg = 0;
			for(var i = 0, iLen = this.data.length; i < iLen; i+=4)
			{
				var b = (this.data[i] + this.data[i + 1] + this.data[i + 2]);
				this._avg += b;
				this._high = Math.max(this._high, b);
				this._low = Math.min(this._low, b);
			}
			this._avg = Math.round(this._avg / (this._width * this._height));
		}
		this._shouldAdjust = this._low !== 0 || this._high !== ImageDataReader.WHITE || this._avg !== Math.floor(ImageDataReader.WHITE / 2);
	}

	ImageDataReader.prototype.r = function(x, y)
	{
		return this.data[(y * this._width + (this._mirror ? (this._width - x - 1) : x)) * 4];
	}

	ImageDataReader.prototype.g = function(x, y)
	{
		return this.data[(y * this._width + (this._mirror ? (this._width - x - 1) : x)) * 4 + 1];
	}

	ImageDataReader.prototype.b = function(x, y)
	{
		return this.data[(y * this._width + (this._mirror ? (this._width - x - 1) : x)) * 4 + 2];
	}

	if(typeof module != "undefined")
		module.exports = ImageDataReader;
	else if(typeof window != "undefined")
		window.ImageDataReader = ImageDataReader;
})();