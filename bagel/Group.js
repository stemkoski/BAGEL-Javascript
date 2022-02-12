import * as BAGEL from "./index.js";

/**
 *  A Group stores a collection of {@link Sprite|Sprites}.
 */
class Group
{
	/**
	 *  Initializes a list to store Sprites.
	 *  @constructor
	 */
	constructor()
	{
		// using arrays rather than sets, because draw order is important.
		this.spriteList = [];
	}
	
	/**
	 * Add a sprite to this group.
	 * @param {Sprite} sprite - a sprite to add to this group
	 */ 
	addSprite(sprite)
	{
		sprite.parentGroup = this;
		this.spriteList.push(sprite);
	}
	
	/**
	 * Remove a sprite from this group.
	 * @param {Sprite} sprite - a sprite to remove from this group
	 */ 
	removeSprite(sprite)
	{
		sprite.parentGroup = null;
		let index = this.spriteList.indexOf(sprite);
		if (index > -1)
			this.spriteList.splice(index, 1);
	}

	/**
	 * Get the list of sprites stored in this group.
	 * <br/>
	 * Typically used in loops that involve all sprites in this group.
	 * @return {List} the list of sprites in this group
	 */ 
	getSpriteList()
	{
		return this.spriteList;
	}
	
	/**
	 * Get the number of sprites in this group.
	 * @return {number} the number of sprites in this group
	 */ 
	getSpriteCount()
	{
		return this.spriteList.length;
	}

	/**
	 * Draw the sprites in this group.
     * @param context - the graphics context object associated to the game canvas
	 */ 
	drawSprites(context)
	{
		for (let sprite of this.spriteList)
			sprite.draw(context);
	}

}

export { Group };