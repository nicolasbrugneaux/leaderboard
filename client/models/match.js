var AmpersandModel = require( 'ampersand-model' );


module.exports = AmpersandModel.extend(
{
    props :
    {
        id          : 'any',
        winnerId    : ['string', true ],
        loserId     : ['string', true ],
        // winnerName: ['string', true, ''],
        // loserName: ['string', true, ''],
        lame        : ['boolean', true, false],
        date        : ['date', true, function()
        {
            return new Date();
        } ]
    },
    session :
    {
        selected: ['boolean', true, false]
    }
} );
