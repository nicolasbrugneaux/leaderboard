var thinky = require( '../thinky.js' );

var Player = thinky.createModel( 'players',
{
    // id       : rethinkdb auto-generate uuid
    ranking     :
    {
        _type   : Number,
        default : 1200
    },
    userId      : String
}, { enforce_type : 'strict' } );

Player.ensureIndex( 'ranking' );
Player.ensureIndex( 'userId' );

module.exports = Player;

var User = require( './user' );
Player.belongsTo( User, 'user', 'userId', 'id' );

var Match = require( './match' );
Player.hasMany( Match, 'matches', 'id', 'matchId' );

var Challenge = require( './challenge' );
Player.hasMany( Challenge, 'challenges', 'id', 'challengeId' );

var Notification = require( './notification' );
Player.hasMany( Notification, 'notifications', 'id', 'notificationId' );

Player.defineStatic( 'getView', function()
{
    return this.without( 'userId' ).getJoin({
        user:
        {
            _apply : function( user )
            {
                return user.without( 'password', 'playerId' );
            }
        },
        matches         : true,
        challenges      : true,
        notifications   : true
    } );
} );
