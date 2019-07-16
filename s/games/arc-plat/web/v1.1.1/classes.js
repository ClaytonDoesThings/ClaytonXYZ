function menu() {
  textAlign(CENTER)
  textSize(100)
  text("ARC PLAT", CanvasWidth / 2, CanvasHight / 2 - 100)
  textSize(30)
  text("HAYDEN SHUKER", CanvasWidth / 2, CanvasHight / 2 - 50)
  textSize(25)
  text("HIGH SCORE:", CanvasWidth / 2, CanvasHight / 2 + 50)
  textSize(80)
  text(highScore, CanvasWidth / 2, CanvasHight / 2 + 130)
  textSize(15)
  text("START WITH J, QUICKSTART WITH S", CanvasWidth / 2, CanvasHight / 2 + 230)
  textSize(15)
  text("v1.1.1", CanvasWidth - 30, 20)

  if (jumpSpaced) {
    level = 0
    doubleJumpsCount = doubleJumpsTotal
    state = "game"
    generateLevel()
  }
  if (downSpaced) {
    level = 10
    doubleJumpsCount = doubleJumpsTotal
    state = "game"
    generateLevel()
  }
}

function game() {

  CurrentTimer = timerSeconds * 1000 - (millis() - timerLastUpdate) 

  levelText()

  player.move()
  player.updatePull()
  player.display()
  hud()
  testSuccsess()
  testFailure()

  if(optionSpaced){
    developerHudActive = !developerHudActive
  }

  for (var i = 0; i < amoutOfPlatforms; i++) {
    platforms[i].draw()
  }

  if (level > highScore) {
    highScore = level
  }

  function testSuccsess() {
    if (player.x >= CanvasWidth) {
      level = level + 1
      if(doubleJumpsCount <  doubleJumpsTotal){
        doubleJumpsCount ++
      }
      generateLevel()
    }
  }

  function testFailure() {
    if (CurrentTimer < 0 || player.y > CanvasHight) {
      state = "menu"
    }
  }
}

function levelText() {
  fill(200)
  textAlign(CENTER)
  if (level == 0) {
    textSize(100)
    text("W,A,S,D AND J", CanvasWidth / 2, CanvasHight / 2)
  }
  if (level == 1) {
    textSize(70)
    text("JUMP IN AIR TO DOUBLE JUMP", CanvasWidth / 2, CanvasHight / 2)
  }
  if (level == 2) {
    textSize(60)
    text("DOUBLE JUMPS ARE REPLENISHED", CanvasWidth / 2, CanvasHight / 2 -50)
    text("AFTER EVERY LEVEL", CanvasWidth / 2, CanvasHight / 2 + 50)
  }
  if (level == 3) {
    textSize(100)
    text("S TO FAST FALL", CanvasWidth / 2, CanvasHight / 2)
  }
  fill(0)
}

function levelDifficultySet() {
  /*if (level >= 10) {
    levelPlatNumber = 10
    MaxPlatSize = 75
    MinPlatSize = 25
    timerSeconds = 10
  }
  else if (level >= 5) {
    levelPlatNumber = 15
    MaxPlatSize = 150
    MinPlatSize = 50
    timerSeconds = 15
  }
  else if (level >= 1) {
    levelPlatNumber = 20
    MaxPlatSize = 150
    MinPlatSize = 100
    timerSeconds = 30
  }
  else {
    levelPlatNumber = 25
    MaxPlatSize = 150
    MinPlatSize = 100
    timerSeconds = 600
  }*/
  levelPlatNumber = Math.floor(
  15 + (15 / (level / 2 + 1))
  )
  MaxPlatSize = Math.floor(
    100 + (200 / (level / 2 + 1))
    )
  MinPlatSize = Math.floor(
    25 + (100 / (level / 2 + 1))
    )
  timerSeconds = Math.floor(
    8 + (508 / ((level * 8) + 1))
    )
}

function generateLevel() {
  for (C = 0; C < amoutOfPlatforms; C++) {
    platforms[C].active = false
    platforms[C].x = floor(random(100, CanvasWidth))
    platforms[C].y = floor(random(250, CanvasHight - 10))
  }

  levelDifficultySet()

  for (C = 0; C < amoutOfPlatforms; C++) {
    platforms[C].width = random(MinPlatSize, MaxPlatSize)
  }
  //toggle plats
  for (C = 1; C < levelPlatNumber; C++) {
    platforms[C].active = true
  }

  timerLastUpdate = millis()

  platforms[0].x = -150
  platforms[0].y = CanvasHight - 30
  platforms[0].width = 400
  platforms[0].active = true
  player.x = 80
  player.y = CanvasHight - 40
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
     textAlign(LEFT)
    textSize(40)
    text(level, 50, 80)
    textSize(20)
    text(Math.round((CurrentTimer / 1000) * 100) / 100, 50, 130)
    if (doubleJumpsCount == 1) {
      text("■ □ □", 50, 170)
    }
    else if (doubleJumpsCount == 2) {
      text("■ ■ □", 50, 170)
    }
    else if (doubleJumpsCount == 3) {
      text("■ ■ ■", 50, 170)
    }
    else{
      text("□ □ □", 50, 170)
    }
    textSize(15)
    text(highScore, 120, 80)
  }
  function developerHud(){
    if(developerHudActive){
      textSize(15)
      textAlign(LEFT)
      text("X pull: " + player.Xpull, 200, 40)
      text("Y pull: " + player.Ypull, 200, 60)
      text("grounded: " + player.grounded, 200, 80)
      text("Max Platform Size: " + MaxPlatSize, 200, 100)
      text("Min Platform Size: " + MinPlatSize, 200, 120)
      text("# of Platforms: " + levelPlatNumber, 200, 140)
    }
  }
}