const version = "1.2.0";

const bW = 16*30;
const bH = 9*30;
var s;

var keyboardLayouts = {
	abc: `0123456789*+-/=abcdefghijklmnopqrstuvwxyz:,. `,
	qwerty: `0123456789*+-/=qwertyuiopasdfghjklzxcvbnm:,. `
}

var fonts = {
	Arial: {
		font: 'Arial',
		keyboardLayouts: {
			abc: keyboardLayouts.abc,
			qwerty: keyboardLayouts.qwerty
		}
	}
};

var capitalize = false;


var encodeLayout = keyboardLayouts.abc;
var decodeLayout = keyboardLayouts.abc;

var mode = "Decode";

var chrs = "";

var baseFont;
var targetFont;