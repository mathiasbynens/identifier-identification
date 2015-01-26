# JavaScript identifier identification [![Build status](https://travis-ci.org/mathiasbynens/identifier-identification.svg?branch=master)](https://travis-ci.org/mathiasbynens/identifier-identification) [![Dependency status](https://gemnasium.com/mathiasbynens/identifier-identification.svg)](https://gemnasium.com/mathiasbynens/identifier-identification)

A JavaScript prollyfill for [the proposed `String.isIdentifierStart` and `String.isIdentifierPart` methods](http://wiki.ecmascript.org/doku.php?id=strawman:identifier_identification), based on the October 10, 2013 draft of the strawman.

Feel free to fork if you see possible improvements!

## Installation

In a browser:

```html
<script src="identifier.js"></script>
```

Via [npm](https://www.npmjs.com/):

```bash
npm install identifier-identification
```

Then, in [Node.js](https://nodejs.org/):

```js
require('identifier-identification');
```

## Usage

```js
// Is U+0B83 a valid `IdentifierStart` code point as per ECMAScript 3?
String.isIdentifierStart(0x0B83, 3);
// → false

// What about ECMASCript 5?
String.isIdentifierStart(0x0B83, 5);
// → false

// Ok, and in ECMAScript 6?
String.isIdentifierStart(0x0B83, 6);
// → true

// Is U+2FA1D a valid `IdentifierPart` code point as per ECMAScript 3?
String.isIdentifierPart(0x2FA1D, 3);
// → false

// What about ECMASCript 5?
String.isIdentifierPart(0x2FA1D, 5);
// → false

// Ok, and in ECMAScript 6?
String.isIdentifierPart(0x2FA1D, 6);
// → true
```

## Notes

In order to make this polyfill ES3/ES5-compatible, this script includes [a `String.prototype.codePointAt` polyfill](https://mths.be/codepointat).

If the second, optional, `edition` parameter is omitted, `String.isIdentifierStart` and `String.isIdentifierPart` are supposed to return `true` if the current engine supports it as such, and `false` otherwise (as per the proposal in the strawman). Because this is a polyfill for use in older ECMAScript environments, I’ve decided to use the ECMAScript 6 definition for identifiers and the latest available Unicode version data to determine the result instead. In a proper ES6 environment, `String.isIdentifierPart(0x2FA1D)` is always `true` — without violating the strawman, this polyfill could never return that result in a non-ES6 environment, which didn’t seem very useful.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This polyfill is available under the [MIT](https://mths.be/mit) license.
