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
                name        : 'firstName',
                placeholder : 'First Name',
                parent      : this
            } ),
            new ExtendedInput(
            {
                name        : 'lastName',
                placeholder : 'Last Name',
                parent      : this
            } ),
            new ExtendedInput(
            {
                name        : 'email',
                placeholder : 'your.face@sociomantic.com',
                parent      : this
            } ),
            new ExtendedInput(
            {
                name        : 'password',
                type        : 'password',
                placeholder : 'Password',
                parent      : this
            } ),
            new ExtendedInput(
            {
                type        : 'password',
                name        : 'repeat-password',
                placeholder : 'Repeat your Password',
                parent      : this,
                tests       :
                [
                    function( value )
                    {
                        if ( value !== this.parent._fieldViews.password.value )
                        {
                            return 'It must be the same password.';
                        }
                    }
                ]
            } )
        ];
    }
});
