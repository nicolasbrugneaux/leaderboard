var PageView = require('./base');
var templates = require('../templates');
var PlayerView = require('../views/player');


module.exports = PageView.extend({
    pageTitle: 'players',
    template: templates.pages.players,
    events: {
        'click [data-hook~=fetch]': 'fetchCollection',
        'click [data-hook~=reset]': 'resetCollection'
    },
    render: function () {
        this.renderWithTemplate();
        
        if (!this.collection.length)
        {
            this.fetchCollection();
        }
        this.renderCollection(this.collection, PlayerView, this.queryByHook('players-list'));
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    }
});
