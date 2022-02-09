import * as BAGEL from "./index.js";

/**
 *  The Game class sets up the canvas where the game appears,
 *   manages a collection of {@link Screen} objects, which contain the code for each individual game screen,
 *   and manages up the {@link Input} object and {@link Clock} objects, shared by all screens.
 *  <br/>
 *  Classes which extend Game must implement the {@link Game#initialize|initialize} method.
 */
class Game
{

	/**
	 * Set up the canvas where the game will appear.
	 * @constructor
	 * @param {number} width the width of the canvas containing the game
	 * @param {number} height the height of the canvas containing the game
	 * @param {string} divID the ID of the HTML div element where the canvas should be placed;
	 *                  if not included, a div element will be created
	 */
	constructor(width=800, height=600, divID=null)
	{
		if (!divID)
		{
			divID = "gameArea";
			let newDiv = document.createElement("div");
			newDiv.id = divID;
			// add to bottom of page
			document.body.appendChild(newDiv);
		}		

		let div = document.getElementById(divID);
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		div.appendChild( this.canvas );

		this.context = this.canvas.getContext("2d");
	}

	/**
	 *  Add {@link Screen} objects and set first screen to display.
	 *  <br/>
	 *  Must be implemented by extending class.
	 */
	initialize()
	{ 
		throw new Error("initialize() method not implemented");
	}

	/**
	 * Add a {@link Screen} object to this game.
	 * @param {string} screenName - the name that should be used to refer to the screen when using the {@link Game#setScreen|setScreen} method
	 * @param {Screen} screenObject - the screen to be added to the game
	 */
	addScreen(screenName, screenObject)
	{
		this.screenList[screenName] = screenObject;	
	}

	/**
	 * Set the active {@link Screen} object for this game. 
	 * During each frame, the game calls the {@link Screen#update|Screen.update} method and
	 *  renders the {@link Sprite|Sprites} in the {@link Group} of the active screen. 
	 * @param {string} screenName - the name of the associated screen initially specified by the {@link Game#addScreen|addScreen} method
	 */
	setScreen(screenName)
	{
		this.activeScreen = this.screenList[screenName];

		this.activeScreen.game = this;
	}
	
	/**
	 * Start the game: create game objects and run the {@link Game#initialize|initialize} method.
	 */
	start()
	{
		this.input = new BAGEL.Input();
		this.clock = new BAGEL.Clock();
	
		// store collection of screen objects, indexed by name
		this.screenList = {};

		// the currently active screen, will be displayed in game
		this.activeScreen = null;

		this.running = true;

		// TODO: global data structure for passing data between screens?

		this.initialize();
		this.update();
	}

    /**
	 * Clear the game canvas by drawing a colored rectangle that fills the canvas.
	 * @param {string} clearColor - name or hex code of color to use when clearing the canvas
	 */
	clearCanvas(clearColor = "#000000")
	{
		this.context.setTransform(1,0, 0,1, 0,0);
		this.context.fillStyle = clearColor
		this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
	}

    /**
	 * Update the game: update the game {@link Input} and {@link Clock} objects,
	 *   run the active screen's update method, and draw the active screen's sprite images to the canvas. 
	 */
	update()
	{
		this.clock.update();

		// process input
		this.input.update();
		
		if ( this.input.keyPressed("Escape") )
			this.quit();

		// update active screen's game state
		// this.activeScreen.group.act(this.deltaTime);
		this.activeScreen.update();
		
		// clear window canvas
		this.clearCanvas("#337");

		// render active screen's sprite images to canvas
		this.activeScreen.group.draw(this.context);

		// creates a loop that repeats at monitor refresh rate.
		// bind(this) required so update function uses correct context for "this"
		if (this.running)
		  this.intervalID = requestAnimationFrame( this.update.bind(this) );
	}
	
	/**
	 * Pause the game: stop the {@link Game#update|update} method from looping.
	 * <br/>
	 * Note that this also stops the {@link Input} class from processing user keyboard input,
	 *   so the game must be resumed by an alternative source. 
	 */
	pause()
	{
		this.running = false;
	}

	/**
	 * Resume the game.
	 */
	resume()
	{
		this.running = true;
		this.update();
	}

	/**
	 * Quit the game: stop the game from listening for user keyboard input, and clear the canvas.
	 */
	quit()
	{
		// stop game from listening for player input
		this.input.shutdown();

		// blank screen
		this.clearCanvas("#888");
	}



}

export { Game };