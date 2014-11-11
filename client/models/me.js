var AmpersandModel  = require('ampersand-model');
var Player          = require( './player' );
var xhr             = require( 'xhr' );

module.exports = AmpersandModel.extend(
{
    type  : 'user',
    props :
    {
        id : ['string', true, '']
    },
    session :
    {
        isLoggedIn : ['boolean', true, false]
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
        isAdmin :
        {
            deps    : ['player'],
            cache   : false,
            fn      : function()
            {
                return this.isLoggedIn && this.player.isAdmin;
            }
        }
    },
    getLoggedStatus : function()
    {
        var _this       = this;
        var isLogged;

        xhr(
        {
            method  : 'GET',
            uri     : '/api/isLoggedIn',
            headers :
            {
                'Content-Type' : 'application/json'
            },
            sync    : true
        },
        function( err, response )
        {
            if ( !err && response.status === 200 )
            {
                var player = JSON.parse( response.body );
                _this.id = player.id;
                isLogged = true;
            }
            else if ( _this.id )
            {
                _this.id = '';
            }
        } );

        return !!isLogged;
    }
} );
