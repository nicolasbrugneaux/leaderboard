var Collection  = require( 'ampersand-rest-collection' );
var Player      = require( './player' );


module.exports = Collection.extend(
{
    model       : Player,
    url         : '/api/players',

    comparator  : function( previous, next )
    {
        if ( previous.ranking > next.ranking )
        {
            return -1;
        }
        else if ( previous.ranking < next.ranking  )
        {
            return 1;
        }
        else
        {
            return previous.matches.length < next.matches.length ? 1 : -1;
        }
    }
} );
