import * as BAGEL from "../bagel/index.js";

//=========================================================

class StarfishGame extends BAGEL.Game
{
	initialize()
	{
		this.addScreen( "title", new TitleScreen() );
		this.addScreen( "level", new LevelScreen() );
		this.setScreen( "title" );
	}
}

//=========================================================

class TitleScreen extends BAGEL.Screen 
{
	async initialize()
	{
		let titleTex = new BAGEL.Texture();
		await titleTex.load("assets/starfish-collector/title.png");
		let title = new BAGEL.Sprite();
		title.setTexture(titleTex);
		title.setPosition(400,250);
		this.addSpriteToGroup(title);		

		let startTex = new BAGEL.Texture();
		await startTex.load("assets/starfish-collector/start.png");
		let start = new BAGEL.Sprite();
		start.setTexture(startTex);
		start.setPosition(400,450);
		this.addSpriteToGroup(start);		
	}

	update()
	{
		// use gamepad axes/buttons for control, with keyboard fallback
		if ( this.game.gamepad.active )
		{
			if ( this.game.gamepad.buttonPressed("Start") )
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
	async initialize()
	{
		let waterTex = new BAGEL.Texture();
		await waterTex.load("assets/starfish-collector/water.png");
		let water = new BAGEL.Sprite();
		water.setTexture(waterTex);
		water.setPosition(400,300);
		this.addSpriteToGroup(water);

		let turtleTex = new BAGEL.Texture();
  		await turtleTex.load("assets/starfish-collector/turtle.png");
  		this.turtle = new BAGEL.Sprite();
		this.turtle.setTexture(turtleTex);
  		this.turtle.setSize(64,64);
 		this.turtle.setPosition(400, 50);
 		this.turtle.setAngle(90);
 		this.turtle.setPhysics(800, 100, 400);
 		// keep turtle bound to screen area
 		this.turtle.setBoundRectangle(800, 600);

 		this.addSpriteToGroup(this.turtle);

		let starfishTex = new BAGEL.Texture();
  		await starfishTex.load("assets/starfish-collector/starfish.png");
  		
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

		let winTex = new BAGEL.Texture();
  		await winTex.load("assets/starfish-collector/win.png");
  		this.win = new BAGEL.Sprite();
		this.win.setTexture(winTex);
 		this.win.setPosition(400, 300);
 		this.win.setVisible(false);
 		this.win.opacity = 0.80;
 		this.addSpriteToGroup(this.win);

 		this.starfishLabel = new BAGEL.Label();
 		this.starfishLabel.setText("Starfish Left: ??");
 		this.starfishLabel.setPosition(400, 590, "center");
 		this.starfishLabel.setProperties( {"fontColor": "yellow", "borderColor": "orange"} );
 		this.addSpriteToGroup(this.starfishLabel);

	}

	update()
	{
		let speed = 100; // pixels per second
		let distance = speed * this.game.clock.getDeltaTime();

		// use gamepad axes/buttons for control, with keyboard fallback
		if ( this.game.gamepad.active )
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
			let vec = this.game.gamepad.getJoystickVector(1);
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
			this.starfishLabel.setProperties( {"visible": false} );
		}
	}
}

//=========================================================

var game = new StarfishGame();
game.start();

//=========================================================
