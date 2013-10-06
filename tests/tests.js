var assert = require('assert');
var assertEquals = assert.equal;

require('../identifier.js');

// Note: Using the values `3` or `5` for the `edition` parameter shouldn’t make
// a difference, since they both use the same set of rules and the same Unicode
// version (v3.0.0).

/* `String.isIdentifierStart` */

assertEquals(String.isIdentifierStart.length, 2);

assertEquals(String.isIdentifierStart(0x61, 3), true);
assertEquals(String.isIdentifierStart(0x61, 5), true);
assertEquals(String.isIdentifierStart(0x61, 6), true);
assertEquals(String.isIdentifierStart(0x61), true);

assertEquals(String.isIdentifierStart('a', 3), true);
assertEquals(String.isIdentifierStart('a', 5), true);
assertEquals(String.isIdentifierStart('a', 6), true);
assertEquals(String.isIdentifierStart('a'), true);

assertEquals(String.isIdentifierStart(0x30, 3), false);
assertEquals(String.isIdentifierStart(0x30, 5), false);
assertEquals(String.isIdentifierStart(0x30, 6), false);
assertEquals(String.isIdentifierStart(0x30), false);

assertEquals(String.isIdentifierStart('0', 3), false);
assertEquals(String.isIdentifierStart('0', 5), false);
assertEquals(String.isIdentifierStart('0', 6), false);
assertEquals(String.isIdentifierStart('0'), false);

assertEquals(String.isIdentifierStart(0x0B83, 3), false);
assertEquals(String.isIdentifierStart(0x0B83, 5), false);
assertEquals(String.isIdentifierStart(0x0B83, 6), true);
assertEquals(String.isIdentifierStart(0x0B83), true);

assertEquals(String.isIdentifierStart(0x0220, 3), false);
assertEquals(String.isIdentifierStart(0x0220, 5), false);
assertEquals(String.isIdentifierStart(0x0220, 6), true);
assertEquals(String.isIdentifierStart(0x0220), true);

// Note: U+2E2F is allowed as per ES5 + Unicode v5.1.0 or v6.3.0, but not as per
// ES5 + Unicode v3.0.0, and not as per ES6.
assertEquals(String.isIdentifierStart(0x2E2F, 3), false);
assertEquals(String.isIdentifierStart(0x2E2F, 5), false);
assertEquals(String.isIdentifierStart(0x2E2F, 6), false);
assertEquals(String.isIdentifierStart(0x2E2F), false);

assertEquals(String.isIdentifierStart(0x0, 3), false);
assertEquals(String.isIdentifierStart(0x0, 5), false);
assertEquals(String.isIdentifierStart(0x0, 6), false);
assertEquals(String.isIdentifierStart(0x0), false);

// high surrogates (U+D800 - U+0xDBFF)
assertEquals(String.isIdentifierStart(0xD800, 3), false);
assertEquals(String.isIdentifierStart(0xD800, 5), false);
assertEquals(String.isIdentifierStart(0xD800, 6), false);
assertEquals(String.isIdentifierStart(0xD800), false);

assertEquals(String.isIdentifierStart(0xDBFF, 3), false);
assertEquals(String.isIdentifierStart(0xDBFF, 5), false);
assertEquals(String.isIdentifierStart(0xDBFF, 6), false);
assertEquals(String.isIdentifierStart(0xDBFF), false);

// low surrogates (U+DC00 - U+0xDFFF)
assertEquals(String.isIdentifierStart(0xDC00, 3), false);
assertEquals(String.isIdentifierStart(0xDC00, 5), false);
assertEquals(String.isIdentifierStart(0xDC00, 6), false);
assertEquals(String.isIdentifierStart(0xDC00), false);

assertEquals(String.isIdentifierStart(0xDFFF, 3), false);
assertEquals(String.isIdentifierStart(0xDFFF, 5), false);
assertEquals(String.isIdentifierStart(0xDFFF, 6), false);
assertEquals(String.isIdentifierStart(0xDFFF), false);

// astral symbols
assertEquals(String.isIdentifierStart(0x02FA1D, 3), false);
assertEquals(String.isIdentifierStart(0x02FA1D, 5), false);
assertEquals(String.isIdentifierStart(0x02FA1D, 6), true);
assertEquals(String.isIdentifierStart(0x02FA1D), true);

assertEquals(String.isIdentifierStart(0x0101FD, 3), false);
assertEquals(String.isIdentifierStart(0x0101FD, 5), false);
assertEquals(String.isIdentifierStart(0x0101FD, 6), false);
assertEquals(String.isIdentifierStart(0x0101FD), false);

assertEquals(String.isIdentifierStart(0x0E01EF, 3), false);
assertEquals(String.isIdentifierStart(0x0E01EF, 5), false);
assertEquals(String.isIdentifierStart(0x0E01EF, 6), false);
assertEquals(String.isIdentifierStart(0x0E01EF), false);

