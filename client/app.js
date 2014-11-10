/*globals window, document*/
// var config = require('./config');

var Router      = require( './router' );
var MainView    = require( './views/main' );
var Me          = require( './models/me' );
var Players     = require( './models/players' );
var Matches     = require( './models/matches' );
var domReady    = require( 'domready' );


module.exports =
{
    // this is the the whole app initter
    blastoff : function()
    {
        var self        = window.app = this;
        this.protocol   = document.location.protocol + '//';
        // create our global 'me' object and an empty collection for our players models.
        window.me       = new Me();
        this.players    = new Players();
        this.matches    = new Matches();
        this.router     = new Router();


        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady( function ()
        {
            // init our main view
            var mainView = self.view = new MainView(
            {
                model   : window.me,
                el      : document.body
            } );

            mainView.render();

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start( {pushState: true, root: '/'} );
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate : function( page )
    {
        var url = ( page.charAt(0) === '/' ) ? page.slice( 1 ) : page;
        this.router.history.navigate( url, {trigger: true} );
    }
};

// run it
module.exports.blastoff();
