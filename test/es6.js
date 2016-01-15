'use strict'

module.exports = class MyClass {
	reverse (a) {
		const z = []
		a.forEach(function (i) {
			z.unshift(i)
		})
		return z
	}
	version () {
		return 'es6'
	}
}
