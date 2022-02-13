import * as BAGEL from "./index.js";

/**
 *  The Physics class performs position-velocity-acceleration {@link Vector} related calculations
 *   for more advanced {@link Sprite} movement. 
 *  <br/>
 *  For example, can set speed and motion angle of a sprite with constant velocity (no deceleration),
 *   or player character can accelerate at an angle and automatically decelerate at a fixed rate.
 *  <br/>
 *  Similar to the {@link Rectangle} class design, 
 *   the Physics position Vector can be set to reference the position of a {@link Sprite},
 *   which keeps them synchronized.
 *  <br/>
 *  A Physics object needs to be updated once per frame; for Sprites, this is handled by
 *   their {@link Sprite#update|update} method.
 */
class Physics
{
	/**
	 * Initialize position, velocity, and acceleration vectors,
	 *   and set acceleration, maximum speed, and deceleration values.
	 * @param {number} accValue - default magnitude of acceleration when using {@link Physics#accelerateAtAngle|accelerateAtAngle}
	 * @param {number} maxSpeed - maximum speed: if speed is ever above this amount, it will be reduced to this amount
	 * @param {number} decValue - when not accelerating, object will decelerate (decrease speed) by this amount
	 * @constructor
	 */
	constructor(accValue, maxSpeed, decValue)
	{
		this.positionVector     = new BAGEL.Vector(0,0);
		this.velocityVector     = new BAGEL.Vector(0,0);
		this.accelerationVector = new BAGEL.Vector(0,0);
		this.accelerationValue = accValue
		this.maximumSpeed      = maxSpeed;
		this.decelerationValue = decValue;
	}

    
    /**
     * Get the current speed of this object (pixels/second).
     * @return {number} current speed
     */	
	getSpeed() 
	{ 
		return this.velocityVector.getLength(); 
	}

    /**
     * Set the speed (pixels/second) for this object (without changing the current angle of motion).
     * @param {number} speed - the new speed
     */
	setSpeed(speed) 
	{ 
		this.velocityVector.setLength(speed); 
	}
	
    /**
     * Get the current angle of motion (in degrees) of this object.
     * <br/>
     * (The angle is measured from the positive x-axis, 
     * and angles increase in clockwise direction, since positive y-axis is down.)
     * @return {number} current angle of motion
     */	
	getMotionAngle()
	{
		return this.velocityVector.getAngle();
	}
	
    /**
     * Set the angle of motion (in degrees) for this object (without changing the current speed).
     * <br/>
     * (The angle is measured from the positive x-axis, 
     * and angles increase in clockwise direction, since positive y-axis is down.)
     * @param {number} angleDegrees - the new angle of motion
     */
    setMotionAngle(angleDegrees)
	{
		this.velocityVector.setAngle(angleDegrees);
	}
		
	/**
     * Accelerate this object in the given direction.
     * <br/>
     * (Uses the constant acceleration value specified in constructor.)
     * @param {number} angleDegrees - the direction of acceleration
     */
	accelerateAtAngle(angleDegrees)
	{
		let v = new BAGEL.Vector();
		v.setLength(this.accelerationValue);
		v.setAngle(angleDegrees);
		this.accelerationVector.addVector( v );
	}

	/**
	 *  Update the values for position, velocity, and acceleration vectors.
	 *  <br/>
	 *  This method should be called once per frame (automatically handled for {@link Sprite} objects). 
	 */
	update(deltaTime)
	{
		// apply acceleration to velocity
        this.velocityVector.addValues( 
			this.accelerationVector.x * deltaTime, 
			this.accelerationVector.y * deltaTime );

        let speed = this.getSpeed();

        // decrease speed (decelerate) when not accelerating
        if (this.accelerationVector.getLength() < 0.001)
            speed -= this.decelerationValue * deltaTime;

        // keep speed within set bounds
		if (speed < 0)
			speed = 0;
		if (speed > this.maximumSpeed)
			speed = this.maximumSpeed;

        // update velocity
        this.setSpeed(speed);

        // apply velocity to position
        this.positionVector.addValues( 
			this.velocityVector.x * deltaTime, 
			this.velocityVector.y * deltaTime );

        // reset acceleration
        this.accelerationVector.setValues(0,0);
    }

}

export { Physics };