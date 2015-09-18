'use strict'
module.exports = class MyClass {
	reverse (arr) {
		const [a, b, c] = arr
		return [c, b, a]
	}
	version () {
		return 'es7'
	}
}
