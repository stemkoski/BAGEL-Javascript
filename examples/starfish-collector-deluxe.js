import * as BAGEL from "../bagel/index.js";

//=========================================================

class StarfishGame extends BAGEL.Game
{
	initialize()
	{
		this.setScreenFadeTransition(true, 0.25, "#000022");
		this.addScreen( "title", new TitleScreen(this) );
		this.addScreen( "level", new LevelScreen(this) );
		this.setScreen( "title" );
	}
}

//=========================================================

class TitleScreen extends BAGEL.Screen 
{
	initialize()
	{
		let title = new BAGEL.Sprite();
		title.setTexture(
    	  new BAGEL.Texture("assets/starfish-collector/title.png") );
		title.setSize(500, 200)
		title.setPosition(400, 250);
		this.addSpriteToGroup(title);		

		let start = new BAGEL.Sprite();
		start.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/start.png") );
		start.setSize(400, 60);
		start.setPosition(400, 450);
		this.addSpriteToGroup(start);		
	}

	update()
	{
		// use gamepad axes/buttons for control, with keyboard fallback
		if ( this.game.input.gamepad.active )
		{
			if ( this.game.input.gamepad.buttonPressed("Start") )
			    this.game.setScreen("level");
		}
		else
		{
		    if ( this.game.input.keyPressed("S") )
			    this.game.setScreen("level");
		}
	}
}

//=========================================================

class LevelScreen extends BAGEL.Screen
{
	initialize()
	{
		let water = new BAGEL.Sprite();
		water.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/water.png") );
		water.setSize(800,600);
		water.setPosition(400,300);
		this.addSpriteToGroup(water);

  		this.turtle = new BAGEL.Sprite();
		this.turtle.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/turtle.png") );
  		this.turtle.setSize(64,64);
 		this.turtle.setPosition(400, 50);
 		this.turtle.setAngle(90);
 		this.turtle.setPhysics(800, 100, 400);
 		// keep turtle bound to screen area
 		this.turtle.setBoundRectangle(800, 600);

 		this.addSpriteToGroup(this.turtle);

		let starfishTex = new BAGEL.Texture("assets/starfish-collector/starfish.png");
  		
  		this.createGroup("starfish");
  		let starfishCount = 100;
  		for (let i = 0; i < starfishCount; i++)
  		{
  			let starfish = new BAGEL.Sprite();
			starfish.setTexture(starfishTex);
  			starfish.setSize(32,32);
  			let x = 100 + Math.random() * 600;
  			let y = 200 + Math.random() * 300;
 			starfish.setPosition(x, y);
 			this.addSpriteToGroup(starfish, "starfish");
 		}

 		// create a new group so that fish are drawn above stars
 		this.createGroup("fish");

 		let fishAnim = new BAGEL.Animation(
 		  "assets/starfish-collector/fish.png", 8, 1, 0.10, true);
 		this.fish = new BAGEL.Sprite();
		this.fish.setAnimation(fishAnim);
		this.fish.setSize(80,45);
 		this.fish.setPosition(400, 300);
 		this.fish.setSize(48, 24);
 		this.fish.setPhysics(0,100,0);
 		
 		this.fish.physics.setSpeed(150);
 		this.fish.physics.setMotionAngle(40);
 		this.fish.setAngle(40);
 		this.fish.setWrapRectangle(800,600);

 		this.addSpriteToGroup(this.fish, "fish");

 		this.createGroup("UI");

		this.win = new BAGEL.Sprite();
		this.win.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/win.png") );
 		this.win.setSize(420,90);
 		this.win.setPosition(400, 300);
 		this.win.setVisible(false);
 		this.win.opacity = 0.80;
 		this.addSpriteToGroup(this.win, "UI");

 		this.starfishLabel = new BAGEL.Label();
 		this.starfishLabel.setText("Starfish Left: ??");
 		this.starfishLabel.setPosition(400, 590, "center");
 		this.starfishLabel.setProperties( {
 			"fontColor": "yellow", "borderColor": "orange"} );
 		this.addSpriteToGroup(this.starfishLabel, "UI");

	}

	update()
	{
		let speed = 100; // pixels per second
		let distance = speed * this.game.clock.getDeltaTime();

		// use gamepad axes/buttons for control, with keyboard fallback
		if ( this.game.input.gamepad.active )
		{
			/*
			// use directional pad to move turtle
			if ( this.game.gamepad.buttonPressing("Left") )
				this.turtle.moveBy(-distance, 0);
			if ( this.game.gamepad.buttonPressing("Right") )
				this.turtle.moveBy(distance, 0);
			if ( this.game.gamepad.buttonPressing("Up") )
				this.turtle.moveBy(0, -distance);
			if ( this.game.gamepad.buttonPressing("Down") )
				this.turtle.moveBy(0, distance);
			*/

			/*
			// use joystick 1 to move turtle
			let dx = this.game.gamepad.getAxisValue("Axis1X");
			let dy = this.game.gamepad.getAxisValue("Axis1Y");
			this.turtle.moveBy(distance * dx, distance * dy);
			*/

			/*
			// use joystick 1 to move and rotate turtle
			let vec = this.game.gamepad.getJoystickVector(1);
			this.turtle.moveBy(distance * vec.x, distance * vec.y);
			// only rotate turtle when actually moving (not while stopped)
			if ( vec.getLength() > 0.1 )
				this.turtle.setAngle( vec.getAngle() );
			*/

			// physics-based movement
			let vec = this.game.input.gamepad.getJoystickVector(1);
			if ( vec.getLength() > 0.01 )
				this.turtle.physics.accelerateAtAngle( vec.getAngle() );

		}
		else
		{
			/*
			// pre-physics movement code
			if ( this.game.input.keyPressing("ArrowLeft") )
				this.turtle.moveBy(-distance, 0);
			if ( this.game.input.keyPressing("ArrowRight") )
				this.turtle.moveBy(distance, 0);
			if ( this.game.input.keyPressing("ArrowUp") )
				this.turtle.moveBy(0, -distance);
			if ( this.game.input.keyPressing("ArrowDown") )
				this.turtle.moveBy(0, distance);
			*/

			// physics-based movement
			if ( this.game.input.keyPressing("ArrowLeft") )
				this.turtle.physics.accelerateAtAngle(180);
			if ( this.game.input.keyPressing("ArrowRight") )
				this.turtle.physics.accelerateAtAngle(0);
			if ( this.game.input.keyPressing("ArrowUp") )
				this.turtle.physics.accelerateAtAngle(270);
			if ( this.game.input.keyPressing("ArrowDown") )
				this.turtle.physics.accelerateAtAngle(90);
		}

		// rotate turtle to face direction of movement
		if ( this.turtle.physics.getSpeed() > 0.01 )
			this.turtle.setAngle( this.turtle.physics.getMotionAngle() );

		for ( let starfish of this.getGroupSpriteList("starfish") )
		{
			if ( this.turtle.overlaps(starfish) )
				starfish.destroy();
		}

		let count = this.getGroupSpriteCount("starfish");
		this.starfishLabel.setText( "Starfish Left: " + count );
		if ( count == 0 && !this.win.visible)
		{
			this.win.setVisible(true);
			// this.starfishLabel.setProperties( {"visible": false} );
		}

		// exit back to title screen
		if ( this.game.input.keyPressed("X") )
		{
		   this.game.setScreen("title");
		}

	}
}

//=========================================================

var game = new StarfishGame();
game.start();

//=========================================================
