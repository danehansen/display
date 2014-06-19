#Glitch#

__Package__ : com.danehansen.display  
__Class__ : public class Glitch  
__Inheritance__ : Glitch > Object  
__Subclasses__ : AutoGlitch

Instances of this class will take the image or element (with background image), and in real time glitch out the bytes of the image. No matter if the image is .jpg, .png, or .gif, it will by glitched like a .jpg becuase that is what looks the coolest. This effect will not work locally unless you set up a local server. Otherwise the canvas thinks it’s all tainted and craps out. Also, if you pull in an image from a different server, it will tain the canvas unless you make it think it’s coming from it’s own server, via a fpassthru or readfile (included) or some other serverside trickery.

##Public Properties##

* __element__ : Element  
[Read-only] DOM Element manipulated.

##Public Methods##

* __Glitch__(element:Element)  
Creates a Glitch object, using a provided image element or other element with a background-image applied.
* __fucked__(value:int):*  
Gets or sets the Glitch’s level of fucked. A low number like 1-3 usually results in a subtle glitching where you can still recognize the image. A higher number such as 50 can more likely distort the image until it is unrecognizable. A value of 0 returns the image to its whole self. Remember that this corruption is actually happening at random, so the results are completely unpredictable. There is a chance that a high fucked amount could still leave an image totally recognizable. Also a chance that a fucked amount of 1 could leave an image completely absent.

#AutoGlitch#

__Package__ : com.danehansen.display  
__Class__ : public class AutoGlitch  
__Inheritance__ : AutoGlitch > Glitch > Object 

Instances of this class will automatically glitch out a random amount for random amounts of times 

##Public Properties##

* __cleanTime__ : Number  
Maximum duration in milliseconds that the image will remain clean while activated.
* __glitchTime__ : Number  
Maximum duration in milliseconds that the image will remain glitched while activated.
* __fuckLimit__ : uint  
Maximum amount of fucked that the image will get while activated.

##Public Methods##

* __AutoGlitch__(element:Element, cleanTime:Number = 1500, glitchTime:Number = 100, fuckLimit:uint = 5)  
Creates an AutoGlitch object, using a provided image element or other element with a background-image applied.
* __activate__()  
Activates the instance, starts the glitching timeouts.
* __deactivate__()  
Deactivates the instance by killing the timeouts and returning the image to its clean state.

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

* __ease__ : Function  
Easing method used to move playhead. Set to Linear.easeNone by default.
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

A class designed to quickly make an animated sprite play forward on mouse over, and reverse on mouse out. Great for rollover states on buttons. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as Sprite.js and EventDispatcher.js. Instantiating it is almost exactly like its parent class, Sprite, minus the loop argument in the constructor as a ForwardRewind instance is designed to play only forward and back between 0 and 1.

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

A class designed to quickly make an animated sprite play forward to a given frame on mouse over, and then continue to the end and back to the first frame on mouse out. Great for rollover states on buttons. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as Sprite.js and EventDispatcher.js. Instantiating it is almost exactly like its parent class, Sprite, minus the loop argument in the constructor as a ForwardForward instance is designed to utilize a looping sprite sheet.

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

A sprite class designed for when you need to divide your sprite into several separate images. One reason for doing this would be if your sprite exceeds a total of 5 million pixels. Browsers (especially mobile) tend to have unpredictable behavior when a background image exceeds 5 million pixels. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as Sprite.js and EventDispatcher.js.

##Public Properties##

* __sprites__ : Array  
[Read-only] An array of the subsprites.

##Public Methods##

* __SuperSprite__(sprites:Array, loop:Boolean = false, frameRate:uint = 60)  
Creates a SuperSprite object, using an array of subsprites, whether it will loop or not, and the frame rate.
* __resize__()  
[override] Calls the resize method on all subsprites.

#Preloader#

__Package__ : com.danehansen.display  
__Class__ : public class Preloader  
__Inheritance__ : Preloader > EventDispatcher > Object  

A preloader class designed to easily create a customizable animated canvas preloader. This class depends on TweenLite.js which is available at <http://greensock.com/> as well as EventDispatcher.js. It is assumed that it is desired that the canvas element will want to not be shown when the load is full, so either the canvas or the content to be shown after or both will have to have proper positioning added to it so that when the canvas has `display:none` applied to it that it won’t ruin your layout.

##Public Properties##

* __element__ : Element  
[Read-only] Canvas Element that the preloader is to be drawn in.
* __duration__ : Number  
Duration for the Preloader to make 1 revolution.

##Public Methods##

* __Preloader__(element:Element, color:uint = "#000", hole:Number = 0, duration:Number = 1)  
Creates a Preloader object, using a provided canvas element, color to draw it in, and how big the hole in the center is in relation to the size of the Preloader. The size of the Preloader is the smallest between the width and height of the canvas. The duration is the amount of time, in seconds, for the Preloader to make 1 revolution.
* __play__()  
Causes the Preloader to begin looping, at the current duration. This method would be used when the user is waiting for something that would take an undetermined amount of time, such as waiting for a callback. They may see the Preloader animate through just a single time, or many times.
* __progress__(value:Number):*  
Gets or sets the instances’s progress. A value of 0 would have the Preloader look empty, 1 would have it look full, and 2 would have it look empty again.
* __revolve__()  
Causes the Preloader to make one revolution. This method would be used once the instance’s progress has reached 1, and it is desired for it to make 1 last revolution for it to disappear.
* __stop__()  
Causes the Preloader to stop looping at the next occurance that it will not be visible. This method would typically be used after calling the “play” method.

##Public Constants##

* __COMPLETE__ : String = "complete"  
[static] The Preloader.COMPLETE constant defines the value of the type property of a complete event object.

##Events##

* __complete__  
Dispatched when the progress has reached a whole number when the instance is not currently playing.

#Canvas#

__Package__ : com.danehansen.display  
__Class__ : public class Canvas  
__Inheritance__ : Canvas > Object  

A helper class for working with the HTML5 canvas with not that very many shortcuts.

##Public Properties##

* __element__ : Element  
[Read-only] DOM Element manipulated.

##Public Methods##

* __Canvas__(element:Element)  
Creates a Canvas object, using the provided canvas element. It bases the sizing off the size of the element from its css properties.
* __Canvas__(width:uint, height:uint)  
Creates a Canvas object, using the provided height and width.
* __correctArcs__()  
[static] Overrides the browser’s default arc method with one that looks more correct. Only needed if drawing several arcs/circles that need to align closely. The bug seems to only exist in Chrome currently, and hopefully in time this polyfill will no longer be needed.