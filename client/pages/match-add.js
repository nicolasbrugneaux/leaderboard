/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var MatchForm = require('../forms/match');
var PersonView = require('../views/person');
var People = require('../models/persons');

console.log( ' THISISHAPPENING' );

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
        console.log( 'YES' );
        console.log( this.subviews );

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
