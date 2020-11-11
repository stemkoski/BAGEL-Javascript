class Action
{
	constructor(f)
	{
		this.totalTime = 0;
		this.actFunction = f;
	}

	// return: is this action finished?
	apply(target, deltaTime)
	{
		this.totalTime += deltaTime;
		return this.actFunction(target, deltaTime, this.totalTime);
	}

	// start action over
	reset()
	{
		this.totalTime = 0;
	}

}