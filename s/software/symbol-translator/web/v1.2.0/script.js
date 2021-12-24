function preload() {
	let fontsToLoad = {
		Wingdings: {
			fileName: "/s/software/symbol-translator/web/v1.2.0/fonts/Wingdings-Repaired.ttf",
			keyboardLayouts: {
				abc: keyboardLayouts.abc,
				qwerty: keyboardLayouts.qwerty
			}
		},
		AlienText: {
			fileName: "/s/software/symbol-translator/web/v1.2.0/fonts/AlientextV2-Regular-fixed.ttf",
			keyboardLayouts: {
				abc: keyboardLayouts.abc,
				qwerty: keyboardLayouts.qwerty
			}
		},
		BirbText: {
			fileName: "/s/software/symbol-translator/web/v1.2.0/fonts/TenretniOlleh.ttf",
			keyboardLayouts: {
				abc: keyboardLayouts.abc,
				qwerty: keyboardLayouts.qwerty
			}
		},
		OldBirbText: {
			fileName: "/s/software/symbol-translator/web/v1.2.0/fonts/Birbtext20-Regular.ttf",
			keyboardLayouts: {
				abc: keyboardLayouts.abc,
				qwerty: keyboardLayouts.qwerty
			}
		}
	};

	for (let i in fontsToLoad) {
		fonts[i] = {
			font: loadFont(fontsToLoad[i].fileName),
			keyboardLayouts: fontsToLoad[i].keyboardLayouts,
		};
	}
}

function charInFont(font, chr) {
	if (typeof(font.font) !== 'string') {
		let unicode = unchar(chr);
		let glyphs = font.font.font.glyphs.glyphs;
		for (let i in glyphs) {
			if (glyphs[i].unicode === unicode) {
				return true;
			}
		}
	} else {
		return true;
	}
	return false;
}

function updateSelectOptions() {
	let bFElem = document.getElementById("baseFont");
	let tFElem = document.getElementById("targetFont");
	let tempBFV = bFElem.value;
	let tempTFV = tFElem.value;

	var options = "";
	for (i in fonts) {
		options += '<option value\"' + i + '\">' + i + '</option>'
	}
	bFElem.innerHTML = options;
	tFElem.innerHTML = options;
	bFElem.value = tempBFV;
	tFElem.value = tempTFV;
}

function updateBaseFont() {
	baseFont = fonts[document.getElementById("baseFont").value];
	updateBaseFontLayoutOptions();
}

function updateTargetFont() {
	targetFont = fonts[document.getElementById("targetFont").value];
	updateTargetFontLayoutOptions();
}

function uploadFont() {
	let files = document.getElementById("fontUpload").files;
	if (files.length > 0) {
		let file = files[0];
		let ext = file.name.split('.').pop();
		if (ext === "ttf" || ext === "otf") {
			var reader = new FileReader();
			reader.onload = ((evt) => {
				loadFont(evt.target.result, ((font) => {
					fonts[file.name.split('.')[0]] = {
						font: font,
						keyboardLayouts: fonts["Arial"].keyboardLayouts
					};
					updateSelectOptions();
				}));
			});
			reader.readAsDataURL(file);
		} else {
			console.log("Unsupported format. Please use .ttf or .otf");
		}
	}
}


function uploadKeyboardLayout() {
	let files = document.getElementById("layoutUpload").files;
	if (files.length > 0) {
		let file = files[0];
		var reader = new FileReader();
		reader.onload= ((evt) => {
			let result = evt.target.result;
			if (result.length === 45) {
				for (let i in fonts) {
					fonts[i].keyboardLayouts[file.name.split('.')[0]] = result;
				}
				updateBaseFontLayoutOptions();
				updateTargetFontLayoutOptions();
			} else {
				console.log("Custom keyboard layout must be 45 characters long");
			}
		});
		reader.readAsText(file);
	}
}
function updateBaseFontLayoutOptions() {
	let bFLElem = document.getElementById("baseFontLayout");
	let tempBFLV = bFLElem.value;

	var layouts = Object.keys(baseFont.keyboardLayouts);
	var options = "";
	for (i in baseFont.keyboardLayouts) {
		options += '<option value\"' + i + '\">' + i + '</option>'
	}
	bFLElem.innerHTML = options;
	if (layouts.indexOf(Object.keys(baseFont.keyboardLayouts).find(key => baseFont.keyboardLayouts[key] === encodeLayout)) === -1) {
		encodeLayout = baseFont.keyboardLayouts[Object.keys(baseFont.keyboardLayouts)[0]];
	}
}

