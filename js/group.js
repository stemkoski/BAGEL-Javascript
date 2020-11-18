class Group
{
	constructor()
	{
		this.list = [];
	}

	add(sprite)
	{
		this.list.push(sprite);
	}

	remove(sprite)
	{
		let index = this.list.indexOf(sprite);

		if (index != -1)
		{
			this.list.splice(index, 1);
		}
	}

	render(context)
	{
		for (let i = 0; i < this.list.length; i++)
		{
			this.list[i].render(context);
		}
	}
}