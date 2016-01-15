/* eslint no-var:0 */
'use strict'

function MyClass () { }
MyClass.prototype.reverse = function reverse (a) {
	var z = []
	a.forEach(function (i) {
		z.unshift(i)
	})
	return z
}
MyClass.prototype.version = function version () {
	return 'es5'
}
module.exports = MyClass
