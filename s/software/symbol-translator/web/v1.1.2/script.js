function preload() {
	let fontsToLoad = {
		Wingdings: "Wingdings-Repaired.ttf",
		AlienText: "AlientextV2-Regular-fixed.ttf",
		BirbText: "TenretniOlleh.ttf",
		OldBirbText: "Birbtext20-Regular.ttf"
	};

	for (let i in fontsToLoad) {
		fonts[i] = loadFont('/s/software/symbol-translator/web/v1.1.2/fonts/' + fontsToLoad[i]);
	}
}

function charInFont(font, chr) {
	if (typeof(font) !== 'string') {
		let unicode = unchar(chr);
		let glyphs = font.font.glyphs.glyphs;
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
	let tFElem = document.getElementById("targetFont")
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
}

function updateTargetFont() {
	targetFont = fonts[document.getElementById("targetFont").value];
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
					fonts[file.name.split('.')[0]] = (font);
					updateSelectOptions();
				}));
			});
			reader.readAsDataURL(file);
		} else {
			console.log("Unsupported format. Please use .ttf or .otf");
		}
	}
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
}

function windowResized() {
	s = windowWidth*0.9/bW > windowHeight*0.9/bH ? windowHeight*0.9/bH : windowWidth*0.9/bW;
	resizeCanvas(bW*s, bH*s);
}

var mClicked = false;
function mouseReleased() {
	mClicked = true;
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
		textFont(mode === "Encode" ? (charInFont(targetFont, chr) ? targetFont : baseFont) : baseFont);
		let unChr = unchar(chr);
		if (unChr >= 48 && unChr <= 57) {
			fill(7, 226, 255);
		} else if (
			unChr === 42 ||
			unChr === 43 ||
			unChr === 45 ||
			unChr === 47 ||
			unChr === 61
		) {
			fill(249, 246, 29);
		} else if (unChr >= 65 && unChr <= 90) {
			fill(224, 24, 24);
		} else {
			fill(255);
		}
		text(chr, x, y);
	}

	pop();
}

function keyPressed() {
	let k = key.toUpperCase();
	if (k.length === 1) {
		chrs += k;
	} else if (k === "BACKSPACE") {
		chrs = chrs.substr(0, chrs.length-1);
	} else if (!(
		k === "SHIFT" ||
		k === "ALT" ||
		k === "CONTROL" ||
		k === "META" ||
		k === "CONTEXTMENU" ||
		k.match("ARROW")
	)) {
		console.log("Unkown key: " + k + " typed.");
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
	textFont(baseFont);
	textSize(bH*0.0625);
	textAlign(LEFT, TOP);
	fill(255);
	let margin = bW*0.005;
	text("Mode: " + mode, -bW/2+margin, -bH/2+margin);
	pop();

	// Version Text
	push();
	noStroke();
	textFont(baseFont);
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
		let chr;
		if (i < 10) {
			fill(7, 226, 255);
			chr = char(48+i);
		} else if (i < 15) {
			fill(249, 246, 29);
			chr = (i === 10 ?
				'*' :
				(i === 11 ?
					'+' :
					(i === 12 ?
						'-' :
						(i === 13 ?
							'/' :
							'='
						)
					)
				)
			);
		} else if (i < 41) {
			fill(224, 24, 24);
			chr = char(65+i-15);
		} else {
			fill(255);
			chr = (i === 41 ?
				':' :
				(i === 42 ?
					',' :
					(i === 43 ?
						'.' :
						' '
					)
				)
			);
		}
		textFont(mode === "Encode" ? baseFont : (charInFont(targetFont, chr) ? targetFont : baseFont));
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

	pop();

	mClicked = false;
}

function button(t, x, y, w, h, tS, f) {
	push();
	textFont(baseFont);
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