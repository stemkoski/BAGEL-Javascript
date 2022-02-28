import * as BAGEL from "./index.js";

/**
 *  A Screen contains the code for each individual game screen, 
 *   such as a title screen, menu screens, and screens corresponding to each room or level in the game.
 * <br/> 
 * Each screen manages a collection of {@link Group|Groups}, 
 *   each of which stores a list of {@link Sprite|Sprites}, 
 *   that are rendered by the {@link Game} class,
 *   in the order in which they were added. 
 * <br/>
 * Classes which extend Screen must implement the {@link Screen#initialize|initialize} and {@link Screen#update|update} methods.
 */
class Screen
{

	/**
	 *  Creates a collection to store {@link Group|Groups}, a default Group named "main",
	 *  a variable to reference the {@link Game} containing this screen,
	 *  and calls the {@link Screen#initialize|initialize} method.
	 *  @param {Game} game - a reference to the Game containing this Screen
	 *  @constructor
	 */
	constructor(game)
	{		
		// collection of Groups to be rendered by Game
		this.groupCollection = {};
		this.groupCollection["main"] = new BAGEL.Group();

		// a list to store the order in which groups are added;
		//   necessary because draw order is important
		this.groupDrawOrder = [];
		this.groupDrawOrder.push("main");

		// store reference to Game containing this Screen
		this.game = game;

    	// set up screen-specific objects
		this.initialize();
	}

	/**
	 * Create a new group and add it to the collection.
	 * @param {string} groupName - the name that will be used to reference the group
	 */
	createGroup(groupName)
	{
	  this.groupCollection[groupName] = new BAGEL.Group();
	  this.groupDrawOrder.push(groupName);
	}

	/**
	 * Get a group from the collection.
	 * @param {string} groupName - the name of the group
	 * @return {Group} the group stored with the given name
	 */
	getGroup(groupName)
	{
	  return this.groupCollection[groupName];
	}	

	/**
	 * Add a sprite to a group in the collection.
	 * @param {Sprite} sprite - the sprite to be added
	 * @param {string} groupName - the name of the group
	 */
	addSpriteToGroup(sprite, groupName="main")
	{
	  this.getGroup(groupName).addSprite(sprite);
	}	

	/**
	 * Remove a sprite from a group in the collection.
	 * <br/>
	 * (Note: simpler to use the {@link Sprite} class {@link Sprite#destroy|destroy} method.) 
	 * @param {Sprite} sprite - the sprite to be removed
	 * @param {string} groupName - the name of the group
	 */
	removeSpriteFromGroup(sprite, groupName)
	{
	  this.getGroup(groupName).removeSprite(sprite);
	}	

	/**
	 * Remove all sprites from a group in the collection.
	 * @param {string} groupName - the name of the group
	 */
	removeAllSpritesFromGroup(groupName)
	{
	  let spriteList = this.getGroupSpriteList(groupName);
	  // traverse list in reverse order
	  //  because splicing from list changes indices
	  for (let i = spriteList.length - 1; i >= 0; i--)
	  {
	  	  let sprite = spriteList[i];
	  	  sprite.destroy();
	  }
	}	

	/**
	 * Get the list of sprites stored in the group with the given name.
	 * <br/>
	 * Typically used in loops that involve all sprites in this group.
	 * @param {string} groupName - the name of the group
	 * @return {List} the list of sprites in the group
	 */
	getGroupSpriteList(groupName)
	{
	  return this.getGroup(groupName).getSpriteList();
	}

	/**
	 * Get the number of sprites stored in the group with the given name.
	 * @param {string} groupName - the name of the group
	 * @return {number} the number of sprites in the group
	 */
	getGroupSpriteCount(groupName)
	{
	  return this.getGroup(groupName).getSpriteCount();
	}


	/**
	 * Draw all sprites in all groups in the collection (in the order they were added).
     * @param context - the graphics context object associated to the game canvas
	 */
	drawGroups(context)
	{
		for (let i = 0; i < this.groupDrawOrder.length; i++)
		{
			let groupName = this.groupDrawOrder[i];
			this.getGroup(groupName).drawSprites(context);
		}
	}	

	/**
	 * Update all sprites in all groups in the collection.
     * @param deltaTime - the change in time since the last clock update
	 */
	updateGroups(deltaTime)
	{
		for (let i = 0; i < this.groupDrawOrder.length; i++)
		{
			let groupName = this.groupDrawOrder[i];
			this.getGroup(groupName).updateSprites(deltaTime);
		}
	}	

	/**
	 *  Create all objects and any other initialization code required by this screen.
	 *  <br/>
	 *    Must be implemented by extending class.
	 *  <br/>
	 */
	initialize()
	{ 
		throw new Error("initialize() method not implemented");
	}

	/**
	 *  Update all game logic for this screen, such as processing player input,
	 *    interaction between sprites, and game event conditions (such as win/lose). 
	 *  <br/>
	 *    Must be implemented by extending class.
	 */
	update()
	{ 
		throw new Error("update() method not implemented");
	}


	// TODO: is a resume() method necessary? 
	//  - only if events on other screens affect the last known state of objects on this screen?
	//    for example, the player re-enters this screen from a different location, causing the player sprite to be repositioned?

}

export { Screen };
