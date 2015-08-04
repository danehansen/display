//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	ImageDataReader.WHITE = 765;

	ImageDataReader.brightness = function(data, width, height, x, y, fraction, mirror)
	{
		x = mirror ? (width - x - 1) : x;
		var start = (y * width + x) * 4;
		var total = data[start] + data[start + 1] + data[start + 2];
		if(fraction)
			total /= ImageDataReader.WHITE;
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
	}

	ImageDataReader.prototype.gather = function()
	{
			this._context.drawImage(this._src, 0, 0, this._width, this._height);
			this.data = this._context.getImageData(0, 0, this._width, this._height).data;
	}

	ImageDataReader.prototype.brightness = function(x, y, fraction)
	{
		return ImageDataReader.brightness(this.data, this._width, this._height, x, y, fraction, this._mirror);
	}

	ImageDataReader.prototype.average = function(fraction)
	{
		if(!this.data)
			this.gather();
		var total = 0;
		for(var i = 0, iLen = this.data.length; i < iLen; i+=4)
		{
			total += (this.data[i] + this.data[i + 1] + this.data[i + 2]);
		}
		total /= (this._width * this._height);
		if(fraction)
			total /= ImageDataReader.WHITE;
		else
			total = Math.round(total);
		return total;
	}

	ImageDataReader.prototype.r = function(x, y)
	{
		return this.data[(y * this._width + x) * 4];
	}

	ImageDataReader.prototype.g = function(x, y)
	{
		return this.data[(y * this._width + x) * 4 + 1];
	}

	ImageDataReader.prototype.b = function(x, y)
	{
		return this.data[(y * this._width + x) * 4 + 2];
	}

	if(typeof module != "undefined")
		module.exports = ImageDataReader;
	else if(typeof window != "undefined")
		window.ImageDataReader = ImageDataReader;
})();