var AmpersandModel  = require('ampersand-model');
var Player          = require( './player' );
var xhr             = require( 'xhr' );

module.exports = AmpersandModel.extend({
    type  : 'user',
    props :
    {
        id: ['string']
    },
    derived:
    {
        player :
        {
            deps    : ['id'],
            fn      : function ()
            {
                var player = new Player( { id: this.id });
                player.fetch();

                return player;
            }
        },
        isLoggedIn :
        {
            deps    : ['player'],
            cache   : false,
            fn      : function()
            {
                var _this = this;
                var _logged = false;

                xhr(
                {
                    method  : 'GET',
                    uri     : '/api/isLoggedIn',
                    headers :
                    {
                        'Content-Type' : 'application/json'
                    },
                    sync : true
                }, function( err, response/*, body*/ )
                {
                    var player = JSON.parse( response.body );
                    if ( player && player.id )
                    {
                        _this.set( 'id', player.id );
                        _logged = true;
                    }
                } );

                return _logged;

            }

        },
        isAdmin :
        {
            deps    : ['player'],
            cache   : false,
            fn      : function()
            {
                return this.isLoggedIn && this.player.isAdmin;
            }
        }
    }
});
