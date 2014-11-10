var PageView    = require( './base' );
var templates   = require( '../templates' );
var PlayerView  = require( '../views/player' );


module.exports = PageView.extend(
{
    pageTitle   : 'players',
    template    : templates.pages.players,
    render      : function()
    {
        this.renderWithTemplate();

        if ( !this.collection.length )
        {
            this.collection.fetch();
        }

        this.renderCollection( this.collection.sort(), PlayerView,
                              this.queryByHook( 'players-list' ) );
    }
});
