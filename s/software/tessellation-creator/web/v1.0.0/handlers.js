function onSizeXChange () {
	primaryShape.resize(document.getElementById("sizeX").value, primaryShape.sizeY);
}

function onSizeYChange () {
	primaryShape.resize(primaryShape.sizeX, document.getElementById("sizeY").value);
}

function onBoxVisibleChange () {
	boxVisible = document.getElementById("boxVisible").checked;
}

function onPixelSizeChange () {
	if (document.getElementById("pixelSize").value > 2) {
		pixelSize = document.getElementById("pixelSize").value;
		onPixelSizeAChange();
	}
}

function onPixelSizeAChange () {
	pixelSizeA = pixelSize*(document.getElementById("pixelSizeA").value/100);
}

function handleColorChange () {
	for (let i = 0; i < 4; i++) {
		colors[i][0] = document.getElementById("color" + (i+1).toString() + "R").value;
		colors[i][1] = document.getElementById("color" + (i+1).toString() + "G").value;
		colors[i][2] = document.getElementById("color" + (i+1).toString() + "B").value;
	}
}