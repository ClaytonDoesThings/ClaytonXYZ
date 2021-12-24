window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent('sketch-holder');
}

function windowResized() {
	console.log("resizing", windowWidth);
	resizeCanvas(windowWidth, windowHeight);
}

var Board = [];

for (var i = 0; i < 24; i++) {
	var line = [];
	for (var j = 0; j < 10; j++) {
		line.push(new boardBlock(false, [0, 0, 0]));
	}
	Board.push(line);
}

var Tetromino = new tetromino(Math.floor(Math.random()*7), 0, 0);

function keyPressed () {
	if (keyCode === UP_ARROW) {
		Tetromino.rotate(Board);
	} else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
		Tetromino.keyCycle = Tetromino.keyInterval;
	}
	return false;
}

function draw() {
	currentClock = millis();
	clock = currentClock-lastClock;
	background(225);
	push();
		var s = height > width*(gridHeight/gridWidth) ? width/gridWidth*0.8 : height/gridHeight*0.8;
		translate((width-s*gridWidth)/2, 0);
			fill(0);
			textAlign(CENTER, BOTTOM);
			textSize(32);
			text("Score: " + score, 0, 0, s*gridWidth, (height-s*gridHeight)/2);
			translate(0, (height-s*gridHeight)/2);
			fill(200);
			rect(0, 0, s*gridWidth, s*gridHeight);
			for (var i = 0; i < Board.length; i++) {
				for (var j = 0; j < Board[i].length; j++) {
					if (Board[i][j].filled) {
						push();
							translate(j*s, i*s);
								fill (Board[i][j].color[0], Board[i][j].color[1], Board[i][j].color[2]);
								stroke(128);
								rect(0, 0, s, s);
						pop();
					}
				}
			}
			Tetromino.draw(s, clock, Board);
			if (Tetromino.placed) {
				Tetromino = new tetromino(Math.floor(Math.random()*7), 0, 0);
			}
			var lineCount = 0;
			for (var i = 0; i < Board.length; i++) {
				var lineComplete = true;
				for (var j = 0; j < Board[i].length; j++) {
					if (!Board[i][j].filled) {
						lineComplete = false;
						break;
					}
				}
				if (lineComplete) {
					lineCount++;
					for (var j = i-1; j > 0; j--) {
						for (var k = 0; k < Board[j].length; k++) {
							Board[j+1][k] = Board[j][k];
						}
					}
				}
			}
			if (lineCount === 4) {
				if (lastTetris) {
					score += 1200
				} else {
					score += 800;
					lastTetris = true;
				}
			} else if (lineCount > 0) {
				score += lineCount*100;
				lastTetris = false;
			}
	pop();
	lastClock = currentClock;
}