//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	/*if(typeof module != "undefined")
	{
		var MyMath = require("./MyMath");
		var ImageDataReader = require("./ImageDataReader");
	}*/

	CharImage.ASCII = [];
	for(var i = 32; i <= 126; i++)
	{
		CharImage.ASCII.push(String.fromCharCode(i));
	}

	function _entitify(str)
	{
		if(str === " ")
			return "&nbsp;";
		else if(str === '"')
			return "&quot;";
		else if(str === "'")
			return "&apos;";
		else if(str === "&")
			return "&amp;";
		else if(str === "<")
			return "&lt;";
		else if(str === ">")
			return "&gt;";
		else
			return str;
	}

	function _sortByBrightness(a, b)
	{
		return a.brightness - b.brightness;
	}

	function CharImage(dest, charSet, mirror)
	{
		this._mirror = !!mirror;
		this._offset = 0;
		this._dest = dest;
		this._charSet = charSet || CharImage.ASCII;
		this._calculate();
	}

	CharImage.prototype._calculate = function(num)
	{
		//create dummy canvas
			var canvas = document.createElement("canvas");
			var context = canvas.getContext("2d");

		//find character dimentions
			var computedStyle = window.getComputedStyle(this._dest);
			var style = this._dest.style;
			style.width = "auto";
			style.position = "absolute";
			this._dest.innerHTML = "WWWWWWWWWWWWWWWWWWWW";
			this.columnWidth = this._dest.offsetWidth / 20;
			this._dest.innerHTML = "";
			style.width = null;
			style.position = null;
			this.rowHeight = parseFloat(computedStyle.lineHeight);

		//find shades
			document.body.appendChild(canvas);
			context.font = computedStyle.fontSize + " " + computedStyle.fontFamily;
			context.textAlign = "left";
			context.textBaseline = "top";
			var charDatas = [];
			this._shades = [];
			var columnWidth = Math.ceil(this.columnWidth);
			var backgroundColor = computedStyle.backgroundColor;
			var color = computedStyle.color;
			for(var i = 0, iLen = this._charSet.length; i < iLen; i++)
			{
				var str = this._charSet[i];
				context.fillStyle = backgroundColor;
				context.fillRect(0, 0, columnWidth, this.rowHeight);
				context.fillStyle = color;
				context.fillText(str, 0, 0);
				var data = context.getImageData(0, 0, columnWidth, this.rowHeight).data;
				var brightness = 0;
				for(var j = 0; j < this.rowHeight; j++)
				{
					for(var k = 0; k < columnWidth; k++)
					{
						brightness += ImageDataReader.brightness(data, columnWidth, this.rowHeight, k, j);
					}
				}
				brightness = Math.round(brightness / (columnWidth * this.rowHeight));
				charDatas.push({str: _entitify(str), brightness: brightness});
			}
			document.body.removeChild(canvas);

		//sort shades and add characters associated
			charDatas.sort(_sortByBrightness);
			var shadeBuilder = [];
			for(i = 0, iLen = charDatas.length; i < iLen; i++)
			{
				var cd = charDatas[i];
				var index = Math.round(MyMath.relativePercentage(charDatas[0].brightness, charDatas[iLen - 1].brightness, cd.brightness) * ImageDataReader.WHITE);
				if(!shadeBuilder[index])
					shadeBuilder[index] = [];
				shadeBuilder[index].push(cd);
			}
			for(i = 0, iLen = shadeBuilder.length; i < iLen; i++)
			{
				if(shadeBuilder[i])
					MyMath.shuffle(shadeBuilder[i]);
			}
			for(i = 0; i < iLen; i++)
			{
				if(!shadeBuilder[i])
				{
					var closest;
					var away = 1;
					do
					{
						if(shadeBuilder[Math.min(shadeBuilder.length - 1, Math.max(0, i + away))])
							closest = shadeBuilder[Math.min(shadeBuilder.length - 1, Math.max(0, i + away))];
						else if(shadeBuilder[Math.min(shadeBuilder.length - 1, Math.max(0, i - away))])
							closest = shadeBuilder[Math.min(shadeBuilder.length - 1, Math.max(0, i + (away)))];
						away++;
					}
					while(!closest)
					shadeBuilder[i] = closest;
				}
				this._shades[i] = shadeBuilder[i][0].str;
			}
	}

	CharImage.prototype.brightnessToChar = function(brightness)
	{
		return this._shades[brightness];
	}

	CharImage.prototype.dataToString = function(data, columns, rows)
	{
		var str = "";
		for(var i = 0; i < rows; i++)
		{
			for(var j = 0; j < columns; j++)
			{
				str += this.brightnessToChar(Math.min(ImageDataReader.WHITE, Math.max(0, ImageDataReader.brightness(data, columns, rows, j, i, false, this._mirror) + this._offset)));
				if(j === columns - 1)
					str += "<br/>";
			}
		}
		return str;
	}

	CharImage.prototype.offset = function(num)
	{
		// this._offset = -Math.round(num * ImageDataReader.WHITE);
	}

	if(typeof module != "undefined")
		module.exports = CharImage;
	else if(typeof window != "undefined")
		window.CharImage = CharImage;
})();

