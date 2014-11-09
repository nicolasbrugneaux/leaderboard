var Collection  = require( 'ampersand-rest-collection' );
var Player      = require( './player' );
var xhr         = require( 'xhr' );


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
    },

    login : function( model, options )
    {
        xhr(
        {
            body    : JSON.stringify( model ),
            method  : 'POST',
            uri     : '/api/login',
            headers :
            {
                'Content-Type' : 'application/json'
            },
            sync    : options && options.wait
        }, function( err, response/*, body*/ )
        {
            if ( err || response.statusCode !== 200 )
            {
                return options.error( err, response );
            }

            return options.success( response );
        } );
    },

    logout : function( model, options )
    {
        xhr(
        {
            method  : 'POST',
            uri     : '/api/logout',
            headers :
            {
                'Content-Type' : 'application/json'
            },
            sync    : options && options.wait
        }, function( err, response/*, body*/ )
        {
            if ( err || response.statusCode !== 204 )
            {
                return options.error( err, response );
            }

            return options.success( response );
        } );
    },

} );
