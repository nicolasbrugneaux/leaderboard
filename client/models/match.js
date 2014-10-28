var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        winner: ['number', true, ],
        loser: ['number', true, ],
        winnerName: ['string', true, ''],
        loserName: ['string', true, '']
    },
    session: {
        selected: ['boolean', true, false]
    }
});
