var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});

module.exports = FormView.extend({
    fields: function () {
        console.log( 'player add model', this.model );
        return [
            new ExtendedInput({
                label: 'First Name',
                name: 'firstName',
                value: this.model && this.model.firstName,
                placeholder: 'First Name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Last Name',
                name: 'lastName',
                value: this.model && this.model.lastName,
                placeholder: 'Last Name',
                parent: this
            })
          
        ];
    }
});
