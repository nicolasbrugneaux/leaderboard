/*global me, app*/
var Router          = require( 'ampersand-router' );
var LoginPage       = require( './pages/login' );
var LogoutPage      = require( './pages/logout' );
var RegisterPage    = require( './pages/register' );
var MatchAddPage    = require( './pages/match-add' );
var Players         = require( './pages/players' );
var PlayerAddPage   = require( './pages/player-add' );
var PlayerEditPage  = require( './pages/player-edit' );
var PlayerViewPage  = require( './pages/player-view' );


module.exports = Router.extend(
{
    routes :
    {
        ''                  : 'home',
        'register'          : 'register',
        'players'           : 'players',
        'info'              : 'info',
        'match/add'         : 'matchAdd',
        'player/add'        : 'playerAdd',
        'player/:id'        : 'playerView',
        'player/:id/edit'   : 'playerEdit',
        '(*path)'           : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home : function()
    {
        var Page = me.isLoggedIn ? LogoutPage : LoginPage;

        this.trigger( 'page', new Page(
        {
            model : me
        } ) );
    },

    register : function()
    {
        this.trigger( 'page', new RegisterPage() );
    },

    // ------- ROUTE HANDLERS ---------

    players : function()
    {
        this.trigger( 'page', new Players(
        {
            model       : me,
            collection  : app.players
        } ) );
    },

    playerAdd : function()
    {
        this.trigger( 'page', new PlayerAddPage(
        {
            model : me,
        } ) );
    },

    playerEdit : function( id )
    {
        var Page = me && me.isLoggedIn && me.isAdmin ?
            PlayerEditPage : PlayerViewPage;

        this.trigger( 'page', new Page(
        {
            id      : id,
            model   : me
        } ) );
    },

    playerView : function( id )
    {
        this.trigger( 'page', new PlayerViewPage(
        {
            id      : id,
            model   : me
        } ) );
    },

    matchAdd : function()
    {
        if ( me && me.isAdmin )
        {
            this.trigger( 'page', new MatchAddPage(
            {
                collection  : app.players,
                model       : me
            } ) );

        }
        else
        {
            this.redirectTo( '' );
        }
    },

    catchAll : function()
    {
        this.redirectTo( '' );
    }
} );
