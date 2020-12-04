class ActionFactory
{
	// duration = how long to perform this action...
	static moveBy(deltaX, deltaY, duration)
	{
		// return: is this action finished?
		return new Action(
			function(target, deltaTime, totalTime)
			{
				target.x += deltaX / duration * deltaTime;
			    target.y += deltaY / duration * deltaTime;
			    let finished = (totalTime >= duration);
				return finished;
			}
		);
	}

	static rotateBy(deltaA, duration)
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				target.angle += deltaA / duration * deltaTime;
				return totalTime >= duration;
			}
		);
	}

	// TODO: Better describe this.
	static fadeOut(duration)
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				// We set the opacity to itself minus 1/60 (fps) times our action duration.
				target.opacity -= (1/(60 * duration));
				return target.opacity <= 0;
			}
		);
	}

	// make a new action that repeats "act" forever
	static forever(act)
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				let finished = act.apply(target, deltaTime);
				if (finished)
					act.reset();
				return false;
			}
		);
	}

	// action that finishes after a certain amount of time passes
	static delay(duration)
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				return totalTime >= duration;
			}
		);
	}

	// action to remove an object from its containing Group
	static remove()
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				// request parent group to remove this sprite from it
				target.remove();
			}
		);
	}

	// this forces actions to be run one after the other
	//  not all at the same time, which is the default.
	static sequence(actionArray)
	{
		return new Action(
			function(target, deltaTime, totalTime)
			{
				// retrieve first action in array
				let act = actionArray[0];
				// run action on target
				let finished = act.apply(target, deltaTime);
				// if that action is finished, remove it from the array
				if (finished)
					actionArray.shift();
				// if array is empty, this (sequence) action is finished
				return (actionArray.length == 0);
			}
		);
	}

}