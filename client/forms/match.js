var FormView = require('ampersand-form-view');
var SelectView = require('ampersand-select-view');
var templates = require('../templates');
// var ExtendedInput = InputView.extend({
//     template: templates.includes.formInput()
// });

module.exports = FormView.extend({
    fields: function () {

        console.log( this );

        return [
            new SelectView({
                label: 'Winner',
                name: 'winner',
                options: app.people,
                // placeholder: 'Champion',
                idAttribute: 'id',
                // you can also specify which model attribute to use as the name
                textAttribute: 'fullName',
                parent: this
            }),
            new SelectView({
                label: 'loser',
                name: 'loser',
                options: app.people ,
                placeholder: 'Looooooser',
                parent: this,
                idAttribute: 'id',
                // you can also specify which model attribute to use as the name
                textAttribute: 'fullName'
            })
        ];
    }
});
