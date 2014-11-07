/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var MatchAddPage = require('./pages/match-add');
var Players = require('./pages/players');
var PlayerAddPage = require('./pages/player-add');
var PlayerEditPage = require('./pages/player-edit');
var PlayerViewPage = require('./pages/player-view');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'players': 'players',
        'me/:id': 'login',
        'info': 'info',
        'match/add': 'matchAdd',
        'player/add': 'playerAdd',
        'player/:id': 'playerView',
        'player/:id/edit': 'playerEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    // ------- ROUTE HANDLERS ---------
    login: function ( id ) {
      console.log( 'this login page hing');
        me.id = id;

        // me.player = new  Person({id: 123});
        // me.player.fetch();

        this.trigger('page', new HomePage({
            model: me
        }));
    },

    players: function () {
        this.trigger('page', new Players({
            model: me,
            collection: app.players
        }));
    },

    playerAdd: function () {
        this.trigger('page', new PlayerAddPage());
    },

    playerEdit: function (id) {
        this.trigger('page', new PlayerEditPage({
            id: id
        }));
    },

    playerView: function (id) {
        this.trigger('page', new PlayerViewPage({
            id: id
        }));
    },

    matchAdd: function () {

      if( me.isAdmin )
      {
          this.trigger('page', new MatchAddPage(
              {
                  collection: app.players
              }));

      }
      else
      {
          this.redirectTo('');
      }
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
