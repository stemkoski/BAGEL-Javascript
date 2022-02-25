import * as BAGEL from "./index.js";

/**
 * A factory class for creating {@link Action} objects.
 */
class ActionFactory
{
    /**
     * Create an Action to move a Sprite by a fixed amount over a period of time.
     * <br>This Action is complete once movement has finished.
     * @param {number} deltaX - distance to move Sprite in the x-direction
     * @param {number} deltaY - distance to move Sprite in the y-direction
     * @param {number} duration - total time to be used for movement
     * @return {Action} Action to move a Sprite by a fixed amount over a period of time.
     */
    static moveBy(deltaX, deltaY, duration)
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                targetSprite.moveBy( deltaX * deltaTime/duration, deltaY * deltaTime/duration );
                return (totalTime >= duration);
            }
        );
    }

    /**
     * Create an Action to rotate a Sprite by a fixed amount over a period of time.
     * <br>This Action is complete once rotation has finished.
     * @param {number} deltaAngle - angle to rotate Sprite
     * @param {number} duration - total time to be used for movement
     * @return {Action} Action to rotate a Sprite by a fixed amount over a period of time
     */
    static rotateBy(deltaAngle, duration)
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                targetSprite.rotateBy( deltaAngle * deltaTime/duration );
                return (totalTime >= duration);
            }
        );
    }

    /**
     * Create an Action to fade out (reduce opacity of) a Sprite over a period of time.
     * <br>This Action is complete once the Sprite's opacity reaches 0.
     * <br>To automatically remove a Sprite once it has finished fading out, use:
     * <br>
     * <code>
     * ActionFactory.sequence([ 
     * <br> &nbsp;&nbsp; ActionFactory.fadeOut(fadeRate), 
     * <br> &nbsp;&nbsp; ActionFactory.remove() 
     * <br> ])
     * </code>
     * @param {number} fadeRate - amount to reduce opacity by per second
     * @return {Action} Action to fade out a Sprite over a period of time
     */
    static fadeOut(fadeRate)
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                targetSprite.opacity -= fadeRate * deltaTime;
                if (targetSprite.opacity < 0)
                    targetSprite.opacity = 0;
                return (targetSprite.opacity <= 0);
            }
        );
    }

    /**
     * Create an Action to fade in (increase opacity of) a Sprite over a period of time.
     * <br>This Action is complete once the Sprite's opacity reaches 1.
     * @param {number} fadeRate - amount to increase opacity by per second
     * @return {Action} Action to fade in a Sprite over a period of time
     */
    static fadeIn(fadeRate)
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                targetSprite.opacity += fadeRate * deltaTime;
                if (targetSprite.opacity > 1)
                    targetSprite.opacity = 1;
                return (targetSprite.opacity >= 1);
            }
        );
    }

    /**
     * Create an Action to perform a sequence of actions. 
     * Each Action in the list is performed only after all previous actions in the list have completed.
     * <br>
     * This Action is complete once all the corresponding actions are complete.
     * @param {array} actionArray - one or more actions to perform in sequence
     * @return {Action} Action that performs a sequence of actions
     */
    static sequence(actionArray)
    { 
        let sequenceAction = new BAGEL.Action();

        sequenceAction.actionArray = actionArray;
        sequenceAction.actionIndex = 0;

        // uses additional variables defined above
        sequenceAction.apply = function(targetSprite, deltaTime, totalTime)
        {
            // retrieve first action in array
            let currentAction = sequenceAction.actionArray[sequenceAction.actionIndex];
            // run action on target
            let finished = currentAction.apply(targetSprite, deltaTime);
            // if that action is finished, move on to the next
            if (finished)
                sequenceAction.actionIndex += 1;
            // if array is empty, this (sequence) action is finished
            return (sequenceAction.actionIndex == sequenceAction.actionArray.length);
        }

        // overriding default reset function
        sequenceAction.reset = function()
        {
            for (let i = 0; i < sequenceAction.actionArray.length; i++)
                sequenceAction.actionArray[i].reset();

            sequenceAction.actionIndex = 0;
        }

        return sequenceAction;
    }

    /**
     * Create an Action that repeats another Action a fixed number of times.
     * <br>This Action is complete once the specified Action has been completed
     *  the specified number of times.
     * @param {Action} action - Action to be repeated
     * @param {number} totalTimes - total number of times to repeat the specified Action
     * @return {Action} Action that repeats another Action a fixed number of times
     */
    static repeat(action, totalTimes)
    { 
        let repeatAction = new BAGEL.Action();

        repeatAction.finishedTimes = 0;

        repeatAction.apply = function(targetSprite, deltaTime)
        {
            let finished = action.apply(targetSprite, deltaTime);
            if (finished)
            {
                repeatAction.finishedTimes += 1;
                action.reset();
            }
            return (repeatAction.finishedTimes == totalTimes);
        }
        
        return repeatAction;
    }

    /**
     * Create an Action that repeats another Action forever.
     * <br>This Action is never complete.
     * @param {Action} action - Action to be repeated
     * @return {Action} Action that repeats another Action forever
     */
    static forever(action)
    { 
        let foreverAction = new BAGEL.Action();

        foreverAction.apply = function(targetSprite, deltaTime)
        {
            let finished = action.apply(targetSprite, deltaTime);
            if (finished)
                action.reset();
            return false;
        }
        
        return foreverAction;
    }

    /**
     * Create an Action that waits for a specified amount of time.
     * This is typically used in conjunction with a {@link ActionFactory#sequence|sequence} action.
     * <br>This Action is complete once the specified amount of time passes.
     * @param {number} duration - amount of time to wait
     * @return {Action} Action that waits for a specified amount of time
     */
    static delay(duration)
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                return (totalTime >= duration);
            }
        );
    }

    /**
     * Create an Action that automatically removes a Sprite.
     * <br>This Action is complete immediately.
     * @return {Action} Action that automatically removes a Sprite
     */
    static remove()
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                target.remove();
                return true;
            }
        );
    }
    
    /**
     * Create an Action that checks if animation is finished.
     * <br> 
     * To remove a Sprite after its animation is complete, use:
     * <br>
     * <code>
     * ActionFactory.sequence([ 
     * <br> &nbsp;&nbsp; ActionFactory.isAnimationFinished(), 
     * <br> &nbsp;&nbsp; ActionFactory.remove() 
     * <br> ])
     * </code>
     * @return {Action} Action that automatically removes a Sprite
     */
    static isAnimationFinished()
    {
        return new BAGEL.Action(
            function(targetSprite, deltaTime, totalTime)
            {
                return target.animation.isFinished();
            }
        );
    }



}

export { ActionFactory };