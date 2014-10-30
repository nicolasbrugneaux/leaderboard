/*global app*/
var PageView    = require( './base' );
var templates   = require( '../templates' );
var MatchForm   = require( '../forms/match' );

module.exports = PageView.extend(
{
    pageTitle   : 'add match',
    template    : templates.pages.matchAdd,
    // events: {
    //     'click [data-hook~=setmatch]': 'setmatch',
    // },
    initialize  : function( spec )
    {
        if ( !this.collection.length )
        {
            //if this needs to be fetched the rest needs to wait
            //im not sure how to run promises with this set up
            //at the moment
            this.fetchCollection();
        }

    },
    fetchCollection : function()
    {
        this.collection.fetch();
        return false;
    },
    subviews :
    {
        form :
        {
            container   : 'form',
            prepareView : function( el )
            {
                return new MatchForm(
                {
                    el              : el,
                    submitCallback  : function( data )
                    {
                        //not sure why the select isnt returning the right
                        //value, should be according to git repo
                        //https://github.com/AmpersandJS/ampersand-select-view
                        data.winnerId   = data.winnerId.id;
                        data.loserId    = data.loserId.id;

                        console.log( 'Submitted match', data );

                        app.matches.create( data,
                        {
                            wait    : true,
                            success : function()
                            {
                                app.players.fetch();
                                app.navigate( '/players' );
                            }
                        } );
                    }
                } );
            }
        }
    }
} );
