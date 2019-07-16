function playerObject() {

  this.x = 100
  this.y = 100
  this.XS = 10
  this.YS = 10

  this.grounded = false

  this.Xpull = 0
  this.Ypull = 0

  this.display = function () {
    rect(this.x, this.y, this.XS, this.YS)
  }

  this.updatePull = function () {
    //gravity sequence
    if (this.Ypull < momentumCutoff) {
      this.Ypull = this.Ypull * (1 - aerialSpeedchange)
    }

    else if (this.Ypull > momentumCutoff && this.Ypull < 0) {
      this.Ypull = -momentumCutoff
    }

    else if (
      this.Ypull >= -momentumCutoff && this.Ypull < gravity) {
      this.Ypull = this.Ypull * (1 + aerialSpeedchange)
    }

    else {
      this.Ypull = gravity + downKeyDown * 10
    }
    //jump
    if (jumpSpaced && this.grounded) {
      this.Ypull = -jumpPower
    }
    //double jump
    else if (jumpSpaced && !this.grounded && doubleJumpsCount > 0) {
      this.Ypull = -doubleJumpsPower
      doubleJumpsCount = doubleJumpsCount - 1
    }
    //lateral movement
    if (!leftKeyDown && !rightKeyDown) {
      this.Xpull = 0
    }
    if (leftKeyDown) {
      this.Xpull = -LateralMovemetSpeed
    }
    if (rightKeyDown) {
      this.Xpull = LateralMovemetSpeed
    }
    //fastfalling
    if (downKeyDown && !this.grounded) {
      aerialSpeedchange = 1
    }

    else {
      aerialSpeedchange = aerialSpeedchangeD
    }
  }

  this.move = function () {

    //down
    if (this.Ypull > 0) {
      for (U = 0; U < this.Ypull; U++) {
        if (this.collideDown()) {
          this.grounded = true
          break
        }
        else {
          this.y++
          this.grounded = false
        }
      }
    }
    if (this.Ypull < 0) {
      for (C = 0; C < Math.abs(this.Ypull); C++) {
        this.y--
        this.grounded = false
      }
    }

    //sideways movement
    for (C = 0; C < Math.abs(this.Xpull); C++) {
      if (this.Xpull < 0) {
        this.x--
      }
      else {
        this.x++
      }
    }
  }

  this.collideDown = function () {
    for (C = 0; C < amoutOfPlatforms; C++) {

      if (
        player.y == platforms[C].y - this.YS &&
        this.x + this.XS >= platforms[C].x &&
        this.x <= platforms[C].x + platforms[C].width &&
        platforms[C].active
      ) {
        return true
      }
    }
    return false
  }
}

function platformObject() {
  this.x = 100
  this.y = 300
  this.width = 100
  this.hight = 5

  this.active = true

  this.draw = function () {
    if (this.active) {
      rect(this.x, this.y, this.width, this.hight)
    }
  }
}