function randomFloatRange(min, max)
{
	return (Math.random() * (max - min + 1) + min);
}

// Blatantly stolen from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) 
{
  return Math.floor(Math.random() * Math.floor(max));
}