var Thinky = require( 'thinky' );
var config = require( './config' );

module.exports = new Thinky(config.rethinkdb);