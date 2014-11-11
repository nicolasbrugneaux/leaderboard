/*global app, me*/
var PageView    = require('./base');
var templates   = require('../templates');
var LogoutForm  = require('../forms/logout');

module.exports = PageView.extend(
{
    pageTitle   : 'Log out',
    template    : templates.pages.logoutForm,
    subviews    :
    {
        form :
        {
            container   : 'form',
            prepareView : function( el )
            {
                return new LogoutForm(
                {
                    el              : el,
                    submitCallback  : function( data )
                    {
                        app.players.logout( data,
                        {
                            wait    : true,
                            success : function()
                            {
                                me.id = '';
                                me.isLoggedIn = false;
                                app.navigate( 'home' );
                            },
                            error : function( err, response )
                            {
                                console.log( err, response );
                            }
                        } );
                    }
                } );
            }
        }
    }
} );
