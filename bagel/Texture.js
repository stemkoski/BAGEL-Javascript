import * as BAGEL from "./index.js";

/**
 * A Texture stores an Image and a {@link Rectangle}
 *  that indicates which region of the Image will be drawn.
 */
class Texture
{
	/**
	 * Initialize Image and Rectangle objects;
	 * Load image file and set size of rectangle to image dimensions.
	 * @param {string} filename the name (including path) of the image file  	 
	 * @constructor
	 */
	constructor(fileName)
	{
		this.image  = new Image();
		this.region = new BAGEL.Rectangle();

		// only try to load a file if a fileName is given
		if ( fileName )
		{
			let self = this;
			// this code automatically runs after image data loaded
			this.image.onload = function()
			{
				self.region.setSize(self.image.width, self.image.height);
			}
			this.image.src = fileName;
		}
	}

}

export { Texture };
