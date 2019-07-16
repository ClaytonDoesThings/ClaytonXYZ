var createPixelArray = function(sizeX, sizeY) {
	let pixels = {};
	for (let i = 0; i < sizeX; i++) {
		pixels[i.toString()] = {};
		for (let j = 0; j < sizeY; j++) {
			pixels[i.toString()][j.toString()] = 0;
		}
	}
	return pixels;
}

var shape = function (sizeX, sizeY) {
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.pixels = createPixelArray(sizeX, sizeY);
	//console.log(this.pixels);
	this.draw = function () {
		pixelsKeys = Object.keys(primaryShape.pixels);
		for (let i = 0; i < pixelsKeys.length; i++) {
			columnKeys = Object.keys(primaryShape.pixels[i]);
			for (let j = 0; j < columnKeys.length; j++) {
				let pixel = primaryShape.pixels[i.toString()][j.toString()];
				push();
				//console.log(pixel);
				if (pixel === 1) {
					translate(primaryShape.sizeX*pixelSizeA, 0);
				} else if (pixel === 2) {
					translate(primaryShape.sizeX*pixelSizeA, primaryShape.sizeY*pixelSizeA);
				} else if (pixel === 3) {
					translate(0, primaryShape.sizeY*pixelSizeA);
				} else if (pixel === 4) {
					translate(-primaryShape.sizeX*pixelSizeA, primaryShape.sizeY*pixelSizeA);
				} else if (pixel === 5) {
					translate(-primaryShape.sizeX*pixelSizeA, 0);
				} else if (pixel === 6) {
					translate(-primaryShape.sizeX*pixelSizeA, -primaryShape.sizeY*pixelSizeA);
				} else if (pixel === 7) {
					translate(0, -primaryShape.sizeY*pixelSizeA);
				} else if (pixel === 8) {
					translate(primaryShape.sizeX*pixelSizeA, -primaryShape.sizeY*pixelSizeA);
				}
				rect(
					i*pixelSizeA,
					j*pixelSizeA,
					pixelSize,
					pixelSize
				);
				pop();
			}
		}
	};
	this.resize = function (sizeX, sizeY) {
		if (sizeX > 0 && sizeY > 0) {
			this.sizeX = sizeX;
			this.sizeY = sizeY
			this.pixels = createPixelArray(sizeX, sizeY);
		}
	}
}