import * as BAGEL from "./index.js";

/**
 *  The Clock keeps track of time-related values for a {@link Game}:
 *  <ul>
 *   <li>elapsed time (total time since initialization)
 *   <li>delta time (the change in time since last {@link Clock#update|update}).
 *  </ul>
 */
class Clock
{
	/**
	 * Initialize required variables and begin tracking time.
	 */
	constructor()
	{
		// performance.now
		this.previousTime = Date.now();
		this.currentTime = Date.now();
		this.deltaTime = 0;
		this.elapsedTime = 0;
	}

    /**
     * Return the time (seconds) since the last time the {@link Clock#update|update} method was called.
     * @return {number} time (seconds) since last update
     */
	getDeltaTime()
	{
		return this.deltaTime;
	}

    /**
     * Return the time (seconds) since the last time the {@link Clock#update|update} method was called.
     * @return {number} time (seconds) since clock was created
     */
	getElapsedTime()
	{
		return this.elapsedTime;
	}

    /**
	 *  Update the values for delta time and elapsed time.
	 *  <br/>
	 *  This method should be called once per frame by the {@link Game} class. 
	 */
	update()
	{
		this.currentTime = Date.now();
		this.deltaTime = (this.currentTime - this.previousTime) / 1000;
		this.elapsedTime += this.deltaTime;
		this.previousTime = Date.now();
	}
}

export { Clock };