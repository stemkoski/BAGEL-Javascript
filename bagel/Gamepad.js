import * as BAGEL from "./index.js";

/**
 * Initialize Set objects to store names of keys pressed and released;
 *  set up event listeners to handle keyboard input.
 *  <br/>
 * Assumes Standard Gamepad Layout, as described at
 * {@link https://w3c.github.io/gamepad/#dfn-standard-gamepad}
 * @constructor
 */
class Gamepad
{
	/**
	 * Initialize required variables and set up listeners.
	 */
	constructor()
	{
		this.active = false;
		this.index = null;

		let self = this;

		let connected = function(gamepadEventData)
		{
    		self.index = gamepadEventData.gamepad.index;
    		self.active = true;
		}
		window.addEventListener( "gamepadconnected", connected );
		
		let disconnected = function(gamepadEventData)
		{
			self.active = false;
		}

		window.addEventListener( "gamepaddisconnected", disconnected );

		// store raw data from browser gamepad object
		this.gamepadButtons = [];
		this.gamepadAxes    = [];

		// Standard Gamepad Mappings

		this.buttonMapping = 
		{
		  "A"      :  0, 
		  "B"      :  1, 
		  "X"      :  2, 
		  "Y"      :  3, 
		  "LB"     :  4, // Left Shoulder Button 
		  "RB"     :  5, // Right Shoulder Button
		  "LT"     :  6, // Left Trigger
		  "RT"     :  7, // Right Trigger
		  "Select" :  8, // also "Back" on some controllers
		  "Start"  :  9, 
		  "Up"     : 12, // Directional Pad
		  "Down"   : 13, // Directional Pad
		  "Left"   : 14, // Directional Pad
		  "Right"  : 15  // Directional Pad
		};

		this.axisMapping =
		{
			"Axis1X" : 0, 
			"Axis1Y" : 1,
		    "Axis2X" : 2, 
		    "Axis2Y" : 3
		};

		this.buttonFullNames = [
			"A button", "B button", "X button", "Y button",
			"Left Shoulder button", "Right Shoulder button",
			"Left Trigger", "Right Trigger",
			"Back/Select button", "Start button",
			"Directional Pad - Up", "Directional Pad - Down", 
			"Directional Pad - Left", "Directional Pad - Right"
		];

		this.axisShortNames = [
		  
		];

		this.buttonPressedSet  = new Set();
		this.buttonPressingSet = new Set();
		this.buttonReleasedSet = new Set();

		// this.deadZone = 0.10;
	}

	/**
	 *  Update button state data. 
	 *  <br/>
	 *  This method should be called once per frame by the {@link Game} class. 
	 */
	update()
	{
		if ( !this.active )
		    return;

		// Firefox links axes/button array references, 
		//  but Chrome does not, 
		//  so the gamepad object must be re-polled
		this.gamepadAxes = navigator.getGamepads()[this.index].axes;
		this.gamepadButtons = navigator.getGamepads()[this.index].buttons;

		// clear previous discrete event status
		this.buttonPressedSet.clear();
		this.buttonReleasedSet.clear();

		for (let i = 0; i < this.gamepadButtons.length; i++)
		{
			// which buttons were just pressed on gamepad since last update?
			if ( this.gamepadButtons[i].pressed && !this.buttonPressingSet.has(i) )
			{
				this.buttonPressedSet.add(i);
				this.buttonPressingSet.add(i);
			}

			// which buttons are no longer being pressed on gamepad since last update?
			if ( !this.gamepadButtons[i].pressed && this.buttonPressingSet.has(i) )
			{
				this.buttonPressingSet.delete(i);
				this.buttonReleasedSet.add(i);
			}
		}
	}

	/**
	 * Check if a button was just pressed; only true for a single frame after button is pressed.
	 * @param {string} buttonName - the name of the button to check
	 * @return {boolean} true if the button was just pressed
	 */
	isButtonPressed(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
        return this.buttonPressedSet.has(buttonIndex);
	}

	/**
	 * Check if a button is currently down; true for the duration between button pressed and button released.
	 * @param {string} buttonName - the name of the button to check
	 * @return {boolean} true if the button is currently down
	 */
	isButtonPressing(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
		return this.buttonPressedSet.has(buttonIndex);
	}

	/**
	 * Check if a button was just pressed; only true for a single frame after button is released.
	 * @param {string} buttonName - the name of the button to check
	 * @return {boolean} true if the button was just released
	 */
	isButtonReleased(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
		return this.buttonPressedSet.has(buttonIndex);
	}

	/**
	 * Get value representing position of axis, from lowest value (-1) to highest value (+1).
	 * @param {string} axisName - the name of the axis to check
	 * @return {number} value of axis
	 */
    getAxisValue(axisName)
    {
  	  let axisIndex = this.axisMapping[axisName];
  	
  	  if ( !axisIndex )
  	    return 0;

  	  let axisValue = this.gamepadAxes[axisIndex];
  	  // TODO: deadZone smoothing
  	  return axisValue;
    }	
}

export { Gamepad };