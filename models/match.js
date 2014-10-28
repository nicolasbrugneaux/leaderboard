var thinky = require( '../thinky.js' );

var Match = thinky.createModel( 'matches',
{
    // id       : rethinkdb auto-generate uuid
    winnerId    : String,
    looserId    : String,
    date        :
    {
        _type   : Date,
        default : thinky.r.now()
    },
    lame        :
    {
        _type   : Boolean,
        default : false
    }
}, { enforce_type : 'strict' } );

module.exports = Match;
