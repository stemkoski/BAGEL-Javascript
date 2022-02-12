import * as BAGEL from "./index.js";

/**
 *  A Vector is a pair of values (x,y), useful for 
 *   representing position (see {@link Rectangle} and {@link Sprite}). 
 */
class Vector
{
	/**
	 * Set initial values for (x, y); defaults to (0, 0).
	 * @constructor
	 * @param {number} x the x coordinate
	 * @param {number} y the y coordinate
	 */
	constructor(x=0, y=0)
	{
		this.x = x;
		this.y = y;
	}

    /**
     * Set the x and y coordinates.
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     */
	setValues(x, y)
	{
		this.x = x;
		this.y = y;
	}

    /**
     * Add values to the x and y coordinates.
     * @param {number} dx value to add to the x coordinate
     * @param {number} dy value to add to the y coordinate
     */
	addValues(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}
}

export { Vector };