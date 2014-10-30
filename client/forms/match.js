/*global app*/
var FormView    = require('ampersand-form-view');
var SelectView  = require('ampersand-select-view');
// var templates   = require('../templates');
// var ExtendedInput = InputView.extend({
//     template: templates.includes.formInput()
// });

module.exports = FormView.extend(
{
    fields: function()
    {
        return [
            new SelectView(
            {
                label           : 'Winner',
                name            : 'winnerId',
                options         : app.players,
                // placeholder: 'Champion',
                idAttribute     : 'id',
                textAttribute   : 'fullName',
                parent          : this,
                value           : app.players.at(0).id
            } ),
            new SelectView(
            {
                label           : 'loser',
                name            : 'loserId',
                options         : app.players,
                placeholder     : 'Looooooser',
                parent          : this,
                idAttribute     : 'id',
                textAttribute   : 'fullName',
                value           : app.players.at(1).id
            } )
        ];
    }
} );
