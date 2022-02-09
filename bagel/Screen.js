import * as BAGEL from "./index.js";

/**
 *  A Screen contains the code for each individual game screen, 
 *   such as a title screen, menu screens, and screens corresponding to each room or level in the game.
 *  Each screen stores a {@link Group} of entities which will be rendered by the {@link Game} class.
 *  Classes which extend Screen must implement the {@link Screen#initialize|initialize} and {@link Screen#update|update} methods.
 */
class Screen
{

	/**
	 *  Creates a {@link Group} to store all entities, a variable to reference the {@link Game} containing this screen,
	 *  and calls the {@link Screen#initialize|initialize} method.
	 */
	constructor()
	{		
		// collection of objects to be rendered by Game
		this.group = new BAGEL.Group();

		// store reference to Game containing this Screen
		this.game = null;

    	// set up screen-specific objects
		this.initialize();
	}

	/**
	 *  Set up all {@link Entity} objects and any other initialization code required by this screen.
	 *  <br/>
	 *    Must be implemented by extending class.
	 *  <br/>
	 *  Note: this method will typically be "async" because "await" should be used when loading textures.
	 */
	async initialize()
	{ 
		throw new Error("initialize() method not implemented");
	}

	/**
	 *  Update all game logic for this screen, such as processing player input,
	 *    interaction between game entities, and game event conditions (such as win/lose). 
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
