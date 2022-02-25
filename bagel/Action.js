import * as BAGEL from "./index.js";

/**
 * A framework for storing a method that is applied to a target {@link Sprite} over time. 
 * <br/>
 * Actions are typically created with the static methods in the 
 * {@link ActionFactory} class, added to the target {@link Sprite}, 
 * and will then be applied automatically. 
 * <br/>
 * Actions return true when finished.
 * <br/>
 * Custom Action objects may be created by using inline functions with the necessary parameters, such as:
 * <pre>
 * let teleportRight = new BAGEL.Action(
 *   function(targetSprite, deltaTime, totalTime)
 *   {
 *     targetSprite.moveBy(100, 0);
 *     return true;
 *   }
 * );
 * </pre>
 */
class Action
{   
    /**
     * This constructor is used by static {@link ActionFactory} methods.
     * <br/>
     * Actions store their total running time, as some Actions run only for a precise amount of time.
     * @param {function} actFunction - function that will be applied to the Sprite this Action is attached to;
     *   must take parameters (targetSprite, deltaTime, totalTime).
    */
    constructor(actFunction=null)
    {
        this.actFunction = actFunction;
        this.totalTime = 0;
    }
    
    /**
     * Increments totalTime by deltaTime and applies function to target.
     * @param {Sprite} targetSprite - the sprite to which the function will be applied
     * @param {number} deltaTime - elapsed time (seconds) since previous iteration of game loop (typically approximately 1/60 second)
     * @return {boolean} true if the function has completed, false otherwise
     */
    apply(targetSprite, deltaTime)
    {
        this.totalTime += deltaTime;
        return this.actFunction(targetSprite, deltaTime, this.totalTime);
    }
    
    /**
     * Sets totalTime to 0, effectively restarting this Action.
     */
    reset()
    {
        this.totalTime = 0;
    }
}
    
    
export { Action };