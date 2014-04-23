var fs = require('fs');
var jsesc = require('jsesc');
var regenerate = require('regenerate');

var unicodeVersions = [
	'3.0.0',
	'5.1.0',
	'6.3.0'
];

var writeJSON = function(fileName, object) {
	var json = jsesc(object, {
		'compact': false,
		'json': true
	});
	fs.writeFileSync(fileName, json + '\n');
};

// Shorthand function
var getData = function(version, what) {
	return require('unicode-' + version + '/' + what + '/code-points');
};

var generateES5Data = function(version) { // ES 3 or ES 5.1

	// Shorthand function
	var get = getData.bind(null, version);

	var Lu = get('categories/Lu');
	var Ll = get('categories/Ll');
	var Lt = get('categories/Lt');
	var Lm = get('categories/Lm');
	var Lo = get('categories/Lo');
	var Nl = get('categories/Nl');
	var Mn = get('categories/Mn');
	var Mc = get('categories/Mc');
	var Nd = get('categories/Nd');
	var Pc = get('categories/Pc');

	// http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
	var identifierStart = regenerate('$', '_')
		.add(Lu, Ll, Lt, Lm, Lo, Nl)
		.removeRange(0x010000, 0x10FFFF); // remove astral symbols
	var identifierPartOnly = regenerate()
		.add('\u200C', '\u200D', Mn, Mc, Nd, Pc)
		.removeRange(0x010000, 0x10FFFF); // remove astral symbols

	return {
		'start': identifierStart.toArray(),
		'part': identifierPartOnly.toArray()
	};

};

// Unicode v3.0.0 lacks the `Pattern_Syntax` and `White_Space` properties, but
// luckily it’s supposed to be the same data as in later Unicode versions. See
// <http://www.unicode.org/reports/tr31/#Stability>:
// “The `Pattern_Syntax` characters and `Pattern_White_Space` characters are
// immutable and will not change over successive versions of Unicode.”
var latest = unicodeVersions[unicodeVersions.length - 1];
var Pattern_Syntax = getData(latest, 'properties/Pattern_Syntax');
var Pattern_White_Space = getData(latest, 'properties/Pattern_White_Space');

var generateES6Data = function(version) { // ES 6

	var get = getData.bind(null, version);

	var Lu = get('categories/Lu');
	var Ll = get('categories/Ll');
	var Lt = get('categories/Lt');
	var Lm = get('categories/Lm');
	var Lo = get('categories/Lo');
	var Nl = get('categories/Nl');
	var Mn = get('categories/Mn');
	var Mc = get('categories/Mc');
	var Nd = get('categories/Nd');
	var Pc = get('categories/Pc');

	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.6
	// http://www.unicode.org/reports/tr31/#Default_Identifier_Syntax
	var identifierStart = regenerate()
		.add(Lu, Ll, Lt, Lm, Lo, Nl)
		.remove(Pattern_Syntax, Pattern_White_Space)
		.add('$', '_');
		// Note: don’t remove astral symbols, as per
		// https://mail.mozilla.org/pipermail/es-discuss/2012-February/020762.html
	var identifierPartOnly = regenerate()
		.add(Mn, Mc, Nd, Pc)
		.remove(Pattern_Syntax, Pattern_White_Space)
		.add(
			// '$', // already in `identifierStart`
			// '_', // already in `identifierStart`
			'\u200C',
			'\u200D'
		);
		// Note: don’t remove astral symbols, as per
		// https://mail.mozilla.org/pipermail/es-discuss/2012-February/020762.html

	return {
		'start': identifierStart.toArray(),
		'part': identifierPartOnly.toArray()
	};

};

var version;

// ES3/ES5, Unicode 3.0.0
version = '3.0.0'; // Unicode version
console.log('Generating data for Unicode v%s…', version);
var es5data = generateES5Data(version);
writeJSON('data/es-5-unicode-' + version + '-start.json', es5data.start);
writeJSON('data/es-5-unicode-' + version + '-part-only.json', es5data.part);

// ES6, Unicode 5.1.0
version = '5.1.0'; // Unicode version
console.log('Generating data for Unicode v%s…', version);
var es6data = generateES6Data(version);
writeJSON('data/es-6-unicode-' + version + '-start.json', es6data.start);
writeJSON('data/es-6-unicode-' + version + '-part-only.json', es6data.part);

// ES6, Unicode 6.3.0
version = '6.3.0'; // Unicode version
console.log('Generating data for Unicode v%s…', version);
var es6data = generateES6Data(version);
writeJSON('data/es-6-unicode-' + version + '-start.json', es6data.start);
writeJSON('data/es-6-unicode-' + version + '-part-only.json', es6data.part);
