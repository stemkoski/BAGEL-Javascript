import * as BAGEL from "./index.js";

/**
 *  An Input object manages the keyboard input for a {@link Game}.
 *  <br/>
 *  Check for discrete key events with {@link Input#keyPressed|keyPressed} and {@link Input#keyReleased|keyReleased}.
 *  <br/>
 *  Check for continuous key events with {@link Input#keyPressing|keyPressing}.
 *  <br/>
 *  Methods check for key names such as "A", "3", "ArrowUp", "Shift", " " (space).
 *  <br/>
 *  Names include effects of modifier keys, for example, "Shift" & "2" yields "@".
 */
class Input
{
	
	/**
	 * Initialize Set objects to store names of keys pressed and released;
	 *  set up event listeners to handle keyboard input.
	 * @constructor
	 */
	constructor()
	{
		// Event listeners add keys to Queues;
		//  required because of asynchronous event handling.
		this.keyDownQueue  = new Set();
		this.keyUpQueue    = new Set();
		
		this.keyPressedSet  = new Set();
		this.keyPressingSet = new Set();
		this.keyReleasedSet = new Set();
		
		let self = this;
		
		this.keydownfunc = function(eventData) 
		{ 
			let k = eventData.key.toUpperCase();
			self.keyDownQueue.add( k ); 
		};

		this.keyupfunc = function(eventData) 
		{ 
			let k = eventData.key.toUpperCase();
			self.keyUpQueue.add( k ); 
		};

		document.addEventListener( "keydown", this.keydownfunc );		
		document.addEventListener( "keyup",   this.keyupfunc );

	};
	
	/**
	 *  Update key state data. 
	 *  <br/>
	 *  This method should be called once per frame by the {@link Game} class. 
	 */
	update()
	{
		// clear previous discrete event status
		this.keyPressedSet.clear();
		this.keyReleasedSet.clear();
		
		// update current event status
		for (let k of this.keyDownQueue)
		{
			this.keyPressedSet.add(k);
			this.keyPressingSet.add(k);
		}
		
		for (let k of this.keyUpQueue)
		{
			this.keyPressingSet.delete(k);
			this.keyReleasedSet.add(k);
		}	
		
		// clear the queues used to store events
		this.keyDownQueue.clear();
		this.keyUpQueue.clear();
	};
	
	/**
	 * Check if a key was just pressed; only true for a single frame after key is pressed.
	 * @param {string} keyName - the name of the key to check
	 * @return {boolean} true if the key was just pressed
	 */
	keyPressed( keyName )
	{
		let k = keyName.toUpperCase();
		return ( this.keyPressedSet.has(k) );
	};
	
	/**
	 * Check if a key is currently down; true for the duration between key pressed and key released.
	 * @param {string} keyName - the name of the key to check
	 * @return {boolean} true if the key is currently down
	 */
	keyPressing( keyName )
	{
		let k = keyName.toUpperCase();
		return ( this.keyPressingSet.has(k) );
	};
	
	/**
	 * Check if a key was just pressed; only true for a single frame after key is released.
	 * @param {string} keyName - the name of the key to check
	 * @return {boolean} true if the key was just released
	 */
	keyReleased( keyName )
	{
		let k = keyName.toUpperCase();
		return ( this.keyReleasedSet.has(k) );
	};
	
	/**
	 * Stop this class from processing input by removing input listeners. 
	 */
	shutdown()
	{
		document.removeEventListener( "keydown", this.keydownfunc );		
		document.removeEventListener( "keyup",   this.keyupfunc );
	};
	
}


export { Input };
