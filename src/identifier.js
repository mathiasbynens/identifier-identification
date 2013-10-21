/*! http://mths.be/identifier v<%= version %> by @mathias */
// Prollyfill for the identifier identification strawman (Oct 10, 2013 draft)
// http://wiki.ecmascript.org/doku.php?id=strawman:identifier_identification
;(function(root, undefined) {

	var object = {};
	var toString = object.toString;
	var isString = function(value) {
		return typeof value == 'string' ||
			toString.call(value) == '[object String]';
	};
	var isNumber = function(value) {
		return typeof value == 'number' ||
			toString.call(value) == '[object Number]';
	};

	/*--------------------------------------------------------------------------*/

	/*! http://mths.be/codepointat v0.1.0 by @mathias */
	if (!String.prototype.codePointAt) {
		String.prototype.codePointAt = function(position) {
			var string = String(this);
			var size = string.length;
			// `ToInteger`
			var index = position ? Number(position) : 0;
			if (isNaN(index)) {
				index = 0;
			}
			// Account for out-of-bounds indices:
			if (index < 0 || index >= size) {
				return undefined;
			}
			// Get the first code unit
			var first = string.charCodeAt(index);
			var second;
			if ( // check if it’s the start of a surrogate pair
				first >= 0xD800 && first <= 0xDBFF && // high surrogate
				size > index + 1 // there is a next code unit
			) {
				second = string.charCodeAt(index + 1);
				if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
					// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				}
			}
			return first;
		};
	}

	/*--------------------------------------------------------------------------*/

	var factory = function(step12) {
		return function(value, edition) {
			var codePoint;
			var unicode;

			// Step 1
			if (isString(value)) {
				// Step 3 is implied here I think (TODO: check empty string)
				codePoint = value.codePointAt(0);
			} else {
				// Step 3
				codePoint = Number(value);
			}

			// Step 2
			if (!isNumber(codePoint)) {
				throw TypeError();
			}

			if (
				!isFinite(codePoint) || // Step 4
				codePoint < 0 || codePoint > 0x10FFFF || // Step 6
				Math.floor(codePoint) != codePoint // Step 5
			) {
				throw RangeError();
			}

			// Step 7
			if (edition !== undefined) {
				// Step 7.1
				if (!isNumber(edition)) {
					throw TypeError();
				}
				// Step 7.2
				if (edition != 3 && edition != 5 && edition != 6) {
					throw RangeError();
				}
			}

			var isOldES = edition == 3 || edition == 5;
			if (isOldES) { // Step 8
				unicode = 3; // Unicode v3.0.0
			} else if (edition == 6) { // Step 6
				unicode = 5.1; // Unicode v5.1.0
			} else { // Step 10
				// “Else let `unicode` be the Unicode version supported by the
				// implementation in ECMAScript identifiers.”
				// Assume the implementation implements the latest available Unicode
				// version:
				unicode = 6.3; // Unicode v6.3.0
			}

			// Step 11 is implied by the rest of our code
			// if (edition === undefined) {
			// 	edition = 6;
			// }

			// Step 12
			// here be magic
			if (step12(codePoint, unicode)) {
				return true;
			}

			// Step 13
			return false;
		};
	};

	var COMMON_START = <%= commonStart %>;
	var DATA_START = {
		// Used for ES3 and ES5
		'3': <%= Unicode3ES5Start %>,
		// Only used for ES 6
		'5.1': <%= Unicode51ES6Start %>,
		// Only used if the ES version wasn’t specified, i.e. using ES6 mapped to
		// the latest available Unicode version
		'6.3': <%= Unicode63ES6Start %>
	};

	var isIdentifierStart = factory(function(codePoint, unicode) {
		if (
			COMMON_START.indexOf(codePoint) > -1 ||
			DATA_START[unicode].indexOf(codePoint) > -1
		) {
			return true;
		}
	});

	// These arrays include only the code points that aren’t already listed in
	// the respective `IdentifierStart` data set.
	var COMMON_PART = <%= commonPart %>;
	var DATA_PART = {
		// Used for ES3 and ES5
		'3': <%= Unicode3ES5Part %>,
		// Only used for ES 6
		'5.1': <%= Unicode51ES6Part %>,
		// Only used if the ES version wasn’t specified, i.e. using ES6 mapped to
		// the latest available Unicode version
		'6.3': <%= Unicode63ES6Part %>
	};

	var isIdentifierPart = factory(function(codePoint, unicode) {
		if (
			COMMON_START.indexOf(codePoint) > -1 ||
			DATA_START[unicode].indexOf(codePoint) > -1 ||
			COMMON_PART.indexOf(codePoint) > -1 ||
			DATA_PART[unicode].indexOf(codePoint) > -1
		) {
			return true;
		}
	});

	if (!String.isIdentifierStart) {
		String.isIdentifierStart = isIdentifierStart;
	}
	if (!String.isIdentifierPart) {
		String.isIdentifierPart = isIdentifierPart;
	}

}(this));
