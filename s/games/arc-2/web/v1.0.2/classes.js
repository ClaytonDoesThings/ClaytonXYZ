function menu(){
	background(prime2R,prime2G,prime2B,10)
	fill(accentR,accentG,accentB)
	
	textAlign(CENTER,CENTER)
	
	
	//stationary	
	stroke(accentR,accentG,accentB)
	strokeWeight(5)
	line(
		CanvasWidth *0.2, CanvasHight * 0.8,
		CanvasWidth *0.8, CanvasHight * 0.2);
	noStroke()
	textSize(20)
	textStyle(NORMAL)
	textAlign(LEFT)
	text("1.0.2",30,30)
	text("A + D TO START",30,CanvasHight - 30)
	textAlign(RIGHT)
	text("CONTROLS:  J, A, D", CanvasWidth -30,CanvasHight - 30)
	
	
	textSize(40)
	textAlign(RIGHT)
	text("SCORE:  ",CanvasWidth * 0.7,CanvasHight*0.7)
	text("HIGH SCORE:  ",CanvasWidth * 0.7,CanvasHight*0.85)
	
	textSize(80)
	textAlign(LEFT)
	text(score,CanvasWidth * 0.7,CanvasHight*0.7)
	textStyle(BOLD)
	text(highScore,CanvasWidth * 0.7,CanvasHight*0.85)


	
	//spin
	translate(p5.Vector.fromAngle(millis() / -1000, 40))
	
	textAlign(CENTER)
	textStyle(NORMAL)
	textSize(100)
	text("ARC",CanvasWidth* 0.25,CanvasHight*0.3)
	textStyle(BOLD)
	textSize(150)
	text("2",CanvasWidth * 0.40,CanvasHight*0.3)

	textSize(30)
	text("HAYDEN SHUKER",CanvasWidth * 0.30,CanvasHight*0.43)

	
	if(leftSpaced && rightSpaced){
		state = "game"
		reset()
	}
}

function game() {

	background(prime2R,prime2G,prime2B,5)

  CurrentTimer = timerSeconds * 1000 - (millis() - timerLastUpdate) 

	archTwo()

  player.move()
  player.updatePull()
	player.draw()
 
 for (var i = 0; i < amoutOfPlatforms; i++) {
    platforms[i].draw()
  }
 
  hud()

  
}

	function reset(){
		timerLastUpdate = millis()
		score = 0
		clearCount = 0
		player.x = 100
		player.y = CanvasHight - 100
		player.Xpull = 0
		player.Ypull = 0
		background(prime2R,prime2G,prime2B)
		fill(0)
		rect(-10,10,CanvasWidth +10,CanvasHight +10)
		generateLevel()
	}

function archTwo(){

	if(CurrentTimer <= 0){
		this.state = "menu"
	}
	for(p = 0; p < amoutOfSideGoals; p ++){
		if(sideGoals[p].testPlayerC()){
			sideGoals[p].active = false
			score += sideGoalValue
		}
		else if(sideGoals[p].active){
			sideGoals[p].draw()
		}
	}
	goal.draw()

	if(score > highScore){
		highScore = score
	}

	if(goal.testPlayerC()){
		levelPass()
		score += clearValue
	}

	function levelPass(){
		clearCount ++
		generateLevel()
		
		background(prime2R,prime2G,prime2B)
		fill(0)
		rect(-10,10,CanvasWidth +10,CanvasHight +10)
	}
}


