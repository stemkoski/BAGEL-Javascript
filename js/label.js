class Label
{
	constructor(x, y)
	{
		// default text/font properties
		this.fontName = "Arial";
		this.fontSize = 16;
		this.font = this.fontSize + "px " + this.fontName;
		this.fontColor = "white";
		this.text = "Hello, World!";
		this.borderSize = 1;
		this.borderColor = "black";
		this.x = x;
		this.y = y;
	}

	setFont(fontName, fontSize)
	{
		this.fontName = fontName;
		this.fontSize = fontSize;
		this.font = this.fontSize + "px " + this.fontName;
	}

	setText(text)
	{
		this.text = text;
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