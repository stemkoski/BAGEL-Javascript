class Physics
{
	constructor(accValue, maxSpeed, decValue)
	{
		this.positionVector = new Vector2();
		this.velocityVector = new Vector2();
		this.accelerationVector = new Vector2();
		this.accelerationValue = accValue;
		this.maximumSpeed = maxSpeed;
		this.decelerationValue = decValue;
	}

	getSpeed()
	{
		return this.velocityVector.getLength();
	}

	setSpeed(speed)
	{
		this.velocityVector.setLength(speed);
	}

	getMotionAngle()
	{
		return this.velocityVector.getAngle();
	}

	setMotionAngle(angle)
	{
		this.velocityVector.setAngle(angle);
	}

	accelerateAtAngle(angleDegrees)
	{
		let v = new Vector2();
		v.setLength(this.accelerationValue);
		v.setAngle(angleDegrees);
		this.accelerationVector.addVector(v);
	}

	// do the physics; dt = delta time = how much time has passed
	update(dt)
	{
		// apply acceleration to velocity
		this.velocityVector.addValues(
			this.accelerationVector.x * dt,
			this.accelerationVector.y * dt );

		let speed = this.getSpeed();

		// decrease speed (decelerate) when not accelerating
		if ( this.accelerationVector.getLength() == 0 )
			speed -= this.decelerationValue * dt;

		// keep speed within min/max bounds
		if (speed < 0)
			speed = 0;
		if (speed > this.maximumSpeed)
			speed = this.maximumSpeed;

		// update speed
		this.setSpeed(speed);

		// apply velocity to position
		this.positionVector.addValues(
			this.velocityVector.x * dt,
			this.velocityVector.y * dt );

		// reset acceleration
		this.accelerationVector.setValues(0, 0);
	}
}