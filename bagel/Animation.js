import * as BAGEL from "./index.js";

/**
 * An Animation is similar to a {@link Texture} but designed for drawing images from a spritesheet
 *   (a grid of images), with methods to automatically update
 */
class Animation
{

	/**
	 * Initialize empty Image and Rectangle objects;
	 *  data set with the {@link Texture#load|load} method.
	 * @constructor
	 */
	constructor()
	{
		this.texture  = new BAGEL.Texture();
		this.regionList = [];

		this.frameDuration = 0.25;
		this.totalDuration = null;
		this.loop = false;

		this.elapsedTime = 0;
		this.paused = false;
	}
	
	/**
	 * Load image file and create list of regions depending on number of rows and columns in spritesheet.
	 * @param {string} filename the name (including path) of the image file  
	 */
	async load(fileName, rows=1, cols=1, frameDuration=0.25, loop=false)
	{
		await this.texture.load(fileName);

		// create list of rectangles
		let frameWidth  = this.texture.image.width  / cols;
		let frameHeight = this.texture.image.height / rows;			
		for (let y = 0; y < rows; y++)
        {
            for (let x = 0; x < cols; x++)
            {
				let region = new BAGEL.Rectangle(x*frameWidth, y*frameHeight, frameWidth, frameHeight)
                this.regionList.push( region );
            }
        }
        this.texture.region = this.regionList[0];

        this.frameDuration = frameDuration;
        this.loop = loop;
		this.totalDuration  = frameDuration * this.regionList.length;
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