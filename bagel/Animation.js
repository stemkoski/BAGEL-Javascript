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
	 * @param {number} rows - the number of rows in the spritesheet
	 * @param {number} cols - the number of columns in the spritesheet
	 * @param {number} frameDuration - time (seconds) to display each frame (region in spritesheet)
	 * @param {boolean} loop - whether to restart animation once all frames have been displayed
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

		// only try to load a file if a fileName is given
		// (this will not be the case when cloning an Animation)
		if ( fileName )
		{
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
	}
	

	/**
	 * Updates elapsedTime and updates the rectangular region used by texture
	 *  depending on how much time has elapsed.
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
	 *  Determines if this animation is finished displaying all frames (and is not set to loop).
	 *  @return {boolean} if this animation has finished
	 */
    isFinished()
    {
        return (this.elapsedTime >= this.regionList.length * this.frameDuration) && !this.loop;
    }

	/**
	 *  Make a copy of this object.
	 *  <br>An animation object can not be shared between multiple sprites because each
	 *   may have started at different times, thus have different elapsedTime values.
	 *  @return {Animation} a copy of this Animation object
	 */
    clone()
    {
        let anim            = new BAGEL.Animation();
        anim.texture.image  = this.texture.image;
        anim.texture.region = this.regionList[0];
		anim.regionList     = this.regionList;
        anim.frameDuration  = this.frameDuration;
		anim.totalDuration  = this.totalDuration;
        anim.loop           = this.loop;
        return anim;
    }

}


export { Animation };