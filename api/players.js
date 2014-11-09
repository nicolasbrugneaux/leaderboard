/*jshint eqnull: true*/
var parse   = require( 'co-body' );
var http    = require( 'http' );
var Player  = require( '../models/player' );
var r       = require( '../thinky' ).r;
var crypto  = require( '../crypto' );

// Retrieve all players
module.exports.getAll = function* getAll( next )
{
    this.type = 'application/json';

    try
    {
        var players = yield Player.getView().run();
        this.body = JSON.stringify( players );
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};

// Retrieve a player by id
module.exports.get = function* get( next )
{
    this.type = 'application/json';

    try
    {
        var id = this.params.id;
        var player = yield Player.get( id ).getView().run();

        if ( !player )
        {
            this.status = 404;
            player = {};
        }

        this.body = JSON.stringify( player );

    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};

// Create a new player
module.exports.create = function* create( next )
{
    this.type = 'application/json';

    try
    {
        var data        = yield parse( this );
        data.password   = yield crypto.hash( data.password );
        var player      = new Player( data );

        var existing = yield Player.filter( { email: data.email } ).limit( 1 ).run();

        if ( existing.length !== 0 )
        {
            throw new Error( 'This email is already taken.' );
        }

        yield player.save();

        this.body = JSON.stringify( player.getView() );
        this.status = 201;

        if ( !this.session[player.id] )
        {
            this.session[player.id] = true;
        }
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};

// Update a player
module.exports.update = function* update( next )
{
    this.type = 'application/json';

    try
    {
        var data = yield parse( this );
        delete data.password;

        if ( ( data == null ) || ( data.id == null ) )
        {
            throw new Error( 'The player must have a field `id`.' );
        }

        var player = yield Player.get( data.id ).run();
        yield player.merge( data ).save();

        this.body = JSON.stringify( player );
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};

// Delete a player
module.exports.del = function* del( next )
{
    this.type = 'application/json';

    try
    {
        var id = this.params.id;

        if ( id == null )
        {
            throw new Error('The player must have a field `id`.');
        }

        var player = yield Player.get( id ).run();
        yield player.delete();

        this.status = 204;
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};

module.exports.isLoggedIn = function* isLoggedIn( next )
{
    if ( this.session[this.sessionId] )
    {
        this.params.id = this.session[this.sessionId];
        yield next;
    }
    else
    {
        this.status = 204;
    }
};

// Delete a player
module.exports.login = function* login( next )
{
    this.type = 'application/json';

    try
    {
        var data = yield parse( this );

        if ( data.email == null )
        {
            throw new Error('You need to specify a username.');
        }

        var player = ( yield Player.filter( { email: data.email } ).limit( 1 ).run() )[0];

        if ( player == null )
        {
            throw new Error( 'The email is incorrect.' );
        }

        var correctPwd = yield crypto.compare( data.password, player.password );

        if ( !correctPwd )
        {
            throw new Error( 'The password is incorrect.' );
        }

        // do stuff set session
        if ( !this.session[this.sessionId] )
        {
            this.session[this.sessionId] = player.id;
        }
        this.body = JSON.stringify( player.getView() );
        this.status = 200;
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};


// Delete a player
module.exports.logout = function* logout( next )
{
    this.type = 'application/json';

    try
    {
        this.session[this.sessionId] = null;
        this.status = 204;
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }

    yield next;
};
