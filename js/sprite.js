class Sprite
{
	constructor(x, y)
	{
		// The starting point of the Sprite on the canvas in x and y coordinates.
		this.x = x;
		this.y = y;

		// store image-related data
		this.texture = null;

		// starting angle, measured in degrees
		this.angle = 0;

		// size to draw texture (width, height)
		this.w = 32;
		this.h = 32;

		// -Default Velocity Values-
		this.dx = 0;
		this.dy = 0;

		// -Default Wall Interaction Values-
		// Similarly to x, y, and imageID, the main HTML file provides a value (in this case, boolean) for each
		// of the following variables within the Sprite Object creation.
		this.doesBounce = false;
		this.doesWrap = false;
		this.doesBound = false;

		// These variables store the worldSize for later use.
		this.worldWidth = 512;
		this.worldHeight = 512;
	}

	setTexture(tex)
	{
		this.texture = tex;
	}

	setSize(w, h)
	{
		this.w = w;
		this.h = h;
	}

	setVelocity(dx, dy)
	{
		this.dx = dx;
		this.dy = dy;
	}

	setBounce(worldWidth, worldHeight)
	{
		this.worldWidth	= worldWidth;
		this.worldHeight = worldHeight;
		this.doesBounce = true;
		this.doesWrap = false;
		this.doesBound = false;
	}

	setWrap(worldWidth, worldHeight)
	{
		this.worldWidth	= worldWidth;
		this.worldHeight = worldHeight;
		this.doesBounce = false;
		this.doesWrap = true;
		this.doesBound = false;
	}

	setBound(worldWidth, worldHeight)
	{
		this.worldWidth	= worldWidth;
		this.worldHeight = worldHeight;
		this.doesBounce = false;
		this.doesWrap = false;
		this.doesBound = true;
	}

	moveDistanceAtAngle(distance, angle)
	{
		// convert angle from degrees to radians
		let A = angle * Math.PI / 180;
		this.x += distance * Math.cos(A);
		this.y += distance * Math.sin(A);
	}

	// TODO: (x,y) now refers to center of image. Need to update bounce,wrap,bound.

	bounce()
	{
		// The following code accounts for Sprites bouncing against the canvas walls.
		if (this.x + this.w/2 > this.worldWidth || this.x - this.w/2 < 0)
			this.dx = -1 * this.dx;

		if (this.y + this.h/2 > this.worldHeight || this.y - this.h/2 < 0)
			this.dy = -1 * this.dy;
	}

	wrap()
	{
		// The following code has the Sprite wrap to the opposite side of the canvas
		// if it moves past any of the canvas walls.

		// Although it would be simpler to teleport the spirte to the other side,
		// moving it by the world size accounts for the distanced traveled over the side of the canvas.
		// this makes it travel an accurate (canvas size + (width/height)*2).
		
		// right edge of sprite moves past left edge of screen
		if (this.x + this.w/2 < 0)
			this.x = (this.worldWidth + this.w/2) + this.x;
		
		if (this.x - this.w/2 > this.worldWidth)
			this.x = this.x - (this.worldWidth + this.w);

		if (this.y + this.h/2 < 0)
			this.y = (this.worldHeight + this.h) + this.y;

		if (this.y - this.h/2 > this.worldHeight)
			this.y = this.y - (this.worldHeight + this.h);
	}

	// NOTE - Current implementation makes the sprite wiggle a bit if you mash the key against the wall. Odd.
	// NOTE 2 - Sprite also currently bounces off of Right Wall, but is kept bounded.
	bound()
	{
		// The following code makes the canvas wall impassable to the sprite
		// As well as stopping its movement in that direction when hitting a wall.

		// Left Wall
		if ((this.x - this.w/2) < 0)
		{
			this.x = 0;
		}
		
		// Right Wall
		if ((this.x + this.w/2) > this.worldWidth)
		{
			this.x = this.worldWidth - this.w;
		}

		// Top Wall
		if ((this.y - this.h/2) < 0)
		{
			this.y = 0;
		}

		// Bottom Wall
		if ((this.y + this.h/2) > this.worldHeight)
		{
			this.y = this.worldHeight - this.h;
		}
	}

	// The following method, essentially, checks if one sprite is overlapping another by
	// checking the space between one sprite and another sprite, and seeing if there is an "invisible line"
	// (or empty space) between the two in any linear direction.
	overlaps(otherSprite)
	{
		let noOverlap = this.x > otherSprite.x + otherSprite.w/2 ||
						this.x + this.w/2 < otherSprite.x ||
						this.y > otherSprite.y + otherSprite.h/2 ||
						this.y + this.h/2 < otherSprite.y;

		// noOverlap is a boolean that stores whether or not the sprites are overlapping.
		// Whether they are or not, it is always returned when the overlaps() function is called.
		return !noOverlap;			
	}

	update()
	{
		// Changes Sprite's position according to velocity (dx,dy).
		this.x += this.dx;
		this.y += this.dy;

		// If doesBounce is true for this Sprite...Sprite will bounce against the designated walls of the canvas.
		if (this.doesBounce)
			this.bounce();

		// If doesWrap is true for this Sprite...Sprite will wrap around to the opposite side of the canvas if it
		// travels past one of the walls.
		if (this.doesWrap)
			this.wrap();
		
		// If doesBound is true for this Sprite...Sprite will treat the side of the canvas like a solid wall.
		if (this.doesBound)
			this.bound();
		
	}

	render(context)
	{
		// convert angle from degrees to radians
		let A = this.angle * Math.PI / 180;
		let cosA = Math.cos(A);
		let sinA = Math.sin(A);

		// transform the drawing area
		context.setTransform( cosA,sinA, -sinA,cosA, this.x, this.y );

		// image, source location/size, destination location/size
		//context.drawImage(this.image, this.x, this.y, this.w, this.h)
		context.drawImage(this.texture.image, 
			// actual size of original image
			        0,         0, this.texture.width, this.texture.height,  
			// size we want the image to be
			-this.w/2, -this.h/2, this.w, this.h); 
	}
}
