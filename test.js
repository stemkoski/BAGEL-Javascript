import * as BAGEL from "./bagel/index.js";


let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let turtle = null;

async function initialize()
{
  let turtleTex = new BAGEL.Texture();
  await turtleTex.load("images/turtle.png");

  turtle = new BAGEL.Sprite();
  turtle.setTexture(turtleTex);
  turtle.setSize(64,64);
  turtle.setPosition(32,32);

}

function update()
{
  context.fillStyle = "#337";
  context.fillRect(0,0, 512,512);
  
  turtle.draw(context);
}

function loop()
{
	requestAnimationFrame(loop);
	update();
}

async function main()
{
	await initialize();
	loop();
}

main();
