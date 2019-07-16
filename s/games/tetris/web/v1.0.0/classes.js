function boardBlock (filled = false, color = [0, 0, 0]) {
	this.filled = filled;
	this.color = color;
}

function tetromino (id, posX, posY) {
	switch (id) {
		case 0:
			this.blocks = [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0]
			];
			this.color = [0, 255, 255];
			break;
		case 1:
			this.blocks = [
				[0, 0],
				[1, 0],
				[2, 0],
				[2, 1]
			];
			this.color = [0, 0, 255];
			break;
		case 2:
			this.blocks = [
				[0, 0],
				[1, 0],
				[2, 0],
				[0, 1]
			];
			this.color = [255, 165, 0];
			break;
		case 3:
			this.blocks = [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1]
			];
			this.color = [255, 255, 0];
			break;
		case 4:
			this.blocks = [
				[1, 0],
				[2, 0],
				[0, 1],
				[1, 1]
			];
			this.color = [0, 128, 0];
			break;
		case 5:
			this.blocks = [
				[0, 0],
				[1, 0],
				[2, 0],
				[1, 1]
			];
			this.color = [128, 0, 128];
			break;
		case 6:
			this.blocks = [
				[0, 0],
				[1, 0],
				[1, 1],
				[2, 1]
			];
			this.color = [255, 0, 0];
			break;
		default:
			console.log("Incorrect tetromino ID");
			return null;
			break;
	}
	this.posX = posX;
	this.posY = posY;
	this.fallCycle = 0;
	this.fallInterval = 500;
	this.keyCycle = 0;
	this.keyInterval = 100;
	this.placed = false;

	this.checkCollisions = function (blocks, posX, posY, board) {
		var colliding = false;
		blocks.forEach(block => {
			if (block[0]+posX < 0) {
				colliding = true;
			}
			if (block[0]+posX > gridWidth-1) {
				colliding = true;
			}
			if (block[1]+posY > gridHeight-1) {
				colliding = true;
			}
			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board[i].length; j++) {
					if (board[i][j].filled && block[0]+posX === j && block[1]+posY === i) {
						colliding = true;
					}
				}
			}
		});
		return colliding;
	}

	this.rotate = function (board, angle = 0) {
		var newBlocks = [];
		var lowestX = 0;
		var lowestY = 0;
		this.blocks.forEach(block => {
			if (angle === 0) {
				newBlocks.push([block[1], -block[0]]);
				if (block[1] < lowestX) {
					lowestX = block[1];
				}
				if (-block[0] < lowestY) {
					lowestY = -block[0];
				}
			} else if (angle === 1) {
				newBlocks.push([-block[0], -block[1]]);
				if (-block[0] < lowestX) {
					lowestX = -block[0];
				}
				if (-block[1] < lowestY) {
					lowestY = -block[1];
				}
			}
		});
		if (lowestX < 0 || lowestY < 0) {
			for (var i = 0; i < newBlocks.length; i++) {
				newBlocks[i][0] -= lowestX;
				newBlocks[i][1] -= lowestY; 
			}
		}
		if (!this.checkCollisions(newBlocks, this.posX, this.posY, board)) {
			this.blocks = newBlocks;
		} else if (angle ===  0) {
			this.rotate(board, 1);
		}
	}

	this.draw = function (s, clock, board) {
		this.keyCycle += clock;
		while (this.keyCycle >= this.keyInterval) {
			// Left
			if (keyIsDown(LEFT_ARROW) && !this.checkCollisions(this.blocks, this.posX-1, this.posY, board)) {
				this.posX--;
			}

			// Down
			if (keyIsDown(DOWN_ARROW)) {
				if (!this.checkCollisions(this.blocks, this.posX, this.posY+1, board)) {
					this.posY++;
				} else {
					this.blocks.forEach(block => {
						board[this.posY+block[1]][this.posX+block[0]] = new boardBlock(true, this.color);
					});
					this.placed = true;
				}
			}

			// Right
			if (keyIsDown(RIGHT_ARROW) && !this.checkCollisions(this.blocks, this.posX+1, this.posY, board)) {
				this.posX++;
			}
			this.keyCycle -= this.keyInterval;
		}
		
		this.fallCycle += clock;
		while (this.fallCycle >= this.fallInterval) {
			if (!this.checkCollisions(this.blocks, this.posX, this.posY+1, board)) {
				this.posY++;
			} else {
				this.blocks.forEach(block => {
					board[this.posY+block[1]][this.posX+block[0]] = new boardBlock(true, this.color);
				});
				this.placed = true;
			}
			this.fallCycle -= this.fallInterval;
		}

		push();
			translate(this.posX*s, this.posY*s);
				this.blocks.forEach(block => {
					push();
						translate(block[0]*s, block[1]*s);
							fill(this.color[0], this.color[1], this.color[2]);
							stroke(128);
							rect(0, 0, s, s);
					pop();
				});
		pop();
	}
}