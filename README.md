#Sprite#

__Package__ : com.danehansen.display  
__Class__ : public class Sprite  
__Inheritance__ : Sprite > EventDispatcher > Object  
__Subclasses__ : ForwardForward, ForwardRewind, SuperSprite

A sprite class designed to easily create/manipulate animated sprite sheets. This class depends on TweenLite.js which is available at <http://greensock.com/>. It is assumed that the sprite sheet will be laid out left to right, top to bottom.

In addition to TweenLite, a certain amount of css styling will have to be applied to the elements to be animated. It is assumed that they will be provided with a `background-image`, and that the element will have a size applied as well. If the element will be resized or if a retina version of the image will be supplied, then the a `background-size` property will also have to be applied to the element. For example, if your sprite sheet has 4 columns and 8 rows, your element’s css will read something like this: .

	{
		width:220px;
		height:138px;
		background-imgage:url(http://goo.gl/XDwsNz);
		background-size:400% 800%;
	}

##Public Properties##

* __element__ : Element  
[Read-only] DOM Element manipulated.
* __frameRate__ : unit  
The rate per second at which the sprite will play through.
* __loop__ : Boolean  
Whether or not the sprite instance is intended to play as a loop. If the beginning and end sprite frames are the same, then you want this set to true. Otherwise the sprite is confined to a finite timeline of 0 to 1.

##Public Methods##

* __Sprite__(element:Element, columns:uint, totalFrames:uint, loop:Boolean = false, frameRate:uint = 60)  
Creates a Sprite object, using a provided dom element, number of columns of the sprite sheet background image, the total number of frames, whether it will loop or not, and the frame rate.
* __frame__(value:int):*  
Gets or sets the sprite’s frame. In a typical forward/rewind sprite, this number is limited between 0 and the total number of frames. In a looping sprite, this number can wrap and even be negative.
* __frameTo__(value:Number)  
Similar to setting the frame, except that the sprite will play to that frame at the current frame rate.
* __nextFrame__()  
Increments the sprite by one frame.
* __play__(loop:Boolean = false)  
Causes the sprite to play at the current frame rate until the end frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
* __prevFrame__()  
Decrements the sprite by one frame.
* __progress__(value:Number):*  
Gets or sets the sprite’s progress. In a typical forward/rewind sprite, this number is limited between 0 and 1. In a looping sprite, this number can wrap and even be negative.
* __progressTo__(value:Number)  
Similar to setting the progress, except that the sprite will play to that progress point at the current frame rate.
* __resize__()  
Causes the sprite to recalculate it’s size. Only needed if the element has dynamic css sizing or if the element has been manually sized using JavaScript.
* __rewind__(loop:Boolean = false)  
Causes the sprite to play backwards at the current frame rate until the first frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
* __stop__()  
Causes the sprite to stop any playback.

##Public Constants##

* __COMPLETE__ : String = "complete"  
[static] The Sprite.COMPLETE constant defines the value of the type property of a complete event object.
* __ENTER&#95;FRAME__ : String = "enterFrame"  
[static] The Sprite.ENTER_FRAME constant defines the value of the type property of a enterFrame event object.
* __REVERSE&#95;COMPLETE__ : String = "reverseComplete"  
[static] The Sprite.REVERSE_COMPLETE constant defines the value of the type property of a reverseComplete event object.

##Events##

* __complete__  
Dispatched when the progress has reached 1 on a linear sprite, or any whole number while playing forward in the case of a looping sprite.
* __enterFrame__  
Dispatched when the playhead is entering a new frame.
* __reverseComplete__  
Dispatched when the progress has reached 0 on a linear sprite, or any whole number while playing backward in the case of a looping sprite.

#ForwardRewind#

__Package__ : com.danehansen.display  
__Class__ : public class ForwardRewind  
__Inheritance__ : ForwardRewind > Sprite > EventDispatcher > Object  

A class designed to quickly make an animated sprite play forward on mouse over, and reverse on mouse out. Great for rollover states on buttons. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as Sprite.js. Instantiating it is almost exactly like its parent class, Sprite, minus the loop argument in the constructor as a ForwardRewind instance is designed to play only forward and back between 0 and 1.

##Public Methods##

* __ForwardRewind__(element:Element, columns:uint, totalFrames:uint, frameRate:uint = 60)  
Creates a ForwardRewind object, using a provided dom element, number of columns of the sprite sheet background image, the total number of frames, and the frame rate.
* __activate__()  
Adds the event listeners for mouseOver and mouseOut.
* __deactivate__()  
Removes the event listeners for mouseOver and mouseOut. Call this method if you no longer want to use the instance or wish to dispose of it.

#ForwardForward#

__Package__ : com.danehansen.display  
__Class__ : public class ForwardForward  
__Inheritance__ : ForwardForward > Sprite > EventDispatcher > Object  

A class designed to quickly make an animated sprite play forward to a given frame on mouse over, and then continue to the end and back to the first frame on mouse out. Great for rollover states on buttons. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as Sprite.js. Instantiating it is almost exactly like its parent class, Sprite, minus the loop argument in the constructor as a ForwardForward instance is designed to utilize a looping sprite sheet.

##Public Methods##

* __ForwardForward__(element:Element, columns:uint, totalFrames:uint, overFrame:uint, frameRate:uint = 60)  
Creates a ForwardForward object, using a provided dom element, number of columns of the sprite sheet background image, the total number of frames, the over frame number, and the frame rate.
* __activate__()  
Adds the event listeners for mouseOver and mouseOut.
* __deactivate__()  
Removes the event listeners for mouseOver and mouseOut. Call this method if you no longer want to use the instance or wish to dispose of it.
* __overFrame__(value:uint):*  
Gets or sets the sprite’s mouse over frame. This would be a uint somewhere in between your sprite’s first and last frames that the instance would settle on, until moused out.

#SuperSprite#

__Package__ : com.danehansen.display  
__Class__ : public class SuperSprite  
__Inheritance__ : SuperSprite > Sprite > EventDispatcher > Object  

A sprite class designed for when you need to divide your sprite into several separate images. One reason for doing this would be if your sprite exceeds a total of 5 million pixels. Browsers (especially mobile) tend to have unpredictable behavior when a background image exceeds 5 million pixels. 

##Public Properties##

* __sprites__ : Array  
[Read-only] An array of the subsprites.

##Public Methods##

* __SuperSprite__(sprites:Array, loop:Boolean = false, frameRate:uint = 60)  
Creates a SuperSprite object, using an array of subsprites, whether it will loop or not, and the frame rate.
* __resize__()  
[override] Calls the resize method on all subsprites.