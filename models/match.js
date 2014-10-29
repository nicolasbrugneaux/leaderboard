var thinky  = require( '../thinky.js' );
var r       = require( 'rethinkdb' );

var Match = thinky.createModel( 'matches',
{
    // id       : rethinkdb auto-generate uuid
    winnerId    : String,
    looserId    : String,
    date        :
    {
        _type   : Date,
        default : r.now()
    },
    lame        :
    {
        _type   : Boolean,
        default : false
    }
},
{
    enforce_type    : 'strict',
    validate        : 'oncreate'
} );

module.exports = Match;
