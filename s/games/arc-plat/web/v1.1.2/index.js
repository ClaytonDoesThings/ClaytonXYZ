function setup() {
  createCanvas(CanvasWidth, CanvasHight);
  fill(0)

  player = new playerObject()
  
  for (var i = 0; i < amoutOfPlatforms; i++) {
    platforms.push(new platformObject())
  }
}

function draw() {
  background(230)
  
  input()
  
  if(state == "menu"){
    menu()
  }
  else if(state == "game"){
    game()
  }
}