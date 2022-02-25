import * as BAGEL from "./index.js";

/**
 * An Animation is similar to a {@link Texture} but designed for drawing images from a spritesheet
 *   (a grid of images), with methods to automatically update
 */
class Animation
{

	/**
	 * Load image file and create list of regions depending on number of rows and columns in spritesheet.
	 * @param {string} filename the name (including path) of the image file  
	 * @param
	 * @constructor
	 */
	constructor(fileName, rows=1, cols=1, frameDuration=0.25, loop=false)
	{
		this.texture  = new BAGEL.Texture();
		this.regionList = [];
		this.elapsedTime = 0;
		this.paused = false;

		this.frameDuration = 0.25;
		this.totalDuration = null;
		this.loop = false;

		let self = this;

		// this code automatically runs after image data loaded
		this.texture.image.onload = function()
		{

			// create list of rectangles
			let frameWidth  = self.texture.image.width  / cols;
			let frameHeight = self.texture.image.height / rows;			
			for (let y = 0; y < rows; y++)
	        {
	            for (let x = 0; x < cols; x++)
	            {
					let region = new BAGEL.Rectangle(x*frameWidth, y*frameHeight, frameWidth, frameHeight)
	                self.regionList.push( region );
	            }
	        }
	        self.texture.region = self.regionList[0];

	        self.frameDuration = frameDuration;
			self.totalDuration  = frameDuration * self.regionList.length;
	        self.loop = loop;
		}

		this.texture.image.src = fileName;
	}
	

	/**
	 * Updates elapsedTime and region used by texture
	 * 
	 */
    update(deltaTime)
    {
        if (this.paused)
			return;
			
        this.elapsedTime += deltaTime;
    
    	// check if loop is reset
		if (this.loop && this.elapsedTime > this.totalDuration)
            this.elapsedTime -= this.totalDuration;
		
        let regionIndex = Math.floor( this.elapsedTime / this.frameDuration );
        if ( regionIndex >= this.regionList.length )
            regionIndex = this.regionList.length - 1;
		this.texture.region = this.regionList[regionIndex];
    }

	/**
	 * 
	 */
    isFinished()
    {
        return (this.elapsedTime >= this.textureList.length * this.frameDuration) && !this.loop;
    }

	/**
	 * 
	 */
    clone()
    {
        let anim            = new Animation();
		anim.textureList    = this.textureList;
        anim.frameDuration  = this.frameDuration;
        anim.loop           = this.loop;
		anim.totalDuration  = this.totalDuration;
        anim.currentTexture = this.textureList[0];
        return anim;
    }

}


export { Animation };