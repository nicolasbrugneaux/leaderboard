/*globals Meteor, Template, NotificationCollection, Session, Name, Deps*/
var Notifications = new Meteor.Stream( 'server-notifications' );

var getUsername = function( id )
{
    Meteor.subscribe( 'user-info', id );
    Deps.autorun( function()
    {
        var user = Meteor.users.findOne( id );

        if ( user )
        {
            Session.set( 'user-' + id, user.username );
        }
    });
};

var DOM =
{
    getMessage : function()
    {
        var message_input = document.getElementsByClassName('js-chat-message')[0].firstElementChild;
        var val = message_input.value.trim();
        message_input.value = '';
        return val;
    }
};

var DateHelper =
{
    suffix : function(i, type)
    {
        if ( type === 'month' || type === 'm' )
        {
            i += 1;
        }
        if ( i < 10 )
        {
            return '0' + i;
        }
        else
        {
            return '' + i;
        }
    },

    prettify : function( timestamp )
    {
        var date, day_diff, diff, res;
        date = new Date( timestamp );
        diff = ( ( new Date() ).getTime() - date.getTime() ) / 1000;
        day_diff = Math.floor( diff / 86400 );

        if ( isNaN( day_diff ) || day_diff < 0 )
        {
            return null;
        }
        if ( day_diff === 0 )
        {
            switch (true)
            {
                case diff < 60:
                  return 'just now';

                case diff < 120:
                  return '1 minute ago';

                case diff < 3600:
                  return Math.floor( diff / 60 ) + ' minutes ago';

                case diff < 7200:
                  return '1 hour ago';

                case diff < 86400:
                  return Math.floor( diff / 3600 ) + ' hours ago';
            }
        }
        else if ( day_diff === 1 )
        {
            return 'Yesterday';
        }
        else if ( day_diff < 7 )
        {
            return day_diff + ' days ago';
        }
        else if ( day_diff < 31 )
        {
            return Math.ceil( day_diff / 7 ) + ' weeks ago';
        }
        else
        {
            res = '';
            res += DateHelper.suffix( date.getDate(), 'day' ) + '/';
            res += DateHelper.suffix( date.getMonth(), 'month' ) + '/';
            return res += date.getFullYear();
        }

    }
};

Notifications.on( 'chat', function( message )
{
    NotificationCollection.insert( message );
} );

Notifications.on( 'connection', function( name )
{
    console.log( name + ' has connected' );
} );

var EVENTS =
{
    sendMessage : function()
    {
        var message = DOM.getMessage();

        if ( message )
        {
            message =
            {
                message : message,
                userId  : Meteor.userId(),
                time    : new Date().getTime()
            };

            Notifications.emit( 'chat', message );
            message.userId = 'me';
            NotificationCollection.insert( message );
        }
    }
};

Template.chat.helpers(
{
    isLogged : function()
    {
        return Meteor.user();
    },

    hasMessages : function()
    {
        return NotificationCollection.find().fetch().length > 0;
    },

    user: function()
    {
        return Meteor.user().username;
    },

    username : function()
    {
        if ( this.userId === 'me' )
        {
            return this.userId;
        }
        else if ( this.userId )
        {
            getUsername( this.userId );

            return Session.get( 'user-' + this.userId );
        }
        else
        {
            return 'anonymous-' + this.subscriptionId;
        }
    },

    messages : function()
    {
        return NotificationCollection.find();
    },

    dateString : function()
    {
        return DateHelper.prettify( this.time );
    }
} );

Template.chat.events(
{
    'click .js-chat-show' : function()
    {

    },

    'click .js-chat-logout' : function()
    {
        Name.remove({});
        Session.set( 'username', null );
    },

    // 'click .js-chat-login' : EVENTS.login,

    // 'keypress .js-chat-login-form input' : function( event )
    // {
    //     if ( event.charCode === 13 )
    //     {
    //         event.stopPropagation();

    //         EVENTS.login();

    //         return false;
    //     }
    // },

    'click .js-chat-clear' : function()
    {
        NotificationCollection.remove({});
    },

    'click .js-chat-send' : EVENTS.sendMessage,

    'keypress .js-chat-message input' : function( event )
    {
        if ( event.charCode === 13 )
        {
            event.stopPropagation();

            EVENTS.sendMessage();

            return false;
        }
    }
} );
