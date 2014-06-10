#SPRITE#

A sprite class designed to easily create/manipulate animated sprite sheets. This class depends on TweenLite.js, CSSPlugin.js and EasePack.js, all of which are available at GreenSock. It is assumed that the sprite sheet will be layed out left to right, top to bottom.

In addition to these .js files, a certain amount of css styling will have to the elements to be animated. It is assumed that they will be provied with a background image, and that the element will have a size applied as well. If the element will be resized or if a retina version of the image will be supplied, then the a background size property will also have to be applied to the element. For example, if your sprite sheet has 4 columns and 8 rows, your background-size property will be “400% 800%”.

##Public Properties##

* __element__ : _Element_
[Read-only] DOM Element manipulated.
* __frameRate__ : _unit_
The rate per second at which the sprite will play through.
* __loop__ : _Boolean_
Whether or not the sprite instance is intended to play as a loop. If the beginning and end sprite frames are the same, then you want this set to true. Otherwise the sprite is confined to a finite timeline of 0 to 1.

##Public Methods##

* __Sprite__ _(element:Element, columns:uint, totalFrames:uint, loop:Boolean = false, frameRate:uint = 60)_
Constructor.
* __addEventListener__ _(type:String, listener:Function)_
Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
* __dispatchEvent__ _(type:String)
Dispatches an event into the event flow.
* __frame__ _(value:int):*_
Gets or sets the sprite’s frame. In a typical forward/rewind sprite, this number is limited between 0 and the total number of frames. In a looping sprite, this number can wrap and even be negative.
* __frameTo__ _(value:Number)_
Similar to setting the frame, except that the sprite will play to that frame at the current frame rate.
* __nextFrame__ _()_
Increments the sprite by one frame.
* __play__ _(loop:Boolean = false)_
Causes the sprite to play at the current frame rate until the end frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
* __prevFrame__ _()_
Decrements the sprite by one frame.
* __progress__ _(value:Number):*_
Gets or sets the sprite’s progress. In a typical forward/rewind sprite, this number is limited between 0 and 1. In a looping sprite, this number can wrap and even be negative.
* __progressTo__ _(value:Number)_
Similar to setting the progress, except that the sprite will play to that progress point at the current frame rate.
* __removeEventListener__ _(type:String, listener:Function)_
Removes a listener from the EventDispatcher object.
* __resize__ _()_
Causes the sprite to recalculate it’s size. Only needed if the element has dynamic css sizing or if the element has been manually sized using JavaScript.
* __rewind__ _(loop:Boolean = false)_
Causes the sprite to play backwards at the current frame rate until the first frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
* __stop__ _()_
Causes the sprite to stop any playback.

##Public Constants##

* __COMPLETE__ : _String_
[static] The Sprite.COMPLETE constant defines the value of the type property of a complete event object.
* __ENTER&#95;FRAME__ : _String_
[static] The Sprite.ENTER_FRAME constant defines the value of the type property of a enterFrame event object.
* __REVERSE&#95;COMPLETE__ : _String_
[static] The Sprite.REVERSE_COMPLETE constant defines the value of the type property of a reverseComplete event object.

##Events##

* __complete__
[broadcast event] Dispatched when the playhead has reached 1 when playing forward, or a multiple of 1 in the case of a looping sprite.
* __enterFrame__
[broadcast event] Dispatched when the playhead is entering a new frame.
* __reverseComplete__
[broadcast event] Dispatched when the playhead has reached 0 when playing backward, or a multiple of 1 in the case of a looping sprite.