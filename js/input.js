class Input
{
	constructor()
	{
		this.keyDownSet    = new Set();
		this.keyPressedSet = new Set();
		this.keyUpSet      = new Set();

		let self = this;

		function onKeyDown(eventData)
		{
			self.keyDownSet.add( eventData.key );
			self.keyPressedSet.add( eventData.key );
		}

		document.addEventListener("keydown", onKeyDown);

		function onKeyUp(eventData)
		{
			self.keyPressedSet.delete( eventData.key );
			self.keyUpSet.add( eventData.key );
		}
		
		document.addEventListener("keyup", onKeyUp);

	}

	update()
	{
		// clear out discrete events "down"/"up"
		this.keyDownSet.clear();
		this.keyUpSet.clear();
	}

	isKeyDown( keyName )
	{
		return this.keyDownSet.has(keyName);
	}

	isKeyPressed( keyName )
	{
		return this.keyPressedSet.has(keyName);
	}

	isKeyUp( keyName )
	{
		return this.keyUpSet.has(keyName);
	}

}