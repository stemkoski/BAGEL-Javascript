import * as BAGEL from "./index.js";

/**
 *  Entity is the super class for {@link Sprite} and {@link Group} objects.
 */
class Entity
{

	constructor()
	{
		this.container = null;
	}

	// implement by extending classes
	draw(context) 
	{ 
		throw new Error("draw method not implemented");
	}


}

export { Entity };