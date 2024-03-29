import * as BAGEL from "./index.js";

/**
 * Handle gamepad input.
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
    		// console.log("gamepad connected");
		}
		window.addEventListener( "gamepadconnected", connected );
		
		let disconnected = function(gamepadEventData)
		{
			self.active = false;
    		// console.log("gamepad disconnected");
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

		this.deadZone = 0.10;
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
	buttonPressed(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
        return this.buttonPressedSet.has(buttonIndex);
	}

	/**
	 * Check if a button is currently down; true for the duration between button pressed and button released.
	 * @param {string} buttonName - the name of the button to check
	 * @return {boolean} true if the button is currently down
	 */
	buttonPressing(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
		return this.buttonPressingSet.has(buttonIndex);
	}

	/**
	 * Check if a button was just pressed; only true for a single frame after button is released.
	 * @param {string} buttonName - the name of the button to check
	 * @return {boolean} true if the button was just released
	 */
	buttonReleased(buttonName)
	{
		let buttonIndex = this.buttonMapping[buttonName];
		return this.buttonReleasedSet.has(buttonIndex);
	}

	/**
	 * Get value representing position of axis, from lowest value (-1) to highest value (+1).
	 * @param {string} axisName - the name of the axis to check
	 * @return {number} value of axis
	 */
    getAxisValue(axisName)
    {
  	  let axisIndex = this.axisMapping[axisName];
  	  let axisValue = this.gamepadAxes[axisIndex];

  	  // values less than this.deadZone are mapped to 0
  	  if ( Math.abs(axisValue) < this.deadZone )
  	  	return 0;

  	  return axisValue;
    }

	/**
	 * Get a Vector containing both axis values of a joystick.
	 * <br/>
	 * (May be useful to simplify calculating length and angle of joystick position.)
	 * @param {number} joystickNumber - left joystick = 1, right joystick = 2
	 * @return {Vector} vector containing both axis values of specified joystick
	 */
    getJoystickVector(joystickNumber)
    {
  	  if (joystickNumber == 1)
  	  	return new BAGEL.Vector(
  	  		this.getAxisValue("Axis1X"), 
  	  		this.getAxisValue("Axis1Y") );
  	  else if (joystickNumber == 2)
  	  	return new BAGEL.Vector(
  	  		this.getAxisValue("Axis2X"), 
  	  		this.getAxisValue("Axis2Y") );
  	  else
  	  	return new BAGEL.Vector(0, 0);
    }

}

export { Gamepad };