var CanvasWidth = 1200
var CanvasHight = 600

//platforms
var platforms = []
var amoutOfPlatforms = 30

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
//jumping
var gravity = 8
var momentumCutoff = -1
var LateralMovemetSpeed = 5
var aerialSpeedchangeD = 0.1
var aerialSpeedchange = aerialSpeedchangeD
var jumpPower = 12
// double Jumping
var doubleJumpsTotal = 3
var doubleJumpsPower = 5
var doubleJumpsCount = 3

// level stats
var level = 0
var timerSeconds
var levelPlatNumber = amoutOfPlatforms
var MaxPlatSize
var MinPlatSize

//timer
var timerLastUpdate = 0
var CurrentTimer

//game
var state = "menu"
var highScore = 0
//gui
var developerHudActive = false
var developerHudSize = 20