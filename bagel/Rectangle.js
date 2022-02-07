import * as BAGEL from "./index.js";

/**
 *  A Rectangle has a size (width and height) and a position (x,y).
 */
class Rectangle
{
	/**
	 * Set initial position (x,y) and size (width and height).
	 * @constructor
	 * @param {number} x - x coordinate of the top-left corner
	 * @param {number} y - y coordinate of the top-left corner
	 * @param {number} width - width: the length in the x-direction
	 * @param {number} height - height: the length in the y-direction
	 */
	constructor(x=0, y=0, width=0, height=0)
	{
		this.position = new BAGEL.Vector(x,y);
		this.width = width;
		this.height = height;
	}
	
	/**
	 * Set new position (x,y) and size (width and height).
	 * @param {number} x - x coordinate of the top-left corner
	 * @param {number} y - y coordinate of the top-left corner
	 * @param {number} width - width: the length in the x-direction
	 * @param {number} height - height: the length in the y-direction
	 */
	setValues(x, y, width, height)
	{
		this.position.setValues(x,y);
		this.width = width;
		this.height = height;
	}

	/**
	 * Set new position (x,y).
	 * @param {number} x - x coordinate of the top-left corner
	 * @param {number} y - y coordinate of the top-left corner
	 */
	setPosition(x, y)
	{
		this.position.setValues(x,y);
	}

	/**
	 * Set new size (width and height) .
	 * @param {number} width - width: the length in the x-direction
	 * @param {number} height - height: the length in the y-direction
	 */
	setSize(width, height)
	{
		this.width = width;
		this.height = height;
	}
	
	overlaps(other)
	{
		let noOverlap = (other.x + other.width <= this.x) 
		              || (this.x + this.width <= other.x) 
					  || (other.y + other.height <= this.y) 
					  || (this.y + this.height <= other.y);
		return !noOverlap;
	}
}

export { Rectangle };