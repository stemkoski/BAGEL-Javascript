import * as BAGEL from "./index.js";

/**
 * A Texture stores an Image and a {@link Rectangle}
 *  that indicates which region of the Image will be drawn.
 */
class Texture
{
	/**
	 * Initialize empty Image and Rectangle objects;
	 *  data set with the {@link Texture#load|load} method.
	 * @constructor
	 */
	constructor()
	{
		this.image  = new Image();
		this.region = new BAGEL.Rectangle();
	}
	
	/**
	 * Load image file and set size of rectangle to image dimensions.
	 * @param {string} filename the name (including path) of the image file  
	 */
	async load(filename)
	{
		this.image.src = filename;
  		await this.image.decode();
		this.region.setSize(this.image.width, this.image.height);
	}
}

export { Texture };
