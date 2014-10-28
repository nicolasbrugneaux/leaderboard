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
    events: {
        'click [data-hook~=setmatch]': 'setmatch',
    },
    initialize: function (spec) {
        console.log( 'AN INIT' );

        if (!this.collection.length) {
            this.fetchCollection();
        }

    },
    setmatch: function ( )
    {
        var data = this.form.getData();    
        var elo = new Elo();
        //elo logic should probably be on the server, and just
        //update the users there( after confirmation )
        data.winner.elo = elo.ifWins( data.winner.elo, data.loser.elo );;
        data.loser.elo = elo.ifLoses( data.loser.elo, data.winner.elo );;
        
        // app.navigate('/players');

        console.log( data.winner.elo );
        console.log( data.loser.elo );

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
                    // submitCallback: function (data) {
                    //     console.log( 'Submitted' );
                    //     // app.match.create(data, {
                    //     //     wait: true,
                    //     //     success: function () {
                    //     //         app.navigate('/collections');
                    //     //         app.people.fetch();
                    //     //     }
                    //     // });
                    // }
                });
            }
        }
    }
});
