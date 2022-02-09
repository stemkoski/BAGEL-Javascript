import * as BAGEL from "./index.js";

/**
 * A Sprite represents the entities in a game.
 * <br/>
 * Sprites have a {@link Vector} position, a {@link Rectangle} boundary, and a {@link Texture}.
 */
class Sprite extends BAGEL.Entity
{
	/**
	 * Initialize all fields to default values.
	 * @constructor
	 */
	constructor()
	{
		super();
		this.position  = new BAGEL.Vector();
		this.rectangle = new BAGEL.Rectangle();

		// keep position of boundary rectangle
		//  synchronized with sprite position
		this.rectangle.position = this.position;

		this.texture = null;
		this.visible = true;
	}
	
	/**
     * Set the x and y coordinates of the center of the sprite.
     * @param {number} x the x coordinate of the center
     * @param {number} y the y coordinate of the center
     */
    setPosition(x, y)
	{
		this.position.setValues(x, y);
	}

	/**
     * Change the sprite's position by given amounts.
     * @param {number} dx value to add to the position x coordinate
     * @param {number} dy value to add to the position y coordinate
     */
	moveBy(dx, dy)
	{
		this.position.addValues(dx, dy);
	}	
	
	/**
     * Set the texture used when drawing this sprite.
     *  Also updates the size of the sprite to the size of the texture.
     * @param {Texture} texture
     */
	setTexture(texture)
	{
		this.texture = texture;
		this.rectangle.width  = texture.image.width;
		this.rectangle.height = texture.image.height;
	}
	
	/**
     * Set the size (rectangle width and height) of the sprite;
     *  used when drawing sprite and checking for overlap with other sprites.
     * @param {number} width the width of the sprite
     * @param {number} height the height of the sprite
     */
	setSize(width, height)
	{
		this.rectangle.width  = width;
		this.rectangle.height = height;
	}
	
	/**
     * Set whether this sprite should be visible or not;
     *  determines whether sprite will be drawn on canvas.
     * @param {boolean} visible - determines if sprite is visible or not
     */
    setVisible(visible)
	{
		this.visible = visible;
	}

	/**
     * Determine if this sprite overlaps another sprite (includes overlapping edges).
	 * @param {Sprite} other - sprite to check for overlap with
	 * @return {boolean} true if this sprite overlaps other sprite, false otherwise
     */
    overlaps(other)
    {
    	return this.rectangle.overlaps( other.rectangle );
    }

	/**
	 * Draw the sprite on a canvas, centered at the sprite's position, in an area corresponding to the sprite's size.
	 * If visible is set to false, sprite will not be drawn.
	 * @param context - the graphics context object associated to the canvas where the sprite image will be drawn
	 */
	draw(context)
	{
		if ( !this.visible )
			return;
		
		context.setTransform(1,0, 0,1, this.position.x, this.position.y);

		// image, 4 source parameters, 4 destination parameters
        context.drawImage(this.texture.image, 
            this.texture.region.position.x, this.texture.region.position.y, 
            this.texture.region.width, this.texture.region.height,
            -this.rectangle.width/2, -this.rectangle.height/2, 
             this.rectangle.width, this.rectangle.height);
	}
	
}


export { Sprite };