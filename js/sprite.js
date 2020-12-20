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

		// opacity level: 0.0 = transparent, 1.0 = opaque
		this.opacity = 1.0;

		// physics data
		this.physics = null;

		// -Default Wall Interaction Values-
		// Similarly to x, y, and imageID, the main HTML file provides a value (in this case, boolean) for each
		// of the following variables within the Sprite Object creation.
		this.doesBounce = false;
		this.doesWrap = false;
		this.doesBound = false;

		// These variables store the worldSize for later use.
		this.worldWidth = 512;
		this.worldHeight = 512;

		// list of actions: functions applied to this Sprite over time
		this.actionList = [];

		// the group containing this object
		this.parent = null;
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

	setPhysics(accValue, maxSpeed, decValue)
	{
		this.physics = new Physics(accValue, maxSpeed, decValue);
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

	addAction(a)
	{
		this.actionList.push(a);
		
	}

	remove()
	{
		this.parent.remove(this);
	}

	/*
	moveDistanceAtAngle(distance, angle)
	{
		// convert angle from degrees to radians
		let A = angle * Math.PI / 180;
		this.x += distance * Math.cos(A);
		this.y += distance * Math.sin(A);
	}
	*/

	bounce()
	{
		// The following code accounts for Sprites bouncing against the canvas walls.
		// This if-statement handles bouncing off of the right wall, and the left wall.
		if (this.x + this.w/2 > this.worldWidth || this.x - this.w/2 < 0)
			this.physics.velocityVector.x = -1 * this.physics.velocityVector.x;

		// This if statement handles bouncing off of the bottom wall, and the top wall.
		if (this.y + this.h/2 > this.worldHeight || this.y - this.h/2 < 0)
			this.physics.velocityVector.y = -1 * this.physics.velocityVector.y;
	}

	wrap()
	{
		// The following code has the Sprite wrap to the opposite side of the canvas
		// if it moves past any of the canvas walls.

		// Although it would be simpler to teleport the sprite to the other side,
		// moving it by the world size accounts for the distanced traveled over the side of the canvas.
		// this makes it travel an accurate (canvas size + (width/height)*2).
		
		// Right edge of sprite moves past left edge of screen.
		if (this.x + this.w/2 < 0)
			this.x = (this.worldWidth + this.w/2) + this.x;
		
		// Left edge of sprite moves past right edge of screen.
		if (this.x - this.w/2 > this.worldWidth)
			this.x = this.x - (this.worldWidth + this.w);

		// Bottom edge of sprite moves past top edge of screen.
		if (this.y + this.h/2 < 0)
			this.y = (this.worldHeight + this.h) + this.y;

		// Top edge of sprite moves past bottom edge of screen. 
		if (this.y - this.h/2 > this.worldHeight)
			this.y = this.y - (this.worldHeight + this.h);
	}


	bound()
	{
		// The following code makes the canvas wall impassable to the sprite
		// As well as stopping its movement in that direction when hitting a wall.

		// Left Wall
		if (this.x < this.w/2 )
		{
			this.x = this.w/2;
		}
		
		// Right Wall
		if ((this.x + this.w/2) > this.worldWidth)
		{
			this.x = this.worldWidth - this.w/2;
		}

		// Top Wall
		if ((this.y - this.h/2) < 0)
		{
			this.y = this.h/2;
		}

		// Bottom Wall
		if ((this.y + this.h/2) > this.worldHeight)
		{
			this.y = this.worldHeight - this.h/2;
		}
	}

	// The following method, essentially, checks if one sprite is overlapping another by
	// checking the space between one sprite and another sprite, and seeing if there is an "invisible line"
	// (or empty space) between the two in any linear direction.
	overlaps(other)
	{
		this.left    = this.x - this.w/2;
		this.right   = this.x + this.w/2;
		this.top     = this.y - this.h/2;
		this.bottom  = this.y + this.h/2;
		other.left   = other.x - other.w/2;
		other.right  = other.x + other.w/2;
		other.top    = other.y - other.h/2;
		other.bottom = other.y + other.h/2;

		let noOverlap = this.left   > other.right  ||
						this.right  < other.left   ||
						this.top    > other.bottom ||
						this.bottom < other.top;

		// noOverlap is a boolean that stores whether or not the sprites are overlapping.
		// Whether they are or not, it is always returned when the overlaps() function is called.
		return !noOverlap;			
	}

	preventOverlap(other)
	{
		if (!this.overlaps(other))
			return;

		console.log("preventOverlap");

		this.left    = this.x - this.w/2;
		this.right   = this.x + this.w/2;
		this.top     = this.y - this.h/2;
		this.bottom  = this.y + this.h/2;
		other.left   = other.x - other.w/2;
		other.right  = other.x + other.w/2;
		other.top    = other.y - other.h/2;
		other.bottom = other.y + other.h/2;

		let vectorA = [ other.right - this.left, 0 ];
		let vectorB = [ other.left - this.right, 0 ];
		let vectorC = [ 0, other.bottom - this.top];
		let vectorD = [ 0, other.top - this.bottom ];

		function sortFunction( vector1, vector2 )
		{
			// if vector1 < vector2 return -1
		    // if vector1 = vector2 return  0
			// if vector1 > vector2 return +1
			let length1 = Math.sqrt( vector1[0] * vector1[0] + vector1[1] * vector1[1] );
			let length2 = Math.sqrt( vector2[0] * vector2[0] + vector2[1] * vector2[1] );
			
			if (length1 < length2)
				return -1;
			else if (length1 > length2)
				return 1;
			else
				return 0;
		}

		let translations = [ vectorA, vectorB, vectorC, vectorD ];

		/*
		console.log( vectorA );
		console.log( vectorB );
		console.log( vectorC );
		console.log( vectorD );
		*/
		
		translations.sort( sortFunction );

		let minTranslation = translations[0];
		//console.log( minTranslation );

		this.x += minTranslation[0] * 1.1;
		this.y += minTranslation[1] * 1.1;
	}

	update()
	{
		// Changes Sprite's position according to velocity (dx,dy).
		if (this.physics != null)
		{
			this.physics.positionVector.setValues(this.x, this.y);
			this.physics.update(1/60);
			this.x = this.physics.positionVector.x;
			this.y = this.physics.positionVector.y;
		}

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

		// process any actions in the actionList
		for (let i = 0; i < this.actionList.length; i++)
		{
			let action = this.actionList[i];
			let finished = action.apply( this, 1/60 );
			if (finished)
				this.actionList.splice(i, 1);	
		}
		
	}

	render(context)
	{
		// convert angle from degrees to radians
		// TODO- Make into utility function, going both ways
		let A = this.angle * Math.PI / 180;
		let cosA = Math.cos(A);
		let sinA = Math.sin(A);

		// transform the drawing area
		context.setTransform( cosA,sinA, -sinA,cosA, this.x, this.y );

		context.globalAlpha = this.opacity;

		// image, source location/size, destination location/size
		//context.drawImage(this.image, this.x, this.y, this.w, this.h)
		context.drawImage(this.texture.image, 
			// actual size of original image
			        0,         0, this.texture.width, this.texture.height,  
			// size we want the image to be
			-this.w/2, -this.h/2, this.w, this.h); 

		context.globalAlpha = 1.0;
	}
}
