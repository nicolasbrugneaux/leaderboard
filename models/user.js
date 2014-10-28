var thinky = require( '../thinky.js' );

var User = thinky.createModel( 'users',
{
    // id       : rethinkdb auto-generate uuid
    firstName   : String,
    lastName    : String,
    playerId    : String,
    password    : String
}, { enforce_type : 'strict' } );

User.define( 'getView', function()
{
    return this.without( 'password' );
} );

module.exports = User;

var Player = require( './player' );
User.hasOne( Player, 'player', 'id', 'playerId' );