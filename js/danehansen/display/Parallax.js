"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

(function(){
	var _transform;
	var _moveable=true;

	window.Parallax=function(parent, speed)
	{
		if(typeof jQuery!="undefined" && parent instanceof jQuery)
			parent=parent[0];
		this._parent=parent.documentElement?parent.documentElement:parent;
		this.speed=typeof speed=="number"||0.2;
		this._items=[];
		var nodes=document.querySelectorAll("[data-parallax-x], [data-parallax-y]");
		this._len=nodes.length;
		for(var i=0; i<this._len; i++)
		{
			var node=nodes[i];
			this._items.push({
				node:node,
				currentX:0,
				currentY:0,
				destX:0,
				destY:0,
				moveX:parseFloat(node.getAttribute("data-parallax-x"))||0,
				moveY:parseFloat(node.getAttribute("data-parallax-y"))||0,
				style:node.style
			})
		}
		this.resume=this.resume.bind(this);
		this.pause=this.pause.bind(this);
		this.destroy=this.destroy.bind(this);
		this._onResize=this._onResize.bind(this);
		if(_moveable)
			this._onDeviceOrientation=this._onDeviceOrientation.bind(this);
		this._onMouseMove=this._onMouseMove.bind(this);
		this._loop=this._loop.bind(this);
		this.resume();
	}

	Parallax.prototype.resume=function()
	{
		this._active=true;
		this._still=false;
		this._loop();
		this._onResize();
		window.addEventListener("resize", this._onResize);
		if(_moveable)
		{
			this._origin=null;
			window.addEventListener("deviceorientation", this._onDeviceOrientation);
		}
		this._parent.addEventListener("mousemove", this._onMouseMove);
	}

	Parallax.prototype.pause=function()
	{
		if(_moveable)
			window.removeEventListener("deviceorientation", this._onDeviceOrientation);
		this._parent.removeEventListener("mousemove", this._onMouseMove);
		window.removeEventListener("resize", this._onResize);
		this._active=false;
	}

	Parallax.prototype.destroy=function()
	{
		this.pause();
		this._items=null;
		this._parent=null;
	}
	
	Parallax.prototype._onResize=function()
	{
		this._parentWidth=this._parent.offsetWidth||this._parent.innerWidth;
		this._parentHeight=this._parent.offsetHeight||this._parent.innerHeight;
		var rect=this._parent.getBoundingClientRect?this._parent.getBoundingClientRect():{top:0,left:0};
		this._parentTop=rect.top;
		this._parentLeft=rect.left;
	}

	Parallax.prototype._onMouseMove=function(evt)
	{
		var x=(evt.clientX-this._parentLeft)/this._parentWidth-0.5;
		var y=(evt.clientY-this._parentTop)/this._parentHeight-0.5;
		this._setPos(x, y);
	}

	Parallax.prototype._onDeviceOrientation=function(evt)
	{
		if(!this._origin)
			this._origin=evt;
		var point=_deviceOrientation(evt, this._origin);
		if(point)
		{
			var x=point.x/2;
			var y=point.y/2;
			var diffX=Math.min(0.5, Math.max(-0.5, x*3));
			var diffY=Math.min(0.5, Math.max(-0.5, y*3));
			this._setPos(diffX, diffY);
		}
		else
		{
			window.removeEventListener("deviceorientation", this._onDeviceOrientation);
			_moveable=false;
		}
	}

	Parallax.prototype._setPos=function(x, y)
	{
		for(var i=0; i<this._len; i++)
		{
			var item=this._items[i];
			item.destX=x*item.moveX;
			item.destY=y*item.moveY;
		}
		if(this._still)
			this._loop();
	}

	Parallax.prototype._loop=function()
	{
		this._still=true;
		for(var i=0; i<this._len; i++)
		{
			var item=this._items[i];
			if(item.currentX!=item.destX)
			{
				_ease(item, "currentX", item.destX, this.speed);
				var x=true;
			}
			if(item.currentY!=item.destY)
			{
				_ease(item, "currentY", item.destY, this.speed);
				var y=true;
			}
			if(x || y)
			{
				var str="translate3d("+item.currentX+"px,"+item.currentY+"px,0)";
				if(!_transform)
					_findTransform(item.node, item.style, str);
				else
					item.style[_transform]=str;
				this._still=false;
			}
		}
		if(this._active && !this._still)
			window.requestAnimationFrame(this._loop);
	}

	function _deviceOrientation(evt, ref)
	{
		var gamma=evt.gamma;
		if(gamma)
		{
			var orientation=window.orientation;
			gamma-=ref.gamma;
			if(gamma<-180)
				gamma+=360;
			gamma=_unadjust(gamma);
			gamma/=90;
			var beta=_adjustBeta(evt);
			var refBeta=_adjustBeta(ref);
			beta-=refBeta;
			if(beta<-180)
				beta+=360;
			beta=_unadjust(beta);
			beta/=90;
			if(Math.abs(orientation)==90)
			{
				var a=gamma;
				gamma=beta;
				beta=a;
			}
			if(orientation<0)
			{
				gamma=-gamma;
				beta=-beta;
			}
			return {x:gamma, y:beta};
		}
	}

	function _adjustBeta(evt)
	{
		var beta=evt.beta;
		var gamma=evt.gamma;
		if(gamma>90)
			beta=180-beta;
		else if(gamma<-90)
			beta=-180-beta;
		return beta;
	}

	function _unadjust(num)
	{
		if(num>90)
			num=180-num;
		else if(num<-90)
			num=-180-num;
		return num;
	}

	function _ease(targ, prop, dest, speed)
	{
		var diff=Math.abs(targ[prop]-dest);
		if(diff<0.01)
			targ[prop]=dest;
		else
			targ[prop]+=(dest-targ[prop])*speed;
	}
	
	function _findTransform(node, style, str)
	{
		var PREFIXES=["transform", "webkitTransform", "mozTransform", "msTransform", "oTransform"];
		for(var i=0, iLen=PREFIXES.length; i<iLen; i++)
		{
			_transform=PREFIXES[i];
			style[_transform]=str;
			if(window.getComputedStyle(node)[_transform])
				return;
		}
	}
})();