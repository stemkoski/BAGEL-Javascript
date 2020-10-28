class Vector2
{

	constructor(x=0, y=0)
	{
		this.x = x;
		this.y = y;
	}

	setValues(x, y)
	{
		this.x = x;
		this.y = y;
	}

	addValues(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}

	addVector(other)
	{
		this.x += other.x;
		this.y += other.y;
	}

	getLength()
	{
		// x^2 + y^2 = distance^2
		return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
	}

	// convert to degrees
	getAngle()
	{
		if (this.getLength() == 0)
			return 0; 
		else
			return Math.atan2(this.y, this.x) * 180/Math.PI;
	}

	setLength(length)
	{
		let angleDegrees = this.getAngle();
		let angleRadians = angleDegrees * Math.PI/180;
		this.x = length * Math.cos(angleRadians);
		this.y = length * Math.sin(angleRadians);
	}

	setAngle(angleDegrees)
	{
		let length = this.getLength();
		let angleRadians = angleDegrees * Math.PI/180;
		this.x = length * Math.cos(angleRadians);
		this.y = length * Math.sin(angleRadians);
	}

}