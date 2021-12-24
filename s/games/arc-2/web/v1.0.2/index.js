function setup() {
  var c = createCanvas(CanvasWidth, CanvasHight);
	c.parent('sketch-holder');
  fill(0)

  player = new playerObject()
	goal = new goalObject()
  
  for (var i = 0; i < amoutOfPlatforms; i++) {
    platforms.push(new platformObject())
  }
for (var i = 0; i < amoutOfSideGoals; i++) {
    sideGoals.push(new goalObject())
		sideGoals[i].r = accentT
  }

	background(prime2R,prime2G,prime2B)
	generateLevel()
}

function draw() {
  input()
  if(state == "menu"){
    menu()
  }
  else if(state == "game"){
    game()
  }
}