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
* __nextFrame _()_
Increments the sprite by one frame.
* __play__ _(loop:Boolean = false)_
Causes the sprite to play at the current frame rate until the end frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
* __prevFrame__ _()_
Decrements the sprite by one frame.
* __progress__ _(value:Number):*_
Gets or sets the sprite’s progress. In a typical forward/rewind sprite, this number is limited between 0 and 1. In a looping sprite, this number can wrap and even be negative.
* __progressTo__ _(value:Number)_
Similar to setting the progress, except that the sprite will play to that progress point at the current frame rate.
removeEventListener(type:String, listener:Function)
Removes a listener from the EventDispatcher object.
resize()
Causes the sprite to recalculate it’s size. Only needed if the element has dynamic css sizing or if the element has been manually sized using JavaScript.
rewind(loop:Boolean = false)
Causes the sprite to play backwards at the current frame rate until the first frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
stop()
Causes the sprite to stop any playback.