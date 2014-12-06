"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

(function(){
	window.Canvas=function(widthOrCanvas, height)
	{
		if(typeof widthOrCanvas=="number")
		{
			this.element=document.createElement("canvas");
			this.element.width=widthOrCanvas;
			this.element.height=height;
		}
		else
		{
			this.element=widthOrCanvas;
			this.element.width=this.element.offsetWidth;
			this.element.height=this.element.offsetHeight;
		}
		this.context=this.element.getContext("2d");
	}

	Canvas.prototype.width=function(num)
	{
		if(typeof num=="number")
			this.element.width=num;
		else
			return this.element.width;
	}

	Canvas.prototype.height=function(num)
	{
		if(typeof num=="number")
			this.element.height=num;
		else
			return this.element.height;
	}

	Canvas.correctArcs=function()
	{
		CanvasRenderingContext2D.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise)
		{
			var signedLength;
			var tau = 2 * Math.PI;
			if (!anticlockwise && (endAngle - startAngle) >= tau)
			{
				signedLength = tau;
			}
			else if(anticlockwise && (startAngle - endAngle) >= tau)
			{
				signedLength = -tau;
			}
			else
			{
				var delta = endAngle - startAngle;
				signedLength = delta - tau * Math.floor(delta / tau);
				if (Math.abs(delta) > 1e-12 && signedLength < 1e-12)
					signedLength = tau;
				if (anticlockwise && signedLength > 0)
					signedLength = signedLength - tau;
			}
			var minCurves = Math.ceil(Math.abs(signedLength)/(Math.PI/2));
			var numCurves = Math.ceil(Math.max(minCurves, Math.sqrt(radius)));
			var cpRadius = radius * (2 - Math.cos(signedLength / (numCurves * 2)));
			var step = signedLength / numCurves;
			this.lineTo(x + radius * Math.cos(startAngle), y + radius * Math.sin(startAngle));
			for (var i = 0, a = startAngle + step, a2 = startAngle + step/2; i < numCurves; ++i, a += step, a2 += step)
				this.quadraticCurveTo(x + cpRadius * Math.cos(a2), y + cpRadius * Math.sin(a2), x + radius * Math.cos(a), y + radius * Math.sin(a));
		}
	}

	var _textHeights={};
	Canvas.textHeight=function(family, size, weight, style, variant)
	{
		if(typeof size=="number")
			size+="px";
		weight=weight||"normal";
		style=style||"normal";
		variant=variant||"normal";
		var key=escape(family+size+weight+style+variant);
		var height=_textHeights[key];
		if(height)
		{
			return height;
		}
		else
		{
			var div=document.createElement("div");
			div.innerHTML="MWOQbdfghijklpqty";
			div.style.position="absolute";
			div.style.top="-100px";
			div.style.left="-100px";
			div.style.fontFamily=family;
			div.style.fontWeight=weight;
			div.style.fontSize=size+(typeof size=="number"?"px":"");
			document.body.appendChild(div);
			height=div.offsetHeight;
			document.body.removeChild(div);
			_textHeights[key]=height;
			return height;
		}
	}

	var _ctx;
	var _textWidths={};
	Canvas.textWidth=function(str, family, size, weight, style, variant)
	{
		if(typeof size=="number")
			size+="px";
		weight=weight||"normal";
		style=style||"normal";
		variant=variant||"normal";
		var key=escape(str+family+size+weight+style+variant);
		var width=_textWidths[key];
		if(width)
		{
			return width;
		}
		else
		{
			if(!_ctx)
				_ctx=document.createElement("canvas").getContext("2d");
			_ctx.font=style+" "+variant+" "+weight+" "+size+" "+family;
			width=_ctx.measureText(str).width;
			_textWidths[key]=width;
			return width;
		}
	}

	Canvas.measureText=function(str, family, size, weight, style, variant)
	{
		return {width:Canvas.textWidth(str, family, size, weight, style, variant), height:Canvas.textHeight(family, size, weight, style, variant)};
	}
})();