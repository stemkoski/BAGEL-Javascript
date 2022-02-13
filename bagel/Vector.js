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
	 * @param {number} x - the x coordinate
	 * @param {number} y - the y coordinate
	 */
	constructor(x=0, y=0)
	{
		this.x = x;
		this.y = y;
	}

    /**
     * Set new values for the x and y coordinates.
     * @param {number} x - new x coordinate
     * @param {number} y - new y coordinate
     */
	setValues(x, y)
	{
		this.x = x;
		this.y = y;
	}

    /**
     * Add values to the x and y coordinates.
     * @param {number} dx - value to add to the x coordinate
     * @param {number} dy - value to add to the y coordinate
     */
	addValues(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}

    /**
     * Add x and y components of another vector to this vector.
     * @param {Vector} other - vector to be added to this vector
     */
    addVector(other)
	{
		this.x += other.x;
		this.y += other.y;
	}

	/**
     * Multiple x and y components of this vector by a constant.
     * @param {number} value - value to multiply by
     */
    multiply(value)
	{
		this.x *= value;
		this.y *= value;
	}
	
	/**
     * Get the length of this vector.
     * @return {number} the length of this vector
     */
    getLength()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	/**
     * Get the angle (in degrees) between this vector and the positive x-axis.
     * <br/>
     * (Angles increase in clockwise direction, since positive y-axis is down.)
     * @return {number} angle between this vector and positive x-axis
     */
    getAngle()
	{
		// range: -180 to 180
		if (this.getLength() == 0)
			return 0;
		else
			return Math.atan2(this.y, this.x) * 180/Math.PI;
	}

	/**
     * Set the length of this vector (without changing the current direction).
     * @param {number} length - new length of this vector
     */
    setLength(length)
	{
		let angleDegrees = this.getAngle();
		this.x = length * Math.cos(angleDegrees * Math.PI/180);
		this.y = length * Math.sin(angleDegrees * Math.PI/180);
	}	

	/**
     * Set the angle (in degrees) between this vector and the positive x-axis
     *  (without changing the current length).
     * <br/>
     * (Angles increase in clockwise direction, since positive y-axis is down.)
     * @param {number} angleDegrees - the new direction angle of this vector
     */
    setAngle(angleDegrees)
	{
		let length = this.getLength();
		this.x = length * Math.cos(angleDegrees * Math.PI/180);
		this.y = length * Math.sin(angleDegrees * Math.PI/180);
	}
}

export { Vector };