import * as BAGEL from "./index.js";

/**
 *  A Rectangle has a size (width and height) and a position (x, y).
 *  <br/>
 *  The position is stored as a {@link Vector} so it can easily be synchronized with the position of a {@link Sprite}.
 */
class Rectangle
{
	/**
	 * Set initial center position (x, y) and size (width and height).
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
	 * Set new center position (x, y) and size (width and height).
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
	 * Set new center position (x, y).
	 * @param {number} x - x coordinate of the top-left corner
	 * @param {number} y - y coordinate of the top-left corner
	 */
	setPosition(x, y)
	{
		this.position.setValues(x,y);
	}

	/**
	 * Set new size (width and height).
	 * @param {number} width - width: the length in the x-direction
	 * @param {number} height - height: the length in the y-direction
	 */
	setSize(width, height)
	{
		this.width = width;
		this.height = height;
	}
	
	/**
	 * Determine if this rectangle overlaps another rectangle (includes overlapping edges).
	 * @param {Rectangle} other - rectangle to check for overlap with
	 * @return {boolean} true if this rectangle overlaps other rectangle, false otherwise
	 */
	overlaps(other)
	{
		let noOverlap = (other.position.x + other.width/2 <= this.position.x - this.width/2) 
		              || (this.position.x + this.width/2 <= other.position.x - other.width/2) 
					  || (other.position.y + other.height/2 <= this.position.y - this.height/2) 
					  || (this.position.y + this.height/2 <= other.position.y - other.height/2);
		return !noOverlap;
	}
}

export { Rectangle };