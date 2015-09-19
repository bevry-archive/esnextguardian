// module.exports = require('esnextguardian')(__dirname + '/esnext/lib/index.js', __dirname + '/es5/lib/index.js')
module.exports = function (esnextModule, es5Module, _require) {
	if ( _require == null )  _require = require

	// If we always want to use the ESNext version, then do so
	if ( process.env.REQUIRE_ESNEXT ) {
		return _require(esnextModule)
	}
	// If we always want to use the ES5 version (or if we are running on v8, and it doesn't support ES6), then do so:
	else if ( process.env.REQUIRE_ES5 || process.versions.v8 && process.versions.v8.split('.')[0] < 4 ) {
		return _require(es5Module)
	}
	else {
		// Otherwise try to use the ESNext version
		try {
			return _require(esnextModule)
		}
		catch (e) {
			// And if it fails, output the reason why if debugging
			if ( process.env.DEBUG ) {
				console.log('Downgrading from ESNext to ES5 due to:', e.stack)
			}
			// Then just use the ES5 version
			return _require(es5Module)
		}
	}
}
