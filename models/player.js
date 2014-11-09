var thinky  = require( '../thinky.js' );
var Elo     = require( 'elo-js' );
var elo     = new Elo();

var Player = thinky.createModel( 'players',
{
    // id       : rethinkdb auto-generate uuid
    ranking     :
    {
        _type   : Number,
        default : 1200
    },
    firstName   : String,
    lastName    : String,
    password    : String,
    isAdmin     : Boolean,
    email       : String
},
{
    enforce_type    : 'strict',
    validate        : 'oncreate'
} );

Player.ensureIndex( 'email' );

module.exports = Player;

var Match = require( './match' );
Player.hasMany( Match, 'wonMatches', 'id', 'winnerId' );
Player.hasMany( Match, 'lostMatches', 'id', 'loserId' );

// Player.hasMany( Match, 'matches', 'id', 'matchId' );

var Challenge = require( './challenge' );
Player.hasMany( Challenge, 'challenges', 'id', 'challengeId' );

var Notification = require( './notification' );
Player.hasMany( Notification, 'notifications', 'id', 'notificationId' );

Player.defineStatic( 'getView', function()
{
    return this.getJoin(
    {
        wonMatches      : true,
        lostMatches     : true,
        challenges      : true,
        notifications   : true
    } ).without( 'password' );
} );

Player.define( 'fullName', function()
{
    return this.firstName + ' ' + this.lastName;
} );

Player.define( 'getView', function()
{
    this.password = undefined;
    return this;
} );

Player.define( 'wins', function( opponent, lame )
{
    /* lame is unused for now*/
    this.ranking = elo.ifWins( this.ranking, opponent.ranking, lame );
    return this;
} );

Player.define( 'loses', function( opponent, lame )
{
    /* lame is unused for now*/
    this.ranking = elo.ifLoses( this.ranking, opponent.ranking, lame );
    return this;
} );
