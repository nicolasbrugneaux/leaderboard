var Collection  = require( 'ampersand-rest-collection' );
var Match       = require( './match' );


module.exports = Collection.extend(
{
    model   : Match,
    url     : '/api/matches'
} );
