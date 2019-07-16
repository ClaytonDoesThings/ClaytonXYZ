var CanvasWidth = 1200
var CanvasHight = 600

//platforms
var platforms = []
var amoutOfPlatforms = 60
var border = 5

//score
var score = 0
var clearValue = 100
var sideGoalValue = 50
var highScore = 0

// level stats
var clearCount = 0
var timerSeconds = 120
var levelPlatNumber = amoutOfPlatforms

//goals
var sideGoals = []
var amoutOfSideGoals = 2
var lGPgap = 60
var groundGoalGap = 100


//Player
var playerSize = 10

var maxLateralSpeed = 10
	//air
var terminalVelocity = 10
var jumpPower = 7
var maxJumpTime = 10
var maxCoyoteTime = 5
var airLateralAcceleration = 0.2
var gravity = 0.8
	//ground
var groundLateralAcceleration = 0.6
var friction = 0.2
var roundToZero = 2
	//wall
var wallSlideSpeed = 0.8
var wallJumpX = 7
	//roof
var lateralRoofX = 1
var lateralRoofYmod = 0

//timer
var timerLastUpdate = 0
var CurrentTimer = 0

//game
var state = "menu"

//gui
var developerHudActive = false
var developerHudSize = 20

//color
var prime2R = 20
var prime2G = 0
var prime2B = 80

var prime1R = 0
var prime1G = 50
var prime1B = 150

var accentR = 255 
var accentG = 0
var accentB = 255
var accentT = 150

//Controls
var jumpGap = false
var jumpSpaced = false
var jumpKeyDown = false

var upGap = false
var upSpaced = false
var upKeyDown = false

var downGap = false
var downSpaced = false
var downKeyDown = false

var rightGap = false
var rightSpaced = false
var rightKeyDown = false

var leftGap = false
var leftSpaced = false
var leftKeyDown = false

var optionGap = false
var optionSpaced = false
var optionKeyDown = false
