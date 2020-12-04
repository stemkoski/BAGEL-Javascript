class Group
{
	constructor()
	{
		this.list = [];
	}

	add(sprite)
	{
		this.list.push(sprite);
		sprite.parent = this;
	}

	remove(sprite)
	{
		let index = this.list.indexOf(sprite);

		if (index != -1)
		{
			this.list.splice(index, 1);
		}

		sprite.parent = null;
	}

	getSize()
	{
		return this.list.length;
	}

	getList()
	{
		return this.list;
	}

	update()
	{
		for (let i = 0; i < this.list.length; i++)
		{
			this.list[i].update();
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