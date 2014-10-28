/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var MatchForm = require('../forms/match');
var PlayerView = require('../views/player');
var Players = require('../models/players');
var Elo = require('elo-js');

module.exports = PageView.extend({
    pageTitle: 'add match',
    template: templates.pages.matchAdd,
    // events: {
    //     'click [data-hook~=setmatch]': 'setmatch',
    // },
    initialize: function (spec) {
        console.log( 'AN INIT' );


        if (!this.collection.length) {
        //if this needs to be fetched the rest needs to wait
        //im not sure how to run promises with this set up 
        //at the moment
            this.fetchCollection();
        }

    },
    updatePlayerRatings: function ( )
    {
        var data = this.form.getData();    
        var elo = new Elo();
        //elo logic should probably be on the server, and just
        //update the users there( after confirmation )
        data.winner.elo = elo.ifWins( data.winner.elo, data.loser.elo );;
        data.loser.elo = elo.ifLoses( data.loser.elo, data.winner.elo );;
        
        data.winner.save();
        data.loser.save();

        // app.navigate('/players');

        console.log( data.winner.elo );
        console.log( data.loser.elo );

        app.navigate('/collections');
        app.people.fetch();
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new MatchForm({
                    el: el,
                    submitCallback: function (data) {

                        //not sure why the select isnt returning the right
                        //value, should be according to git repo
                        //https://github.com/AmpersandJS/ampersand-select-view
                        data.winnerId = data.winnerId.id;
                        data.loserId = data.loserId.id;
                        console.log( 'Submitted match', data );
                        app.matches.create( data, {
                            wait: true,
                            success: function () {
                                this.updatePlayerRatings();

                            }
                        });
                    }
                });
            }
        }
    }
});
