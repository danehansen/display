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

	CharImage.CODE_PAGE_437 = "☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■".split("");

	function _entitify(str)
	{
		/*return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   		return '&#'+i.charCodeAt(0)+';';});*/
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
			var rowHeight = Math.ceil(this.rowHeight);
			var backgroundColor = computedStyle.backgroundColor;
			var color = computedStyle.color;
			for(var i = 0, iLen = this._charSet.length; i < iLen; i++)
			{
				var str = this._charSet[i];
				context.fillStyle = backgroundColor;
				context.fillRect(0, 0, columnWidth, rowHeight);
				context.fillStyle = color;
				context.fillText(str, 0, 0);
				var data = context.getImageData(0, 0, columnWidth, rowHeight).data;
				var brightness = 0;
				for(var j = 0; j < rowHeight; j++)
				{
					for(var k = 0; k < columnWidth; k++)
					{
						brightness += ImageDataReader.brightness(data, columnWidth, rowHeight, k, j);;
					}
				}
				brightness = Math.round(brightness / (columnWidth * rowHeight));
				charDatas.push({str: _entitify(this._charSet[i]), brightness: brightness});
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

	CharImage.prototype.dataToString = function(idr, columns, rows)
	{
		var str = "";
		for(var i = 0; i < rows; i++)
		{
			for(var j = 0; j < columns; j++)
			{
				str += this.brightnessToChar(Math.min(ImageDataReader.WHITE, Math.max(0, idr.brightness(j, i, false, this._mirror))));
				if(j === columns - 1)
					str += "<br/>";
			}
		}
		return str;
	}

	if(typeof module != "undefined")
		module.exports = CharImage;
	else if(typeof window != "undefined")
		window.CharImage = CharImage;
})();