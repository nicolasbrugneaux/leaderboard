/*global app, me*/
var PageView        = require( './base' );
var templates       = require( '../templates' );
var RegisterForm    = require( '../forms/register' );

module.exports = PageView.extend(
{
    pageTitle   : 'Sign up',
    template    : templates.pages.registerForm,
    subviews    :
    {
        form :
        {
            container   : 'form',
            prepareView : function( el )
            {
                return new RegisterForm(
                {
                    el              : el,
                    submitCallback  : function( data )
                    {
                        console.log( data );
                        app.players.create( data,
                        {
                            wait    : true,
                            success : function( player )
                            {
                                me.id = player.id;
                                app.navigate( '/players' );
                                app.players.fetch();
                            }
                        } );
                    }
                } );
            }
        }
    }
} );
