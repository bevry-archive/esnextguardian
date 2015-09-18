// module.exports = require('esnextguardian')(__dirname + '/esnext/lib/index.js', __dirname + '/es5/lib/index.js')
module.exports = function (newPath, oldPath) {
	// If we always want to use the ESNEXT version, then do so
	if ( process.env.REQUIRE_ESNEXT ) {
		module.exports = require(newPath)
	}
	// If we always want to use the ES5 version (or if we are running on v8, and it doesn't support ES6), then do so:
	else if ( process.env.REQUIRE_ES5 || process.versions.v8 && process.versions.v8.split('.')[0] < 4 ) {
		module.exports = require(oldPath)
	}
	else {
		// Otherwise try to use the ESNEXT version
		try {
			module.exports = require(newPath)
		}
		catch (e) {
			// And if it fails, output the reason why if debugging
			if ( process.env.DEBUG ) {
				console.log('Downgrading from ESNEXT to ES5 due to:', e.stack)
			}
			// Then just use the ES5 version
			module.exports = require(oldPath)
		}
	}
}
