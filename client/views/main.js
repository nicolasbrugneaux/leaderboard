/*global app, me, $, document, window*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View            = require( 'ampersand-view' );
var ViewSwitcher    = require( 'ampersand-view-switcher' );
var _               = require( 'underscore' );
var domify          = require( 'domify' );
var dom             = require( 'ampersand-dom' );
var templates       = require( '../templates' );
var setFavicon      = require( 'favicon-setter' );


module.exports = View.extend(
{
    template    : templates.body,
    initialize  : function()
    {
        this.listenTo( app.router, 'page', this.handleNewPage );
        me.on( 'change:isLoggedIn', this.render.bind( this ) );
        me.on( 'change:isAdmin', this.render.bind( this ) );
    },
    events :
    {
        'click a[href]': 'handleLinkClick'
    },
    render : function()
    {
        // some additional stuff we want to add to the document head
        document.head.appendChild( domify( templates.head() ) );

        // main renderer
        this.renderWithTemplate( {me: me} );

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher( this.queryByHook( 'page-container' ),
        {
            show : function( newView, oldView )
            {
                document.title      = _.result( newView, 'pageTitle' );
                document.scrollTop  = 0;

                dom.addClass( newView.el, 'active' );
                app.currentPage = newView;
            }
        } );

        return this;
    },

    handleNewPage : function( view )
    {
        // tell the view switcher to render the new one
        this.pageSwitcher.set( view );

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleLinkClick : function( e )
    {
        var aTag    = e.target;
        var local   = aTag.host === window.location.host;

        if ( local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey )
        {
            e.preventDefault();
            app.navigate( aTag.pathname );
        }
    },

    updateActiveNav : function()
    {
        var path = window.location.pathname.slice( 1 );

        this.queryAll( '.nav a[href]' ).forEach( function ( aTag )
        {
            var aPath = aTag.pathname.slice(1);

            if ( ( !aPath && !path ) || ( aPath && path.indexOf( aPath ) === 0 ) )
            {
                dom.addClass( aTag.parentNode, 'active' );
            }
            else
            {
                dom.removeClass( aTag.parentNode, 'active' );
            }
        });
    }
});
