class Label
{
	constructor(x, y)
	{
		// Default Text/Font Properties
		// Each of the below properties are present within a setter below the constructor. 
		this.fontName = "Arial";
		this.fontSize = 16;
		this.font = this.fontSize + "px " + this.fontName;
		this.fontColor = "white";
		this.text = "Hello, World!";
		this.borderSize = 1;
		this.borderColor = "black";

		// Set this.x and this.y using the values provided from the constructor parameters.
		this.x = x;
		this.y = y;
	}

	setFont(fontName, fontSize, fontColor)
	{
		this.fontName = fontName;
		this.fontSize = fontSize;
		this.font = this.fontSize + "px " + this.fontName;
		this.fontColor = fontColor;
	}

	setText(text)
	{
		this.text = text;
	}

	setBorder(borderSize, borderColor)
	{
		this.borderSize = borderSize; 
		this.borderColor = borderColor;
	}

	update()
	{

	}
	
	render(context)
	{
		context.font = this.font;
		context.fillStyle = this.fontColor;
		context.strokeStyle = this.borderColor;
		context.lineWidth = this.borderSize;

		context.setTransform(1,0, 0,1, 0,0);
		context.fillText( this.text, this.x, this.y );
		context.strokeText( this.text, this.x, this.y );
	}


}