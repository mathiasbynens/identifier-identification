var jsesc = require('jsesc');
var regenerate = require('regenerate');
var fs = require('fs');

var escapeData = function(data) {
	return jsesc(data, {
		'compact': true,
		'quotes': 'single'
	});
};

var commonCodePoints = []; // defined below
var readJSON = function(fileName) {
	var contents = fs.readFileSync('data/' + fileName + '.json', 'utf-8');
	var codePoints = JSON.parse(contents);
	if (commonCodePoints.length) {
		commonCodePoints = regenerate.intersection(commonCodePoints, codePoints);
	} else {
		commonCodePoints = codePoints;
	}
	return codePoints;
};

// Load `IdentifierStart` data, keeping track of the common code points
commonCodePoints = [];
var Unicode3ES5Start = readJSON('es-5-unicode-3.0.0-start');
var Unicode51ES6Start = readJSON('es-6-unicode-5.1.0-start');
var Unicode63ES6Start = readJSON('es-6-unicode-6.3.0-start');
var commonStart = commonCodePoints.slice(0);

// Remove common `IdentifierStart` code points from the individual sets
Unicode3ES5Start = regenerate.difference(Unicode3ES5Start, commonStart);
Unicode51ES6Start = regenerate.difference(Unicode51ES6Start, commonStart);
Unicode63ES6Start = regenerate.difference(Unicode63ES6Start, commonStart);

// Load `IdentifierPart` data, keeping track of the common code points
commonCodePoints = [];
var Unicode3ES5Part = readJSON('es-5-unicode-3.0.0-part-only');
var Unicode51ES6Part = readJSON('es-6-unicode-5.1.0-part-only');
var Unicode63ES6Part = readJSON('es-6-unicode-6.3.0-part-only');
var commonPart = commonCodePoints;

// Remove common `IdentifierPart` code points from the individual sets
Unicode3ES5Part = regenerate.difference(Unicode3ES5Part, commonPart);
Unicode51ES6Part = regenerate.difference(Unicode51ES6Part, commonPart);
Unicode63ES6Part = regenerate.difference(Unicode63ES6Part, commonPart);

// Export the data
module.exports = {
	'commonStart': escapeData(commonStart),
	'commonPart': escapeData(commonPart),
	'Unicode3ES5Start': escapeData(Unicode3ES5Start),
	'Unicode51ES6Start': escapeData(Unicode51ES6Start),
	'Unicode63ES6Start': escapeData(Unicode63ES6Start),
	'Unicode3ES5Part': escapeData(Unicode3ES5Part),
	'Unicode51ES6Part': escapeData(Unicode51ES6Part),
	'Unicode63ES6Part': escapeData(Unicode63ES6Part),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf-8')).version
};
