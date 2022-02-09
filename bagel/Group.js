import * as BAGEL from "./index.js";

/**
 *  A Group is a collection of {@link Entity} objects.
 *  <br/>
 *  Both {@link Sprite} and {@link Group} objects may be added to a group. This enables nesting of groups,
 *   and therefore all entities in a {@link Screen} may be organized in a single group.
 *  
 */
class Group extends BAGEL.Entity
{

	constructor()
	{
		super();
		// using arrays rather than sets, because draw order is important.
		this.entityList = [];
	}
	
	add(entity)
	{
		entity.container = this;
		this.entityList.push(entity);
	}
	
	remove(entity)
	{
		entity.container = null;
		let index = this.entityList.indexOf(entity);
		if (index > -1)
			this.entityList.splice(index, 1);
	}

	list()
	{
		return this.entityList;
	}
	
	size()
	{
		return this.entityList.length;
	}

	draw(context)
	{
		for (let element of this.entityList)
			element.draw(context);
	}



}

export { Group };