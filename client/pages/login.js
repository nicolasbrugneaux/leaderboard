/*global app, me*/
var PageView    = require( './base' );
var templates   = require( '../templates' );
var LoginForm   = require( '../forms/login' );

module.exports = PageView.extend(
{
    pageTitle   : 'Log in',
    template    : templates.pages.loginForm,
    subviews    :
    {
        form :
        {
            container   : 'form',
            prepareView : function( el )
            {
                return new LoginForm(
                {
                    el              : el,
                    submitCallback  : function( data )
                    {
                        app.players.login( data,
                        {
                            wait    : true,
                            success : function( response )
                            {
                                var player = JSON.parse( response.body );

                                me.id           = player.id;
                                me.isLoggedIn   = true;
                                app.navigate( '/players' );
                                app.players.fetch();
                            },
                            error : function( err, response )
                            {
                                var _el = el.querySelector( '[data-hook="message-container"]' );
                                var errorMessage = response.body;

                                _el.style.display = 'block';
                                _el.firstChild.innerHTML = errorMessage;
                            }
                        } );
                    }
                } );
            }
        }
    }
} );