function updateTargetFontLayoutOptions() {
	let tFLElem = document.getElementById("targetFontLayout");
	let tempBFLV = tFLElem.value;

	var layouts = Object.keys(targetFont.keyboardLayouts);
	var options = "";
	for (i in targetFont.keyboardLayouts) {
		options += '<option value\"' + i + '\">' + i + '</option>'
	}
	tFLElem.innerHTML = options;
	if (layouts.indexOf(Object.keys(targetFont.keyboardLayouts).find(key => targetFont.keyboardLayouts[key] === decodeLayout)) === -1) {
		decodeLayout = targetFont.keyboardLayouts[Object.keys(targetFont.keyboardLayouts)[0]];
	}
}

function updateBaseFontLayout() {
	encodeLayout = baseFont.keyboardLayouts[document.getElementById("baseFontLayout").value];
}

function updateTargetFontLayout() {
	decodeLayout = targetFont.keyboardLayouts[document.getElementById("targetFontLayout").value];
}

function setup() {
	s = windowWidth*0.9/bW > windowHeight*0.9/bH ? windowHeight*0.9/bH : windowWidth*0.9/bW;
	var c = createCanvas(bW*s, bH*s);
	c.parent('sketch-holder');
	baseFont = fonts.Arial;
	targetFont = fonts.BirbText;
	updateSelectOptions();
	document.getElementById("baseFont").value = "Arial";
	document.getElementById("targetFont").value = "BirbText";
	updateBaseFontLayoutOptions();
	updateTargetFontLayoutOptions();
}

function windowResized() {
	s = windowWidth*0.9/bW > windowHeight*0.9/bH ? windowHeight*0.9/bH : windowWidth*0.9/bW;
	resizeCanvas(bW*s, bH*s);
}

var mClicked = false;
function mouseReleased() {
	mClicked = true;
}

function getCharacterColor(chr) {
	let unChr = unchar(chr);
	if (unChr >= 48 && unChr <= 57) {
		return ([7, 226, 255]);
	} else if (
		unChr === 42 ||
		unChr === 43 ||
		unChr === 45 ||
		unChr === 47 ||
		unChr === 61
	) {
		return ([249, 246, 29]);
	} else if ((unChr >= 97 && unChr <=122) || (unChr >= 65 && unChr <= 90)) {
		return ([224, 24, 24]);
	} else {
		return 255;
	}
}

function drawText() {
	push();
	stroke(255);
	fill(0);
	rectMode(CENTER);
	rect(0, -bH*0.15, bW*0.8, bH*0.5, bW*0.01);

	let chrsPerRow = 20;
	let spacing = (bW*0.8-bW*0.01*2)/20;
	let sX = -spacing*(chrsPerRow/2-0.5);
	let sY = -bH*0.15-bH*0.5/2+spacing/2;
	textSize(spacing*0.9);
	textAlign(CENTER, CENTER);
	fill(255);
	noStroke();
	let txt = chrs + (Math.floor(millis()/750)%2 === 1 ? "_" : "");
	for (let i in txt) {
		let x = sX+spacing*(i-chrsPerRow*Math.floor(i/chrsPerRow));
		let y = sY+spacing*Math.floor(i/chrsPerRow);
		let chr = txt[i];
		textFont((mode === "Encode" ? (charInFont(targetFont, chr) ? targetFont : baseFont) : baseFont).font);
		fill(getCharacterColor(chr));
		text(chr, x, y);
	}

	pop();
}

function keyPressed() {
	if (key === "Shift") {
		capitalize = true;
	} else {
		let k = capitalize ? key.toUpperCase() : key.toLowerCase();
		if (k.length === 1) {
			chrs += k;
		} else if (key === "Backspace") {
			chrs = chrs.substr(0, chrs.length-1);
		} else if (!(
			key === "Alt" ||
			key === "Control" ||
			key === "Meta" ||
			key === "Contextmenu" ||
			key.match("Arrow")
		)) {
			console.log("Unkown key: " + key + " typed.");
		}
	}
}

function keyReleased() {
	if (key === "Shift") {
		capitalize = false;
	}
}

