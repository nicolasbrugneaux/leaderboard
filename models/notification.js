var thinky = require( '../thinky.js' );

var Challenge = thinky.createModel( 'notifications',
{
    // id       : rethinkdb auto-generate uuid
    type        :
    {
        _type   : String,
        default : 'default'
    },
    message     : String
}, { enforce_type : 'strict' } );

module.exports = Challenge;

var Player = require( './player' );
Challenge.hasOne( Player, 'player', 'id', 'playerId' );
