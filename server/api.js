/*globals Mongo, HTTP, Players*/

// var Players = new Mongo.Collection('players');

var send = function( data )
{
    if ( typeof data === 'string' )
    {
      return data;
    }
    else if ( typeof data === 'object' )
    {
      return JSON.stringify( data );
    }
};

HTTP.methods(
{
  'api/players': function()
  {
      this.setContentType( 'application/json' );

      if ( this.method !== 'GET' )
      {
        this.setStatusCode(403);
        return 'Only GET requests allowed.';
      }

      var sort = this.query.sort === 'asc' ? 1 : -1;

      return send( Players.find( {}, { sort: { score:sort, name:1 } } ).fetch() );

  },

  'api/players/:name': function()
  {
      this.setContentType( 'application/json' );

      if ( this.method !== 'GET' )
      {
        this.setStatusCode( 403 );
        return send(
        {
          code: 403,
          status: 'Only GET requests allowed.'
        } );
      }

      if ( this.params.name )
      {
        var player = Players.findOne( { name: this.params.name } );
        if ( player )
        {
          return send( player );
        }

        this.setStatusCode( 404 );
        return send(
        {
          code: 404,
          status: 'This player doesn\'t exist.'
        } );
      }
      return send( Players.find( {}, { sort: { score:-1, name:1 } } ).fetch() );

  }
});
