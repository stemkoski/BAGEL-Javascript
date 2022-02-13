import * as BAGEL from "./index.js";

/**
 * A Sprite represents the entities in a game.
 * <br/>
 * Sprites have a {@link Vector} position, a {@link Rectangle} boundary, and a {@link Texture}.
 */
class Sprite
{
	/**
	 * Initialize all fields to default values.
	 * @constructor
	 */
	constructor()
	{
		this.position  = new BAGEL.Vector();
		this.rectangle = new BAGEL.Rectangle();

		// keep position of boundary rectangle
		//  synchronized with sprite position
		this.rectangle.position = this.position;

		this.texture = null;
		this.visible = true;

		// the Group that contains this sprite
		this.parentGroup = null;

		// additional graphics-related data

		// initial angle = 0 indicates sprite is initially facing to the right
		this.angle  = 0;
		this.opacity = 1.0;
		this.mirrored = false;
		this.flipped = false;

		// store physics data
		this.physics = null;

		// store rectangles to define boundary/wrapping/destroy areas.
		// if a rectangle exists, corresponding function called during update.
		this.boundRectangle   = null;
		this.wrapRectangle    = null;
		this.destroyRectangle = null;
	}
	
	/**
     * Set the x and y coordinates of the center of this sprite.
     * @param {number} x - the new x coordinate of the center of this sprite
     * @param {number} y - the new y coordinate of the center of this sprite
     */
    setPosition(x, y)
	{
		this.position.setValues(x, y);
	}

	/**
     * Change this sprite's position by the given amounts.
     * @param {number} dx - value to add to the position x coordinate
     * @param {number} dy - value to add to the position y coordinate
     */
	moveBy(dx, dy)
	{
		this.position.addValues(dx, dy);
	}	
	
	/**
     * Set the texture used when drawing this sprite.
     *  Also updates the size of the sprite to the size of the texture.
     * @param {Texture} texture - the texture to use when drawing this sprite
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
     * @param {number} width - the new width of this sprite
     * @param {number} height - the new height of this sprite
     */
	setSize(width, height)
	{
		this.rectangle.width  = width;
		this.rectangle.height = height;
	}
	
	/**
     * Set whether this sprite should be visible or not;
     *  determines whether sprite will be drawn on canvas.
     * @param {boolean} visible - determines if this sprite is visible or not
     */
    setVisible(visible)
	{
		this.visible = visible;
	}

	/**
     * Get the angle (in degrees) between this sprite and the positive x-axis.
     * <br/>
     * (Angles increase in clockwise direction, since positive y-axis is down.)
     * @return {number} angle between this sprite and positive x-axis
     */
    getAngle(angleDegrees)
	{
		this.angle = angleDegrees;
	}

	/**
     * Set the angle (in degrees) between this sprite and the positive x-axis.
     * <br/>
     * (Angles increase in clockwise direction, since positive y-axis is down.)
     * @param {number} angleDegrees - the new direction angle of this sprite
     */
    setAngle(angleDegrees)
	{
		this.angle = angleDegrees;
	}

	/**
     * Rotate this sprite by the given amount.
     * @param {number} angleDegrees - the angle (in degrees) to rotate this sprite by
     */
    rotateBy(angleDegrees)
	{
		this.angle += angleDegrees;
	}

	/**
     * Move this sprite by a given distance in a given direction.
     * @param {number} distance - distance this sprite will move
     * @param {number} angle - direction along which this sprite will move
     */
    moveAtAngle(distance, angleDegrees)
	{
		this.position.x += distance * Math.cos(angleDegrees * Math.PI/180);
		this.position.y += distance * Math.sin(angleDegrees * Math.PI/180);
	}
	
	/**
     * Move this sprite by a given distance along its current direction angle.
     * @param {number} distance - distance this sprite will move
     */
    moveForward(distance)
	{
		this.moveAtAngle(distance, this.angle);
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
     * Initialize {@link Physics} data for this sprite and link to position.
     * Physics object will be automatically updated and used to control position. 
     * @param {number} accValue - default magnitude of acceleration when using {@link Physics#accelerateAtAngle|accelerateAtAngle}
	 * @param {number} maxSpeed - maximum speed: if speed is ever above this amount, it will be reduced to this amount
	 * @param {number} decValue - when not accelerating, object will decelerate (decrease speed) by this amount
	 */
    setPhysics(accValue, maxSpeed, decValue)
    {
    	this.physics = new BAGEL.Physics(accValue, maxSpeed, decValue);
    	this.physics.positionVector = this.position;
    }

    /**
     * Set world dimensions (width and height) to be used to bound sprite position.
     */
    setBoundRectangle(width, height)
    {
    	this.boundRectangle = new BAGEL.Rectangle(width/2,height/2, width,height);
    }

    /**
     * Adjusts position of sprite (if necessary)
     *  to be completely contained within screen or world dimensions.
     * <br/>
     * Called automatically by {@link Sprite#update|update} if {@link Sprite#setBoundRectangle|setBoundRectangle} was previously called.
     * @param {number} worldWidth - the width of the screen or world
     * @param {number} worldHeight - the height of the screen or world
     */
    boundWithinRectangle(worldWidth, worldHeight)
    {
    	if (this.position.x - this.rectangle.width/2 < 0)
    		this.position.x = this.rectangle.width/2;

    	if (this.position.x + this.rectangle.width/2 > worldWidth)
    		this.position.x = worldWidth - this.rectangle.width/2;

    	if (this.position.y - this.rectangle.height/2 < 0)
    		this.position.y = this.rectangle.height/2;

    	if (this.position.y + this.rectangle.height/2 > worldHeight)
    		this.position.y = worldHeight - this.rectangle.height/2;    		 
    }

    /**
     * Perform any internal actions that should be repeated every frame.
     */
    update(deltaTime)
    {
    	// use physics to update position (based on velocity and acceleration)
        //   if it has been initialized for this sprite
    	if (this.physics != null)
            this.physics.update(deltaTime);

        if (this.boundRectangle)
        	this.boundWithinRectangle(this.boundRectangle.width, this.boundRectangle.height);

    }

	/**
	 * Draw the sprite on a canvas, centered at the sprite's position, in an area corresponding to the sprite's size.
	 * Also take into account sprite's angle, whether the image should be flipped or mirrored, and the opacity of the image.
	 * If visible is set to false, sprite will not be drawn.
     * @param context - the graphics context object associated to the game canvas
	 */
	draw(context)
	{
		if ( !this.visible )
			return;
		
		let A = this.angle * Math.PI/180;
		let scaleX = 1;
		let scaleY = 1;
		if (this.mirrored)
			scaleX *= -1;
		if (this.flipped)
			scaleY *= -1;
		let cosA = Math.cos(A);
		let sinA = Math.sin(A);

		context.setTransform(scaleX*cosA, scaleX*sinA, -scaleY*sinA, scaleY*cosA, 
			this.position.x, this.position.y);

		context.globalAlpha = this.opacity;

		// image, 4 source parameters, 4 destination parameters
        context.drawImage(this.texture.image, 
            this.texture.region.position.x, this.texture.region.position.y, 
            this.texture.region.width, this.texture.region.height,
            -this.rectangle.width/2, -this.rectangle.height/2, 
             this.rectangle.width, this.rectangle.height);
	}

	/**
	 * Remove this sprite from the group that contains it.
	 */
	destroy()
	{
		this.parentGroup.removeSprite(this);
	}
	
}


export { Sprite };