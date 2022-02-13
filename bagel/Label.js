import * as BAGEL from "./index.js";

/**
 *  A Label draws text on the canvas of a {@link Game}.
 *  <br/>
 *  Labels must be added to {@link Group|Groups}, similar to {@link Sprite|Sprites}, to appear in a Game.
 */
class Label
{
	/**
	 * Initialize default values for all properties.
	 */
	constructor()
	{
		this.text = " ";

		this.x = 0;
		this.y = 0;
		this.alignment = "left"; // "left" | "center" | "right"

		// style options, configured by setProperties method		
		this.visible = true;

		this.fontName = "Arial Black";
		this.fontSize = 32;
		this.fontColor = "#00FFFF";

		this.drawBorder = true;
		this.borderSize = 1;
		this.borderColor = "black";

		this.drawShadow = true;
		this.shadowColor = "black";
		this.shadowSize = 4;
	}

    /**
     * Set the location of this label.
     * @param {number} x - the x coordinate of the text, corresponding to the location specified by the "alignment" parameter
     * @param {number} x - the y coordinate of the baseline of the text
     * @param {string} alignment - one of: "left", "center", "right"; determines what location of the text that the x coordinate refers to 
     */	
	setPosition(x,y, alignment="left")
	{
		this.x = x;
		this.y = y;
		this.alignment = alignment;
	}

	/**
	 * Set the text displayed by this label.
	 * @param {string} text - the text displayed by this label
	 */
	setText(text)
	{
		this.text = text;
	}

	/**
	 * Set the style properties for displaying text.
	 * <br/>
	 * Properties that can be set include:
	 * <ul>
	 * <li> <tt>fontName</tt> (string, e.g. "Arial Black")
	 * <li> <tt>drawBorder</tt> and <tt>drawShadow</tt> (boolean)
	 * <li> <tt>fontSize</tt>, <tt>borderSize</tt>, and <tt>shadowSize</tt> (number)
	 * <li> <tt>fontColor</tt>, <tt>borderColor</tt>, and <tt>shadowColor</tt> (string, e.g. "red" or "#FF0000")
	 * </ul>
	 * Properties are specified with an object.
	 * <br/>
	 * For example: <tt>{ "fontSize" : 48, "fontColor" : "#8800FF", "drawShadow" : false }</tt>
	 * @param {object} properties - an object containing property name and value pairs
	 */ 
	setProperties( properties )
	{
		for (let name in properties)
		{
			if ( this.hasOwnProperty(name) )
				this[name] = properties[name];
		}
	}

	// must include, since called by containing Group
	update(deltaTime)
	{

	}

	/**
	 * Draw the label on a canvas, using the style properties specified by this object.
     * @param context - the graphics context object associated to the game canvas
	 */
    draw(context)
	{
		if ( !this.visible )
			return;

		context.font = this.fontSize + "px " + this.fontName;
		context.fillStyle = this.fontColor;
		context.textAlign = this.alignment;
		
		context.setTransform(1,0, 0,1, 0,0); 
		context.globalAlpha = 1.00;

		// shadow draw settings
		if (this.drawShadow)
		{
			context.shadowColor = this.shadowColor;
			context.shadowBlur = this.shadowSize;
		}

		// draw filled in text (multiple times to increase drop shadow intensity)
		context.fillText( this.text, this.x, this.y );
		context.fillText( this.text, this.x, this.y );

		// disable shadowBlur, otherwise all sprites drawn later will have shadows
		context.shadowBlur = 0;
		// draw filled text again, to fill over interior shadow blur
		context.fillText( this.text, this.x, this.y );

		// draw border last, so not hidden by filled text
		if (this.drawBorder)
		{
			context.strokeStyle = this.borderColor;
			context.lineWidth = this.borderSize;
			context.strokeText( this.text, this.x, this.y );
		}		
	}

}

export { Label };