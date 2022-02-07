import * as BAGEL from "./index.js";

/**
 * A Texture stores an Image and a {@link Rectangle}
 *  that indicates which region of the Image will be drawn.
 */

class Texture
{
	constructor()
	{
		this.image = new Image();
		this.region = new BAGEL.Rectangle();
	}
	
	async load(filename)
	{

		this.image.src = filename;
  		await this.image.decode();
  		console.log(this.image.width);
		this.region.setSize(this.image.width, this.image.height);
	}
}

export { Texture };
