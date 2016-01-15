/* eslint no-magic-numbers:0 */
'use strict'

// Import
const joe = require('joe')
const esnextguardian = require('../')
const asserHelpers = require('assert-helpers')
const pathUtil = require('path')
const semver = require('semver')

// Prepare
const es5Path = pathUtil.join(__dirname, 'es5.js')
const es6Path = pathUtil.join(__dirname, 'es6.js')
const es7Path = pathUtil.join(__dirname, 'es7.js')
const nodeVersion = process.versions.node.split('.').join('.')

// =====================================
// Tests

// Types
joe.suite('esnextguardian', function (suite, test) {

	test('es5', function () {
		const C = require(es5Path)
		const c = new C()
		asserHelpers.deepEqual(c.reverse([1, 2, 3]), [3, 2, 1], 'reverse result was as expected')
		asserHelpers.equal(c.version(), 'es5', 'version result was as expected')
	})

	if ( semver.satisfies(nodeVersion, '0.10 || 0.12') ) {

		test('es6 fallback', function () {
			const C = esnextguardian(es6Path, es5Path)
			const c = new C()
			asserHelpers.deepEqual(c.reverse([1, 2, 3]), [3, 2, 1], 'reverse result was as expected')
			asserHelpers.equal(c.version(), 'es5', 'version result was as expected — node 0.10 will fallback this')
		})

	}

	else if ( semver.satisfies(nodeVersion, '4 || 5') ) {

		test('es6 inclusion', function () {
			const C = esnextguardian(es6Path, es5Path)
			const c = new C()
			asserHelpers.deepEqual(c.reverse([1, 2, 3]), [3, 2, 1], 'reverse result was as expected')
			asserHelpers.equal(c.version(), 'es6', 'version result was as expected')
		})

		test('es7 fallback', function () {
			const C = esnextguardian(es7Path, es5Path)
			const c = new C()
			asserHelpers.deepEqual(c.reverse([1, 2, 3]), [3, 2, 1], 'reverse result was as expected')
			asserHelpers.equal(c.version(), 'es5', 'version result was as expected — es7 test should fallback to es5 as es7 is not yet supported on ' + nodeVersion)
		})

	}

	else {
		throw new Error('Unknown environment')
	}

})
