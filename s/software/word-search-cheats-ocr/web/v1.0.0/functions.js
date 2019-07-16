function recongnize () {
	var progressText = document.getElementById('progressStatus');
	var progress = document.getElementById('progress');
	var resultText = document.getElementById('result');
	try {
		let job = Tesseract.recognize(sourceImgC.canvas, {
			lang: 'eng',
			tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		});
		job.progress((message) => {
			console.log('progress is: ', message);
			progressText.innerText = message.status
			progress.value = message.progress*100;
			scene = 1;
		});
		job.finally((result) => {
			console.log(result.text);
			// resultText.innerText += ("\n result: ");
			// resultText.innerText += result.text ? "\n" + result.text : "";
			let _recongnizedText = result.text;
			while (_recongnizedText.substr(-1) === "\n") {
				_recongnizedText = _recongnizedText.substr(0, _recongnizedText.length-2);
			}
			recongnizedText = _recongnizedText.split("\n");
			scene = 2;
		});
	} catch (err) {
		console.log("failed: " + err);
	}
}

function findWords(rows, terms) {
	let _results = terms;
	for (let i = 0; i < _results.length; i++) {
		_results[i].positions = [];
	}
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < rows[i].length; j++) {
			let l = rows[i][j]; // current letter
			for (let k = 0; k < terms.length; k++) {
				let t = terms[k]; // term
				let w = t.word; // current word
				if (l === w[0]) {
					let startPos = [j, i];
					let r = [];
					for (let _l = 0; _l < 8; _l++) {
						let _r = findWord(rows, w, 1, j, i, _l, startPos);
						if (_r !== undefined) {
							r.push(_r);
						}
					}
					if (r.length > 0) {
						console.log(r);
						_results[k].positions = _results[k].positions.concat(r);
					}
				}
			}
		}
	}
	return _results;
}

function findWord(rows, term, index, x, y, dir, startPos) {
	if (term.length === index) {
		return [startPos, [x, y], dir];
	}
	if (dir === 0 || dir === 1 || dir === 7) {
		y--;
	} else if (dir === 3 || dir === 4 || dir === 5) {
		y++;
	}
	if (dir === 1 || dir === 2 || dir === 3) {
		x--;
	} else if (dir === 5 || dir === 6 || dir === 7) {
		x++;
	}
	if (rows[y] !== undefined && rows[y][x] !== undefined && rows[y][x] === term[index]) {
		return findWord(rows, term, index+1, x, y, dir, startPos);
	} else {
		return undefined;
	}
}