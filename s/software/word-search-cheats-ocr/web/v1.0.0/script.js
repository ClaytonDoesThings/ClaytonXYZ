function preload () {
  courier = loadFont('/s/software/word-search-cheats-ocr/web/v1.0.0/courier.ttf');
}

function setup () {
	createCanvas(400, 400);
	sourceImg = loadImage(sourceImg, (loadedImage) => {
		let w = loadedImage.width;
		let h = loadedImage.height;
		sourceImgC = createGraphics(w, h);
	});
}

function draw () {
	background(255*0.75);
	if (scene === 0) {
		sourceImgCF();
		if (sourceImgC !== undefined) {
			let w = sourceImgC.width;
			let h = sourceImgC.height;
			let t = w/h > 1;
			let s = t ? height/w : width/h;
			w = w*s;
			h = h*s;
			image(sourceImgC, 0, 0, w, h);
			ellipse(mouseX, mouseY, 5);
			if (mouseDragging) {
				rectMode(CORNERS);
				noFill();
				rect(sMouseX, sMouseY, eMouseX, eMouseY);
				lastMouseDragging = true;
			} else if (lastMouseDragging && !(sMouseX === eMouseX || sMouseY === eMouseY)) {
				console.log(mouseDragging, sMouseX, sMouseY, eMouseX, eMouseY);
				let x1 = Math.floor(sourceImgC.width*(sMouseX/w));
				let y1 = Math.floor(sourceImgC.height*(sMouseY/h));
				let x2 = Math.floor(sourceImgC.width*(eMouseX/w));
				let y2 = Math.floor(sourceImgC.height*(eMouseY/h));
				if (x1 > x2) {
					let _x1 = x1;
					x1 = x2;
					x2 = _x1;
				}
				if (y1 > y2) {
					let _y1 = y1;
					y1 = y2;
					y2 = _y1;
				}
				console.log(x1, y1, x2-x1, y2-y1);
				sourceImg = sourceImgC.get(x1, y1, x2-x1, y2-y1);
				let iW = sourceImg.width;
				let iH = sourceImg.height;
				sourceImgC = createGraphics(iW, iH);
				lastMouseDragging = false;
			} else {
				lastMouseDragging = false;
			}
		}
	} else if (scene === 2) {
		lSum = 0;
		lMax = 0;
		for (let i = 0; i < recongnizedText.length; i++) {
			lSum += recongnizedText[i].length;
			if (recongnizedText[i].length > lMax) {
				lMax = recongnizedText[i].length;
			}
		}
		lAvg = Math.floor(lSum/recongnizedText.length);
		let s = 400/(lMax > recongnizedText.length/(4/5) ? lMax : recongnizedText.length/(4/5));
		textFont(courier, s/(3/5));
		fill(0);
		textAlign(LEFT, TOP);
		for (let i = 0; i < recongnizedText.length; i++) {
			let t = recongnizedText[i]
			if (t.length === lAvg) {
				fill(255*0.2, 255, 255*0.2);
			} else {
				fill(255, 255*0.2, 255*0.2);
			}
			rectMode(CORNER);
			rect(0, i*s/(4/5), t.length*s, s/(4/5));
			fill(0);
			text(t, 0, i*s/(4/5));
			if (i === cursorY) {
				fill(0);
				rect(cursorX*s+s, cursorY*s/(4/5), s/5, s/(4/5));
			}
		}
	} else if (scene === 3) {
		textFont(courier, _S/(3/5));
		fill(0);
		textAlign(LEFT, TOP);
		text(word, 0, 0);
		let maxLength = word.length;
		for (let i = 0; i < words.length; i++) {
			text(words[i].word, 0, (i+2)*_S/(4/5));
			if (maxLength < words[i].word.length) {
				maxLength = words[i].word.length;
			}
		}
		_S = 400/(maxLength > (words.length+2)/(4/5) ? maxLength : (words.length+2)/(4/5));
	} else if (scene === 4) {
		textFont(courier, _S/(3/5));
		fill(0);
		textAlign(LEFT, TOP);
		for (let i = 0; i < results.length; i++) {
			let positions = "";
			var maxLength = 0;
			for (let j = 0; j < results[i].positions.length; j++) {
				let p = results[i].positions[j];
				positions += (
					" " +
					p[0][0] +
					"," +
					p[0][1] +
					"-" +
					p[1][0] +
					"," +
					p[1][1] +
					" " +
					((
						p[2] === 0 ||
						p[2] === 1 ||
						p[2] === 7) ?
						"up-" : ""
					) +
					((
						p[2] === 3 ||
						p[2] === 4 ||
						p[2] === 5) ?
						"down-" : ""
					) +
					((
						p[2] === 1 ||
						p[2] === 2 ||
						p[2] === 3) ?
						"left" : ""
					) +
					((
						p[2] === 5 ||
						p[2] === 6 ||
						p[2] === 7) ?
						"right" : ""
					)
				);
			}
			let reP = (results[i].word + positions);
			text(reP, 0, i*_S/(4/5));
			if (reP.length > maxLength) {
				maxLength = reP.length;
			}
		}
		_S = 400/(maxLength > results.length/(4/5) ? maxLength/(4/6) : results.length/(4/5));
	} else if (scene === 5) {
		sourceImgCF();
		let w = sourceImgC.width;
		let h = sourceImgC.height;
		let t = w/h > 1;
		let s = t ? height/w : width/h;
		w = w*s;
		h = h*s;
		image(sourceImgC, 0, 0, w, h);
	}
}

