import * as BAGEL from "./index.js";

class Sprite
{
	constructor()
	{
		//super();
		this.position = new BAGEL.Vector();
		this.texture = null;
		this.width  = 0;
		this.height = 0;
		this.visible = true;
	}
	
	// basic methods
	
	setPosition(x, y)
	{
		this.position.setValues(x, y);
	}

	moveBy(dx, dy)
	{
		this.position.addValues(dx, dy);
	}	
	
	setTexture(tex)
	{
		this.texture = tex;
		this.width   = tex.image.width;
		this.height  = tex.image.height;
	}
	
	setSize(width, height)
	{
		this.width  = width;
		this.height = height;
	}
	
	// overrides function from Entity class
	draw(context)
	{
		if ( !this.visible )
			return;
		
		context.setTransform(1,0, 0,1, this.position.x, this.position.y);

		// image, 4 source parameters, 4 destination parameters
        context.drawImage(this.texture.image, 
            this.texture.region.position.x, this.texture.region.position.y, 
            this.texture.region.width, this.texture.region.height,
            -this.width/2, -this.height/2, this.width, this.height);
	}
	
}


export { Sprite };