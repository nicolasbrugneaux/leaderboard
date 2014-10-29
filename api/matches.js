/*jshint eqnull: true*/
var parse   = require( 'co-body' );
var http    = require( 'http' );
var Match   = require( '../models/match' );
var r       = require( '../thinky.js' ).r;

// Create a new match
module.exports.createMatch = function* create( next )
{
    this.type = 'application/json';

    try
    {
        var data = yield parse( this );
        data.date = data.date || r.now();
        data.lame = !!data.lame;

        var match = new Match( data );

        yield match.save();

        this.body = JSON.stringify( match );
        this.status = 201;
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};
