/*jshint eqnull: true*/

var parse     = require( 'co-body' );
var r         = require( 'rethinkdb' );
var http      = require( 'http' );

var Players = r.table( 'players' );
var Users   = r.table( 'users' );
var Player = require( '../models/player' );

// Retrieve all players
module.exports.getAll = function* getAll(next) {

    this.type = 'application/json';
    try{
        var players = yield Player.getView().run();
        this.body = JSON.stringify(players);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// Retrieve a player by id
module.exports.get = function* get(next) {

    this.type = 'application/json';
    try{
        var id = this.params.id;
        var player = yield Player.get(id).getView().run();
        if ( !player )
        {
            this.status = 404;
            player = {};
        }

        this.body = JSON.stringify(player);

    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// Retrieve all players by name
module.exports.getByName = function* getByName(name, next) {

    this.type = 'application/json';
    try{
        var cursor = yield Users.filter({firstName: name})
            .eqJoin('player_id', Players)
            .limit(1)
            .run(this._rdbConn);
        var players = yield cursor.toArray();

        if ( !players )
        {
            this.status = 404;
            players = [];
        }

        this.body = JSON.stringify( players.map( function( item )
        {
            delete item.right.user_id;
            return item.right;
        } ) );

    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// Create a new player
module.exports.create = function* create(next) {

    this.type = 'application/json';
    try{
        var player = yield parse(this);
        player.createdAt = r.now();
        var result = yield Players.insert(player, {returnChanges: true}).run(this._rdbConn);
        player = result.changes[0].new_val;
        this.body = JSON.stringify(player);
        this.status = 201;
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// Update a player
module.exports.update = function* update(next) {

    this.type = 'application/json';
    try{
        var player = yield parse(this);
        delete player._saving;
        if ((player == null) || (player.id == null)) {
            throw new Error('The player must have a field `id`.');
        }

        var result = yield Players.get(player.id).update(player, {returnChanges: true}).run(this._rdbConn);
        player = result.changes[0].new_val;
        this.body = JSON.stringify(player);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// Delete a player
module.exports.del = function* del(next)
{
    this.type = 'application/json';
    try{
        var id = this.params.id;
        if (id == null) {
            throw new Error('The player must have a field `id`.');
        }
        var result = yield Players.get(id).delete().run(this._rdbConn);
        this.status = 204;
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};