function draw() {
	background(0);

	push();
	translate(width/2, height/2);
	scale(s);

	// Mode Text
	push();
	noStroke();
	textFont(baseFont.font);
	textSize(bH*0.0625);
	textAlign(LEFT, TOP);
	fill(255);
	let margin = bW*0.005;
	text("Mode: " + mode, -bW/2+margin, -bH/2+margin);
	pop();

	// Version Text
	push();
	noStroke();
	textFont(baseFont.font);
	textSize(bH*0.0375);
	textAlign(RIGHT, TOP);
	fill(255);
	text("Version: " + version, bW/2-margin, -bH/2+margin);
	pop();

	// Text
	drawText();

	//Keyboard
	push();
	let spacing = bW*0.8/15;
	let size = spacing*0.9;
	let startingX = -spacing*7;
	let startingY = bH*0.2;

	rectMode(CENTER);
	fill(122, 0, 0);
	stroke(255);
	fill(0);
	for (let i = 0; i < 45; i++) {
		let x = startingX+(i-15*Math.floor(i/15))*spacing;
		let y = startingY+(spacing*Math.floor(i/15));
		rect(x, y, size, size, size*0.1);

		push();
		let layout = (mode === "Encode" ? encodeLayout : decodeLayout);
		let chr = capitalize ? layout[i].toUpperCase() : layout[i].toLowerCase();
		fill(getCharacterColor(chr));
		textFont((mode === "Encode" ? baseFont : (charInFont(targetFont, chr) ? targetFont : baseFont)).font);
		noStroke();
		textAlign(CENTER, CENTER);
		textSize(size*0.75);
		text(chr, x, y+size*0.05);
		pop();

		let absX = x*s+width/2;
		let absY = y*s+height/2;
		
		if (
			mouseY >= absY-size/2*s &&
			mouseY <= absY+size/2*s &&
			mouseX >= absX-size/2*s &&
			mouseX <= absX+size/2*s
		) {
			push();
			noStroke();
			fill(0, 0, 0, (mouseIsPressed ? 255*0.75 : 255*0.375));
			rect(x, y, size, size);
			if (mClicked) {
				chrs += chr;
			}
			pop();
		}
	}
	pop();

	//Switch Mode
	button(
		(mode === "Encode" ? "Decode" : "Encode"),
		-bW/2+spacing*((1.125+0.75)/2),
		startingY,
		size*1.75,
		size,
		size*0.5,
		function () {mode = (mode === "Encode" ? "Decode" : "Encode");}
	);

	//Clear
	button(
		"Clear",
		-bW/2+spacing*((1.125+0.75)/2),
		startingY+spacing,
		size*1.75,
		size,
		size*0.5,
		function () {chrs = "";}
	);

	//Bcksp
	button(
		"Bcksp",
		-bW/2+spacing*((1.125+0.75)/2),
		startingY+spacing*2,
		size*1.75,
		size,
		size*0.5,
		function () {chrs = chrs.substr(0, chrs.length-1);}
	);

	//Copy
	button(
		"Copy",
		bW/2-spacing*((1.125+0.75)/2),
		startingY,
		size*1.75,
		size,
		size*0.5,
		function () {prompt("Copy:", chrs);}
	)

	//Paste
	button(
		"Paste",
		bW/2-spacing*((1.125+0.75)/2),
		startingY+spacing,
		size*1.75,
		size,
		size*0.5,
		function () {chrs = prompt("Paste:");}
	)

	//Shift
	button(
		capitalize ? "SHIFT" : "Shift",
		bW/2-spacing*((1.125+0.75)/2),
		startingY+spacing*2,
		size*1.75,
		size,
		size*0.5,
		function () {capitalize = !capitalize;}
	);

	pop();

	mClicked = false;
}

function button(t, x, y, w, h, tS, f) {
	push();
	textFont(baseFont.font);
	rectMode(CENTER);
	fill(122, 0, 0);
	stroke(255);
	fill(0);
	rect(x, y, w, h, h*0.1);

	fill(255);
	noStroke();
	textAlign(CENTER, CENTER);
	textSize(tS);
	text(t, x, y+tS*0.1);

	let absX = x*s+width/2;
	let absY = y*s+height/2;
	
	if (
		mouseY >= absY-h/2*s &&
		mouseY <= absY+h/2*s &&
		mouseX >= absX-w/2*s &&
		mouseX <= absX+w/2*s
	) {
		push();
		noStroke();
		fill(0, 0, 0, (mouseIsPressed ? 255*0.75 : 255*0.375));
		rect(x, y, w, h);
		if (mClicked) {
			f();
		}
		pop();
	}
	pop();
}