class Texture
{
	constructor(filename)
	{
		// creates an <img> tag, does not add it to webpage
		this.image  = new Image();
		this.width  = null;
		this.height = null;

		let self = this;

		// this code automatically runs after image data loaded
		this.image.onload = function()
		{
			self.width  = self.image.width;
			self.height = self.image.height;
			console.log("Image loaded, size: ", self.width, self.height);
		}
		this.image.src = filename;
	}





}

