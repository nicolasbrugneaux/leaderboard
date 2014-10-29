var Collection  = require( 'ampersand-rest-collection' );
var Player      = require( './player' );


module.exports = Collection.extend(
{
    model   : Player,
    url     : '/api/players'
} );
