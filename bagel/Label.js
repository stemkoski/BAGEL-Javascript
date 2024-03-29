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

		this.position = new BAGEL.Vector();
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

		// extra graphics options
		this.visible = true;
		this.opacity = 1.00;

		this.lineHeight = 1.5;

		// list of Actions: functions applied to object over time
		this.actionList = [];
	}

    /**
     * Set the location of this label.
     * @param {number} x - the x coordinate of the text, corresponding to the location specified by the "alignment" parameter
     * @param {number} x - the y coordinate of the baseline of the text
     * @param {string} alignment - one of: "left", "center", "right"; determines what location of the text that the x coordinate refers to 
     */	
	setPosition(x,y, alignment="left")
	{
		this.position.setValues(x, y);
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

	/**
     * Change this sprite's position by the given amounts.
     * @param {number} dx - value to add to the position x coordinate
     * @param {number} dy - value to add to the position y coordinate
     */
	moveBy(dx, dy)
	{
		this.position.addValues(dx, dy);
	}	

	/**
     * Change the opacity when drawing, 
     *   enabling objects underneath to be partially visible
     *   by blending their colors with the colors of this object.
     * <br>
     * 0 = fully transparent (appears invisible);  1 = fully opaque (appears solid) 
     * @param {number} opacity - opacity of this object
     */
    setOpacity(opacity)
	{
		this.opacity = opacity;
	}

	/**
     * Set whether this sprite should be visible or not;
     *  determines whether sprite will be drawn on canvas.
     * @param {boolean} visible - determines if this sprite is visible or not
     */
    setVisible(visible)
	{
		this.visible = visible;
	}

	/**
	 * Remove this sprite from the group that contains it.
	 */
	destroy()
	{
		this.parentGroup.removeSprite(this);
	}


	/**
	 * Add an {@link Action} to this object: a special function that
	 *  will be automatically applied over time until it is complete.
	 * <br>
	 * Most common actions can be created with the static methods in the
	 * {@link ActionFactory} class.
	 * <br>
	 * All actions added to this object are performed in parallel, unless
	 *  enclosed by a {@link ActionFactory#sequence|Sequence} action.
	 * @param {Action} action - an action to be applied to this object
	 */
	addAction(action)
	{
		this.actionList.push(action);
	}

	/**
	 *  Process any {@link Action|Actions} that have been added to this Label.
     *  @param {number} deltaTime - time elapsed since previous frame
	 */
	update(deltaTime)
	{
		// Update all actions (in parallel, by default).
        // Using a copy of the list to avoid skipping the next action in the list
        //  when the previous action is removed.
		let actionListCopy = this.actionList.slice();
		for (let action of actionListCopy)
		{
			let finished = action.apply(this, deltaTime);
			if (finished)
			{
				let index = this.actionList.indexOf(action);
				if (index > -1)
					this.actionList.splice(index, 1);
			}
		}
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
		context.globalAlpha = this.opacity;

		// shadow draw settings
		if (this.drawShadow)
		{
			context.shadowColor = this.shadowColor;
			context.shadowBlur = this.shadowSize;
		}

		// add support for multiline text (line breaks indicated by "\n")
		let textArray  = this.text.split("\n");
		let lineSkip = this.fontSize * this.lineHeight;

		// draw filled in text (multiple times to increase drop shadow intensity)
		for (let i = 0; i < textArray.length; i++)
		{
			context.fillText( textArray[i], this.position.x, this.position.y + i * lineSkip);
			context.fillText( textArray[i], this.position.x, this.position.y + i * lineSkip);
		}

		// disable shadowBlur, otherwise all sprites drawn later will have shadows
		context.shadowBlur = 0;
		// draw filled text again, to fill over interior shadow blur, that may be a different color
		for (let i = 0; i < textArray.length; i++)
		{
			context.fillText( textArray[i], this.position.x, this.position.y + i * lineSkip);
		}

		// draw border last, so not hidden by filled text
		if (this.drawBorder)
		{
			context.strokeStyle = this.borderColor;
			context.lineWidth = this.borderSize;
			for (let i = 0; i < textArray.length; i++)
			{
				context.strokeText( textArray[i], this.position.x, this.position.y + i * lineSkip);
			}
		}		
	}

}

export { Label };