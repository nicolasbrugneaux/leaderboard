var thinky = require('../thinky.js' );

var Challenge = thinky.createModel( 'challenges',
{
    // id       : rethinkdb auto-generate uuid
    challengerId  : String,
    challengedId  : String,
    matchId       :
    {
        _type     : String,
        default   : 'not_yet_played'
    }
}, { enforce_type : 'strict' } );

module.exports = Challenge;

var Match = require( './match' );
Challenge.hasOne( Match, 'matches', 'id', 'matchId' );
