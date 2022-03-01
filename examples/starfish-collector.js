import * as BAGEL from "../bagel/index.js";

//=========================================================

class StarfishGame extends BAGEL.Game
{
	initialize()
	{
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
		title.setSize(500,200);
		title.setPosition(400,250);
		this.addSpriteToGroup(title);		

		let start = new BAGEL.Sprite();
		start.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/start.png") );
		start.setSize(400,60);
		start.setPosition(400,450);
		this.addSpriteToGroup(start);		
	}

	update()
	{
		if ( this.game.input.keyPressed("S") )
			this.game.setScreen("level");
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
		  new BAGEL.Texture("assets/starfish-collector/turtle-down.png") );
  		this.turtle.setSize(64,64);
 		this.turtle.setPosition(400, 50);
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

  		this.win = new BAGEL.Sprite();
		this.win.setTexture(
		  new BAGEL.Texture("assets/starfish-collector/win.png") );
 		this.win.setPosition(400, 300);
 		this.win.setVisible(false);
 		this.addSpriteToGroup(this.win);

	}

	update(deltaTime)
	{
		let speed = 100; // pixels per second
		let distance = speed * deltaTime;

		// move turtle
		if ( this.game.input.keyPressing("ArrowLeft") )
			this.turtle.moveBy(-distance, 0);
		if ( this.game.input.keyPressing("ArrowRight") )
			this.turtle.moveBy(distance, 0);
		if ( this.game.input.keyPressing("ArrowUp") )
			this.turtle.moveBy(0, -distance);
		if ( this.game.input.keyPressing("ArrowDown") )
			this.turtle.moveBy(0, distance);

		for ( let starfish of this.getGroupSpriteList("starfish") )
		{
			if ( this.turtle.overlaps(starfish) )
				starfish.destroy();
		}

		if ( this.getGroupSpriteCount("starfish") == 0 && !this.win.visible)
			this.win.setVisible(true);
	}
}

//=========================================================

let game = new StarfishGame();
game.start();

//=========================================================