function sourceImgCF () {
	if (sourceImgC !== undefined) {
		sourceImgC.background(255);
		sourceImgC.image(sourceImg, 0, 0);
		if (scene === 5) {
			let w = sourceImgC.width;
			let h = sourceImgC.height;
			let cW = w/ws[0].length;
			let cH = h/ws.length;
			for (let i = 0; i < results.length; i++) {
				if (colors[i] === undefined) {
					colors[i] = [Math.random()*256, Math.random()*256, Math.random()*256];
				}
				c = colors[i];
				for (let j = 0; j < results[i].positions.length; j++) {
					let pos = results[i].positions[j];
					let sPos = pos[0];
					console.log(sPos[0]*cW);
					let ePos = pos[1];
					sourceImgC.stroke(c[0], [1], c[2], 255*0.375);
					sourceImgC.strokeWeight((cW+cH)/2*0.9);
					sourceImgC.line(sPos[0]*cW+cW/2, sPos[1]*cH+cH/2, ePos[0]*cW+cW/2, ePos[1]*cH+cH/2);
				}
			}
		}
	}
}

function updateEMouse () {
	if (
		mouseX < width &&
		mouseX > 0 &&
		mouseY < height &&
		mouseY > 0
	) {
		eMouseX = mouseX;
		eMouseY = mouseY;
	}
}

function mousePressed () {
	if (sourceImgC !== undefined) {
		if (
			mouseX < width &&
			mouseX > 0 &&
			mouseY < height &&
			mouseY > 0
		) {
			sMouseX = mouseX;
			sMouseY = mouseY;
			updateEMouse();
			mouseDragging = true;
		}
	}
	if (scene === 2) {
		//document.focus();
	}
}

function mouseDragged () {
	if (mouseDragging) {
		updateEMouse();
		return false;
	}
}

function mouseReleased () {
	if (mouseDragging) {
		updateEMouse();
		mouseDragging = false;
	}
}

function keyPressed () {
	let t = recongnizedText;
	if (scene === 2) {
		if (keyCode === 38) {
			if (t[cursorY-1] !== undefined) {
				cursorY--;
				if (!t[cursorY].length > 0) {
					cursorX = -1;
				} else if (!t[cursorY][cursorX] && !cursorX === -1) {
					cursorX = t[cursorY].length-1;
				}
				return;
			}
		} else if (keyCode === 37) {
			if (t[cursorY][cursorX]) {
				cursorX--;
			} else if (cursorX === -1 && cursorY > 0) {
				cursorY--;
				cursorX = t[cursorY].length-1;
			}
			return;
		} else if (keyCode === 40) {
			if (t[cursorY+1] !== undefined) {
				cursorY++;
				if (!t[cursorY].length > 0) {
					cursorX = -1;
				} else if (!t[cursorY][cursorX] && !cursorX === -1) {
					cursorX = t[cursorY].length-1;
				}
			}
			return;
		} else if (keyCode === 39) {
			if (t[cursorY][cursorX+1]) {
				cursorX++;
			} else if (cursorX === t[cursorY].length-1 && cursorY < t.length-1) {
				cursorY++;
				cursorX = -1;
			}
			return;
		} else if (keyCode === 8) {
			if (cursorX !== -1 || cursorY === 0) {
				let s = t[cursorY];
				t[cursorY] = s.substr(0, cursorX) + s.substr(cursorX+1, s.length);
				if (t[cursorY][cursorX-1]) {
					cursorX--;
				}
			} else {
				let length = t[cursorY].length;
				t[cursorY-1] += t[cursorY];
				t.splice(cursorY, 1);
				cursorY--;
				cursorX = t[cursorY].length-1-length;
			}
		} else if (keyCode === 13) {
			if (t[cursorY].length > 0 && t[cursorY].length-1 === cursorY) {
				t.splice(cursorY+1, 0, []);
			} else {
				t.splice(cursorY+1, 0, t[cursorY].substr(cursorX+1));
				t[cursorY] = t[cursorY].substr(0, cursorX+1);
			}
			cursorY++;
			cursorX = -1;
		} else if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
			let s = t[cursorY];
			t[cursorY] = s.substr(0, cursorX+1) + (keyCode === 32 ? " " : keyboardMap[keyCode-65]) + s.substr(cursorX+1);
			if (t[cursorY][cursorX+1]) {
				cursorX++;
			}
		} else if (keyCode === 9) {
			var eL = true;
			for (let i = 1; i < t.length && eL; i++) {
				if (!(t[i].length === t[0].length)) {
					eL = false;
				}
			}
			if (eL) {
				for (let i = 0; i < t.length; i++) {
					ws.push(t[i].split(''));
				}
				console.log(ws);
				scene = 3;
			}
		}
	} else if (scene === 3) {
		if (keyCode >= 65 && keyCode <= 90) {
			word += keyboardMap[keyCode-65];
		} else if (keyCode === 8) {
			if (word.length > 0) {
				word = word.substr(0, word.length-1);
			}
		} else if (keyCode === 13) {
			if (word.length > 0) {
				words.push({word: word});
				word = "";
			}
			return;
		} else if (keyCode === 9) {
			if (words.length > 0) {
				results = findWords(ws, words);
				console.log(results);
				scene = 4;
			}
		}
	} else if (scene === 4) {
		if (keyCode === 9) {
			scene = 5;
		}
	}
}