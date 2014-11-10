/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var PlayerForm = require('../forms/player');


module.exports = PageView.extend(
{
    pageTitle   : 'view player',
    template    : templates.pages.playerView,
    bindings    :
    {
        'model.fullName' :
        {
            hook : 'name'
        },
        'model.avatar' :
        {
            type : 'attribute',
            hook : 'avatar',
            name : 'src'
        },
         'model.ranking' :
         {
            hook : 'elo'
        },
        'model.editUrl' :
        {
            type : 'attribute',
            hook : 'edit',
            name : 'href'
        }
    },
    events :
    {
        'click [data-hook~=delete]' : 'handleDeleteClick'
    },
    initialize : function ( spec )
    {
        var self = this;
        app.players.getOrFetch( spec.id, {all: true}, function (err, model)
        {
            if ( err )
            {
                console.log( 'couldnt find a model with id: ' + spec.id );
            }

            self.model = model;
        } );
    },
    handleDeleteClick: function()
    {
        this.model.destroy(
        {
            success : function()
            {
                app.navigate('/players');
            }
        } );
    }
} );
