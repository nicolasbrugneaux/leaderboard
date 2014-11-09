var FormView        = require( 'ampersand-form-view' );
var InputView       = require( 'ampersand-input-view' );
var templates       = require( '../templates' );
var ExtendedInput   = InputView.extend(
{
    template: templates.includes.formInput()
} );

module.exports = FormView.extend(
{
    fields : function()
    {
        return [
            new ExtendedInput(
            {
                name        : 'email',
                value       : this.model && this.model.email,
                placeholder : 'your.face@sociomantic.com',
                parent      : this
            }),
            new ExtendedInput(
            {
                name        : 'password',
                type        : 'password',
                value       : this.model && this.model.password,
                placeholder : 'Password',
                parent      : this
            } )
        ];
    }
} );
