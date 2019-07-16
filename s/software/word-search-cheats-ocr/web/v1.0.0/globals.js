var courier;

var scene = 0;

var sourceImg = "/s/software/word-search-cheats-ocr/web/v1.0.0/ws2.jpg";
var sourceImgC;

var mouseDragging = false;
var lastMouseDragging = false;
var sMouseX = 0;
var sMouseY = 0;
var eMouseX = 0;
var eMouseY = 0;


var recongnizedText = [];
var cursorX = 0;
var cursorY = 0;

var ws = [];


var word = "WORD";
var words = [];


var results;

var _S = 0;
var colors = [];

var keyboardMap = [
	"A", // [65]
  "B", // [66]
  "C", // [67]
  "D", // [68]
  "E", // [69]
  "F", // [70]
  "G", // [71]
  "H", // [72]
  "I", // [73]
  "J", // [74]
  "K", // [75]
  "L", // [76]
  "M", // [77]
  "N", // [78]
  "O", // [79]
  "P", // [80]
  "Q", // [81]
  "R", // [82]
  "S", // [83]
  "T", // [84]
  "U", // [85]
  "V", // [86]
  "W", // [87]
  "X", // [88]
  "Y", // [89]
  "Z", // [90]
]