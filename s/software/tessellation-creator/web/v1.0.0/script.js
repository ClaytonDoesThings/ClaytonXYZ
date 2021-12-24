function setup () {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent('sketch-holder');
}

function draw () {
	background(255*0.98);
	push();
	strokeWeight(1);
	for (let i = -1; i < windowWidth/pixelSizeA/primaryShape.sizeX+1; i++) {
		push();
		translate(primaryShape.sizeX*i*pixelSizeA, 0);
		for (let j = -1; j < windowHeight/pixelSizeA/primaryShape.sizeY+1; j++) {
			push();
			translate(0, primaryShape.sizeY*j*pixelSizeA);
			let iEven = (Math.abs(i%2) === 0);
			let iOdd = (Math.abs(i%2) === 1);
			let jEven = (Math.abs(j%2) === 0);
			let jOdd = (Math.abs(j%2) === 1);
			if (iEven && jEven) {
				fill(colors[0]);
			} else if (iEven && jOdd) {
				fill(colors[1]);
			} else if (iOdd && jOdd) {
				fill(colors[2]);
			} else if (iOdd && jEven) {
				fill(colors[3]);
			}
			primaryShape.draw();
			pop();
		}
		pop();
	}
	pop();
	if (boxVisible) {
		noFill();
		strokeWeight(2);
		rect(primaryShape.sizeX*pixelSizeA, primaryShape.sizeY*pixelSizeA, primaryShape.sizeX*pixelSizeA, primaryShape.sizeY*pixelSizeA);
	}
}

function mousePressed() {
	let sizeX = primaryShape.sizeX;
	let sizeY = primaryShape.sizeY;
	let pixelX = Math.floor(mouseX/(pixelSizeA))-sizeX;
	let pixelY = Math.floor(mouseY/(pixelSizeA))-sizeY;
	if (
		pixelX >= 0 &&
		pixelX < sizeX &&
		pixelY >= 0 &&
		pixelY < sizeY
	) {
		primaryShape.pixels[(pixelX).toString()][pixelY.toString()] = 0;
	} else if (
		pixelX-sizeX >= 0 &&
		pixelX-sizeX < sizeX &&
		pixelY >= 0 &&
		pixelY < sizeY
	) {
		primaryShape.pixels[(pixelX-sizeX).toString()][pixelY.toString()] = 1;
	} else if (
		pixelX-sizeX >= 0 &&
		pixelX-sizeX < sizeX &&
		pixelY-sizeY >= 0 &&
		pixelY-sizeY < sizeY
	) {
		primaryShape.pixels[(pixelX-sizeX).toString()][(pixelY-sizeY).toString()] = 2;
	} else if (
		pixelX >= 0 &&
		pixelX < sizeX &&
		pixelY-sizeY >= 0 &&
		pixelY-sizeY < sizeY
	) {
		primaryShape.pixels[pixelX.toString()][(pixelY-sizeY).toString()] = 3;
	} else if (
		pixelX+sizeX >= 0 &&
		pixelX+sizeX < sizeX &&
		pixelY-sizeY >= 0 &&
		pixelY-sizeY < sizeY
	) {
		primaryShape.pixels[(pixelX+sizeX).toString()][(pixelY-sizeY).toString()] = 4;
	} else if (
		pixelX+sizeX >= 0 &&
		pixelX+sizeX < sizeX &&
		pixelY >= 0 &&
		pixelY < sizeY
	) {
		primaryShape.pixels[(pixelX+sizeX).toString()][pixelY.toString()] = 5;
	} else if (
		pixelX+sizeX >= 0 &&
		pixelX+sizeX < sizeX &&
		pixelY+sizeY >= 0 &&
		pixelY+sizeY < sizeY
	) {
		primaryShape.pixels[(pixelX+sizeX).toString()][(pixelY+sizeY).toString()] = 6;
	} else if (
		pixelX >= 0 &&
		pixelX < sizeX &&
		pixelY+sizeY >= 0 &&
		pixelY+sizeY < sizeY
	) {
		primaryShape.pixels[pixelX.toString()][(pixelY+sizeY).toString()] = 7;
	} else if (
		pixelX-sizeX >= 0 &&
		pixelX-sizeX < sizeX &&
		pixelY+sizeY >= 0 &&
		pixelY+sizeY < sizeY
	) {
		primaryShape.pixels[(pixelX-sizeX).toString()][(pixelY+sizeY).toString()] = 8;
	}
}