/* `String.isIdentifierPart` */

assertEquals(String.isIdentifierPart.length, 2);

assertEquals(String.isIdentifierPart(0x61, 3), true);
assertEquals(String.isIdentifierPart(0x61, 5), true);
assertEquals(String.isIdentifierPart(0x61, 6), true);
assertEquals(String.isIdentifierPart(0x61), true);

assertEquals(String.isIdentifierPart('a', 3), true);
assertEquals(String.isIdentifierPart('a', 5), true);
assertEquals(String.isIdentifierPart('a', 6), true);
assertEquals(String.isIdentifierPart('a'), true);

assertEquals(String.isIdentifierPart(0x30, 3), true);
assertEquals(String.isIdentifierPart(0x30, 5), true);
assertEquals(String.isIdentifierPart(0x30, 6), true);
assertEquals(String.isIdentifierPart(0x30), true);

assertEquals(String.isIdentifierPart('0', 3), true);
assertEquals(String.isIdentifierPart('0', 5), true);
assertEquals(String.isIdentifierPart('0', 6), true);
assertEquals(String.isIdentifierPart('0'), true);

assertEquals(String.isIdentifierPart(0x0B83, 3), true);
assertEquals(String.isIdentifierPart(0x0B83, 5), true);
assertEquals(String.isIdentifierPart(0x0B83, 6), true);
assertEquals(String.isIdentifierPart(0x0B83), true);

assertEquals(String.isIdentifierPart(0x0220, 3), false);
assertEquals(String.isIdentifierPart(0x0220, 5), false);
assertEquals(String.isIdentifierPart(0x0220, 6), true);
assertEquals(String.isIdentifierPart(0x0220), true);

// Note: U+2E2F is allowed as per ES5 + Unicode v5.1.0 or v6.3.0, but not as per
// ES5 + Unicode v3.0.0, and not as per ES6.
assertEquals(String.isIdentifierPart(0x2E2F, 3), false);
assertEquals(String.isIdentifierPart(0x2E2F, 5), false);
assertEquals(String.isIdentifierPart(0x2E2F, 6), false);
assertEquals(String.isIdentifierPart(0x2E2F), false);

assertEquals(String.isIdentifierPart(0xA9D6, 3), false);
assertEquals(String.isIdentifierPart(0xA9D6, 5), false);
assertEquals(String.isIdentifierPart(0xA9D6, 6), false);
assertEquals(String.isIdentifierPart(0xA9D6), true);

// high surrogates (U+D800 - U+0xDBFF)
assertEquals(String.isIdentifierStart(0xD800, 3), false);
assertEquals(String.isIdentifierStart(0xD800, 5), false);
assertEquals(String.isIdentifierStart(0xD800, 6), false);
assertEquals(String.isIdentifierStart(0xD800), false);

assertEquals(String.isIdentifierStart(0xDBFF, 3), false);
assertEquals(String.isIdentifierStart(0xDBFF, 5), false);
assertEquals(String.isIdentifierStart(0xDBFF, 6), false);
assertEquals(String.isIdentifierStart(0xDBFF), false);

// low surrogates (U+DC00 - U+0xDFFF)
assertEquals(String.isIdentifierPart(0xDC00, 3), false);
assertEquals(String.isIdentifierPart(0xDC00, 5), false);
assertEquals(String.isIdentifierPart(0xDC00, 6), false);
assertEquals(String.isIdentifierPart(0xDC00), false);

assertEquals(String.isIdentifierPart(0xDFFF, 3), false);
assertEquals(String.isIdentifierPart(0xDFFF, 5), false);
assertEquals(String.isIdentifierPart(0xDFFF, 6), false);
assertEquals(String.isIdentifierPart(0xDFFF), false);

// astral symbols
assertEquals(String.isIdentifierPart(0x02FA1D, 3), false);
assertEquals(String.isIdentifierPart(0x02FA1D, 5), false);
assertEquals(String.isIdentifierPart(0x02FA1D, 6), true);
assertEquals(String.isIdentifierPart(0x02FA1D), true);

assertEquals(String.isIdentifierPart(0x0101FD, 3), false);
assertEquals(String.isIdentifierPart(0x0101FD, 5), false);
assertEquals(String.isIdentifierPart(0x0101FD, 6), true);
assertEquals(String.isIdentifierPart(0x0101FD), true);

assertEquals(String.isIdentifierPart(0x0E01EF, 3), false);
assertEquals(String.isIdentifierPart(0x0E01EF, 5), false);
assertEquals(String.isIdentifierPart(0x0E01EF, 6), true);
assertEquals(String.isIdentifierPart(0x0E01EF), true);
