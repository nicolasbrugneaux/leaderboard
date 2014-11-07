var AmpersandModel = require('ampersand-model');
var Player      = require( './player' );


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['string']
    },
    derived:
    {
      player :
      {
        deps: ['id'],
        fn : function ( )
        {
            var player = new Player( { id: this.id });
            player.fetch();

            return player;
        }

      },
      loggedIn :
      {
        //basic check against an the id existing
        deps: ['id'],
        fn : function ( )
        {
            return ( this.id ) ? true : false;
        }

      },
      isAdmin :
      {
        deps: ['player'],
        fn : function ( )
        {
            console.log( 'lalala',this.player );
            return  this.player.isAdmin;
        }

      }

    }
});
