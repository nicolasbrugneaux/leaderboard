/*globals Mongo, Template, Meteor, Session, Players*/

var Validation =
{
    clear : function()
    {
        return Session.set( 'error', undefined );
    },
    set_error : function( message )
    {
        return Session.set( 'error', message );
    },
    valid_name : function( name )
    {
        name = name.trim();
        this.clear();

        if ( name.length === 0 )
        {
            this.set_error( 'Name can\'t be blank' );
            return false;
        }
        else if ( this.player_exists( name ) )
        {
            this.set_error( 'Player already exists' );
            return false;
        }
        else
        {
            return name;
        }
    },
    player_exists : function( name )
    {
        return Players.findOne({name: name});
    }
};

var getHottest = function()
{
    var _players = Players.find({}, {limit: 25, sort: {score: 1}}).fetch();
    var _hottest = null;
    var _player;

    for ( var i = 0, length = _players.length; i < length; i++ )
    {
        _player = _players[i];

        if ( !_hottest ||
            ( _player.streak &&
            ( _hottest.streak < _player.streak || !_hottest.streak ) ) )
        {
            _hottest = _player;
        }
    }

    return _hottest;
};


var isAdmin = function()
{
    var user = Meteor.user();
    return user && user.username === 'admin';
};

Template.leaderboard.helpers(
{
    isAdmin : isAdmin,
    players : function ()
    {
        // return Players.aggregate(
        // {
        //     $project :
        //     {
        //         _id     : 0,
        //         total   : { $add : ['$losses', '$wins'] },
        //         wins    : '$wins',
        //         losses  : '$losses',
        //         streak  : '$streak',
        //         name    : '$name',
        //         _score  : '$score'
        //     },
        //     $sort : { score: -1, wins: -1, total: -1, streak: -1, name: 1 },
        //     $limit : 25
        // } );
        return Players.find( {},
        {
            sort: { score: -1, wins: -1, total: -1, streak: -1, name: 1 },
            limit: 25
        } );
    },
    selected: function()
    {
        var player = Players.findOne( Session.get( 'selected_player' ) );
        return isAdmin() && player;
    }
} );

Template.player.helpers(
{
    isAdmin : isAdmin,
    selected : function ()
    {
        return isAdmin() &&
            Session.equals( 'selected_player', this._id) ? 'active' : '';
    },
    onFire : function()
    {
        return this.streak === getHottest().streak;
    }
} );

Template.new_player.helpers(
{
    isAdmin : isAdmin,
    error : function()
    {
        return Session.get( 'error' );
    }
} );

Template.leaderboard.events(
{
    'click button.js-win' : function ()
    {
        var total = Session.get( 'selected_player__losses' ) +
                    Session.get( 'selected_player__wins' ) + 1;

        var score = ( Session.get( 'selected_player__wins' ) + 1 ) / total * 100;
        Session.set( 'selected_player__wins',
            Session.get( 'selected_player__wins' ) + 1 );

        Players.update( Session.get( 'selected_player' ),
        {
            $inc: { wins: 1, streak: 1 },
            $set: { score: score, _score: score.toFixed( 2 ) }
        } );
    },
    'click button.js-loss' : function ()
    {
        var total = Session.get( 'selected_player__losses' ) +
                    Session.get( 'selected_player__wins' ) + 1;

        var score = ( Session.get( 'selected_player__wins' ) ) / total * 100;
        Session.set( 'selected_player__losses',
            Session.get( 'selected_player__losses' ) + 1 );

        Players.update( Session.get( 'selected_player' ),
        {
            $inc: { losses: 1 },
            $set: { streak: 0, score: score, _score: score.toFixed( 2 ) }
        } );
    }
} );

Template.player.events(
{
    'click .js-delete' : function()
    {
        Players.remove( this._id );
    },
    'click': function () {
        Session.set( 'selected_player', this._id );
        Session.set( 'selected_player__wins', +this.wins || 0 );
        Session.set( 'selected_player__losses', +this.losses || 0 );
        Session.set( 'selected_player__total', this.total || 0 );
    }
});

Template.new_player.events(
{
    'click .js-add': function ()
    {
        var new_player  = document.getElementsByClassName( 'js-new_player_name' )[0];
        var name        = Validation.valid_name( new_player.value );

        if ( name )
        {
            Players.insert(
            {
                name: name,
                score: null,
                _score: null,
                wins: 0,
                losses: 0,
                streak : 0
            } );
        }
        new_player.value = '';
    }
});