function generateLevel() {
	goal.x = floor(random(0, CanvasWidth -goal.size))
 	goal.y = floor(random(0, CanvasHight -goal.size - groundGoalGap))

	for(p = 0; p < amoutOfSideGoals; p ++){
		sideGoals[p].active = true
		sideGoals[p].x = floor(random(0, CanvasWidth -sideGoals[p].size))
		sideGoals[p].y = floor(random(0, CanvasHight -sideGoals[p].size))
	}

	for (C = 0; C < amoutOfPlatforms; C++) {
		randomizePlat(C)
		if(
			Math.abs(platforms[C].x + platforms[C].width/2 - player.x) < lGPgap ||
			Math.abs(platforms[C].y+ platforms[C].hight/2 - player.y) < lGPgap ||
			Math.abs(platforms[C].x + platforms[C].width/2 - goal.x - goal.size/2) < lGPgap ||
			Math.abs(platforms[C].y + platforms[C].hight/2 - goal.y - goal.size/2) < lGPgap
			){
			platforms[C].active = false
		}
	}
	
	function randomizePlat(Z){
		platforms[Z].active = true
    platforms[Z].x = floor(random(0 - platforms[Z].width/2, CanvasWidth - platforms[Z].width/2))
    platforms[Z].y = floor(random(0 - platforms[Z].hight/2, CanvasHight - platforms[Z].hight/2))
	}

//top
  platforms[0].x = 0
  platforms[0].y = 0
  platforms[0].width = CanvasWidth
	platforms[0].hight = 35
  platforms[0].active = true
//bottom
	platforms[1].x = 0
  platforms[1].y = CanvasHight - border
  platforms[1].width = CanvasWidth
	platforms[1].hight = border
  platforms[1].active = true
//left
	platforms[2].x = 0
  platforms[2].y = 0
  platforms[2].width = border
	platforms[2].hight = CanvasHight
  platforms[2].active = true
//right
	platforms[3].x = CanvasWidth - border
  platforms[3].y = 0
  platforms[3].width = border
	platforms[3].hight = CanvasHight
  platforms[3].active = true
}

function input() {

  //left
  if (keyIsDown(65)) {
    leftKeyDown = true
  }
  else {
    leftKeyDown = false
    leftGap = true
  }

  if (leftGap && leftKeyDown) {
    leftSpaced = true
    leftGap = false
  }
  else {
    leftSpaced = false
  }

  //right
  if (keyIsDown(68)) {
    rightKeyDown = true
  }
  else {
    rightKeyDown = false
    rightGap = true
  }

  if (rightGap && rightKeyDown) {
    rightSpaced = true
    rightGap = false
  }
  else {
    rightSpaced = false
  }

  //down
  if (keyIsDown(83)) {
    downKeyDown = true
  }
  else {
    downKeyDown = false
    downGap = true
  }

  if (downGap && downKeyDown) {
    downSpaced = true
    downGap = false
  }
  else {
    downSpaced = false
  }

  //jump
  if (keyIsDown(74) || keyIsDown(87)) {
    jumpKeyDown = true
  }
  else {
    jumpKeyDown = false
    jumpGap = true
  }

  if (jumpGap && jumpKeyDown) {
    jumpSpaced = true
    jumpGap = false
  }
  else {
    jumpSpaced = false
  }

  //option
  if (keyIsDown(49)) {
    optionKeyDown = true
  }
  else {
    optionKeyDown = false
    optionGap = true
  }

  if (optionGap && optionKeyDown) {
    optionSpaced = true
    optionGap = false
  }
  else {
    optionSpaced = false
  }
}

function hud() {

  standardHud()
  developerHud()

  function standardHud(){
    fill(accentR,accentG,accentB)
		textStyle(BOLD)
		textAlign(CENTER,BASELINE)
    textSize(20)

		textAlign(RIGHT)
		text("TIME:  ", 100, 25)
		text("CLEAR:  ", 300, 25)
		text("SCORE:  ", 500, 25)
		textAlign(LEFT)
    
		text(Math.round((CurrentTimer / 1000)), 100, 25)
		text(clearCount, 300, 25)
		text(score, 500, 25)
  }
  function developerHud(){
    if(developerHudActive){
      textSize(15)
      textAlign(LEFT)
      text("X pull: " + Math.floor(player.Xpull), 200, 40)
      text("Y pull: " + player.Ypull, 200, 60)
      text("Ctime: " + player.coyoteTime, 200, 80)
			text("right: " + player.collisionRight, 200, 100)
			text("left: " + player.collisionLeft, 200, 120)
			text("GCP: " + goal.playerCollision, 200, 140)
			text("X: " + player.x, 200, 160)
      text("Y: " + player.y, 200, 180)
    }
  }
}