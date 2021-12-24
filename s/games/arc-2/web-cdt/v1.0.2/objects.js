function playerObject() {

	this.r = accentR
	this.g = accentG
	this.b = accentB

  this.x = 120
  this.y = 100

  this.grounded = false
	this.collisionRight = false
	this.collisionLeft = false
	this.collisionUp = false

	this.jumptime = 0
	this.coyoteTime = 0

  this.Xpull = 0
  this.Ypull = 0

	this.draw = function() {
		noStroke()
		fill(this.r,this.g,this.b)
    rect(this.x, this.y, 10, 10)
  }
//physics
  this.updatePull = function () {
	
		//falling
		if(this.Ypull <= terminalVelocity){
			this.Ypull = this.Ypull + gravity
		}

				//jumping
		
		if(jumpSpaced && this.grounded && this.Xpull == 0){
			this.Ypull = -jumpPower
			this.jumptime = maxJumpTime * 3/2
			this.coyoteTime = 0
		}
		else if(jumpSpaced && this.grounded || this.coyoteTime > 0 &&jumpSpaced){
			this.Ypull = -jumpPower
			this.jumptime = maxJumpTime
			this.coyoteTime = 0
		}
		else if(!this.grounded && this.jumptime > 0 && jumpKeyDown){
			this.Ypull = -jumpPower
			this.jumptime = this.jumptime - 1
		}
		else{
			this.jumptime = 0
		}

		//grounded
		if(this.grounded){
				this.coyoteTime = maxCoyoteTime
				//grounded
			if(rightKeyDown && leftKeyDown){
				
			}
			else if(rightKeyDown){
				this.Xpull += groundLateralAcceleration
			}
			else if(leftKeyDown){
				this.Xpull -= groundLateralAcceleration
			}
			//friction
			else if(Math.abs(this.Xpull) < roundToZero){
				this.Xpull = 0
			}
			else if(this.Xpull > 0){
				this.Xpull -= friction
			}
			else if(this.Xpull < 0){
				this.Xpull += friction
			}
		}
		
		//aerial
		if(!this.grounded){
			
			if(this.coyoteTime > 0){
					this.coyoteTime --}

			if(rightKeyDown && leftKeyDown){

			}
			else if(rightKeyDown){
				this.Xpull += airLateralAcceleration
			}
			else if(leftKeyDown){
				this.Xpull -= airLateralAcceleration
			}
		}

		//wall interaction
		if(this.collisionRight || this.collisionLeft){
			this.coyoteTime = maxCoyoteTime
			//slide
			if(this.Ypull > 0){
				this.Ypull = wallSlideSpeed
			}
			//wall jump
			if(this.collisionLeft && jumpSpaced && !this.grounded){
				this.Ypull = -jumpPower
				this.Xpull = 5
				this.jumptime = maxJumpTime
			}
			else if(this.collisionRight && jumpSpaced&& !this.grounded){
				this.Ypull = -jumpPower
				this.Xpull = -5
				this.jumptime = maxJumpTime
			}

			//Climb
			if(this.collisionLeft && leftKeyDown){
				this.Ypull = -jumpPower
			}
			else if(this.collisionRight && rightKeyDown){
				this.Ypull = -jumpPower
			}
			
		}
		//roof interaction
		if(this.collisionUp){
			if(jumpKeyDown && !rightKeyDown && !leftKeyDown){
				this.Ypull = 0
				this.Xpull = 0
			}
			else if(jumpKeyDown && rightKeyDown){
				this.Ypull = -(jumpPower + lateralRoofYmod)
				this.Xpull = lateralRoofX
				this.jumptime = maxJumpTime
			}
			else if(jumpKeyDown && leftKeyDown){
				this.Ypull = -(jumpPower + lateralRoofYmod)
				this.Xpull = -lateralRoofX
				this.jumptime = maxJumpTime
			}
		}	
	}
//Move and collide
  this.move = function () {

    //vertical
		//down
    if (this.Ypull >= 0) {
      for (U = 0; U < this.Ypull; U++) {
				if(this.grounded){
					break
				}
				else{
					this.y ++
				}
				this.testAllCollide()
      }
    }
		//up
    if (this.Ypull < 0) {
      for (U = 0; U < -this.Ypull; U++) {
				if(this.collisionUp){
					break
				}
				else{
					this.y--
				}
				this.testAllCollide()
      }
    }
		//horizontal
		if(this.Xpull > 0){
			for (U = 0; U < this.Xpull; U ++){
				if(this.collisionRight){
					this.Xpull = 0
					break
				}
				else {
					this.x ++
				}	
				this.testAllCollide()
			} 
		}
		else if(this.Xpull < 0){
			for (U = 0; U < -this.Xpull; U ++){
				if(this.collisionLeft){
					this.Xpull = 0
					break
				}
				else {
					this.x --
				}	
			this.testAllCollide()
			} 
		}
  }

  this.collideDown = function () {
    for (C = 0; C < amoutOfPlatforms; C++) {

      if (
        Math.floor(player.y) +playerSize  == Math.floor(platforms[C].y) 					&&
        Math.floor(this.x + playerSize) > Math.floor(platforms[C].x) 							&&
        Math.floor(this.x) < platforms[C].x + Math.floor(platforms[C].width) 			&&
				platforms[C].active

      ) {
        return true
      }
    }
    return false
  }
	
	this.collideUp = function () {
    for (C = 0; C < amoutOfPlatforms; C++) {
      if (
        Math.floor(player.y) == Math.floor(platforms[C].y + platforms[C].hight)		&&
        Math.floor(this.x + playerSize) > Math.floor(platforms[C].x) 							&&
        Math.floor(this.x) < platforms[C].x + Math.floor(platforms[C].width) 			&&
				platforms[C].active

      ) {
				return true
      }
    }
    return false
  }

	this.collideRight = function(){
		for (C = 0; C < amoutOfPlatforms; C++) {

      if (
        this.x + playerSize == platforms[C].x &&
				this.y + playerSize > platforms[C].y &&
				this.y < platforms[C].y + platforms[C].hight &&
				platforms[C].active
      ) {
        return true
      }
		}
		return false
	}

	this.collideLeft = function(){
		for (C = 0; C < amoutOfPlatforms; C++) {

      if (
        this.x == platforms[C].x  + platforms[C].width && 
				this.y + 10 > platforms[C].y  &&
				this.y < platforms[C].y + platforms[C].hight &&
				platforms[C].active
      ) {
        return true
      }
		}
		return false
	}

	this.testAllCollide = function(){
		if(this.collideDown()){
			this.grounded = true
		}
		else{
			this.grounded = false
		}
		
		if(this.collideUp()){
			this.collisionUp = true
		}

		else{
			this.collisionUp = false
		}

		if(this.collideLeft()){
			this.collisionLeft = true
		}

		else{
			this.collisionLeft = false
		}

		if(this.collideRight()){
			this.collisionRight = true
		}
		else{
			this.collisionRight = false
		}
	}
}

function platformObject() {
  this.x = 100
  this.y = 300
  this.width = 100
  this.hight = 100

	this.r = prime1R
	this.g = prime1G
	this.b = prime1B

  this.active = true

  this.draw = function () {
    if (this.active) {
			noStroke()
			fill(this.r,this.g,this.b)
      rect(this.x, this.y, this.width, this.hight)
    }
  }
}

function goalObject(){
	this.x = -100
	this.y = -100
	this.size = 140

	this.r = accentR
	this.g = accentG
	this.b = accentB
	this.t = 255

	this.active = true


	this.draw = function(){
		fill(this.r,this.g,this.b,this.t)
		rect(this.x, this.y, this.size, this.size);
	}
	this.testPlayerC = function(){
		if(player.x + playerSize/2 > this.x &&
		player.x + playerSize/2 < this.x + this.size &&
		player.y + playerSize/2 > this.y &&
		player.y + playerSize/2 < this.y + this.size &&
		this.active){
		
			return(true)
		}
		else{
			return(false)
		}
	}
}