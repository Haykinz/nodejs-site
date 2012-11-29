/**
 * Config 
 */

var nconf = require('nconf'),
	path  = require('path');

/**
 * Defenitions
 */
var config = new nconf.Provider({
  env: true,
  argv: true,
  stores: [
    { name: 'system', type: 'file', file: path.join(__dirname, 'configs/default.json') }
  ]
});

/**
 * Resetter
 */
config.set("SERVER:ROOT", path.join(__dirname));
config.set("SERVER:VIEWS", path.join(__dirname, config.get("SERVER:VIEWS")));
config.set("SERVER:APPS:AGGREGATORS", path.join(__dirname, config.get("SERVER:APPS:AGGREGATORS")))

/**
 * Store engine
 */
config.use('memory');

config.env().argv();

module.exports = config;