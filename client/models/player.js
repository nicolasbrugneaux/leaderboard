var AmpersandModel  = require( 'ampersand-model' );


module.exports = AmpersandModel.extend(
{
    urlRoot        : '/api/players/',
    props :
    {
        id          : 'any',
        firstName   : ['string', true, ''],
        lastName    : ['string', true, ''],
        ranking     : ['number', true, 1200],
        wonMatches  : ['array', true],
        lostMatches : ['array', true],
        email       : ['string', true, ''],
        password    : ['string', true],
        isAdmin     : ['boolean', false]
    },
    session :
    {
        selected    : ['boolean', true, false]
    },
    derived :
    {
        fullName :
        {
            deps    : ['firstName', 'lastName'],
            fn      : function()
            {
                return this.firstName + ' ' + this.lastName;
            }
        },
        matches :
        {
            deps    : ['wonMatches', 'lostMatches'],
            fn      : function()
            {
                return this.wonMatches.concat( this.lostMatches );
            }
        },
        avatar :
        {
            deps    : ['firstName', 'lastName'],
            fn      : function()
            {
                return 'http://robohash.org/' +
                    encodeURIComponent( this.fullName) + '?size=80x80';
            }
        },
        editUrl :
        {
            deps    : ['id'],
            fn      : function()
            {
                return '/player/' + this.id + '/edit';
            }
        },
        viewUrl :
        {
            deps    : ['id'],
            fn      : function()
            {
                return '/player/' + this.id;
            }
        }
    }
} );
