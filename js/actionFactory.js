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
}