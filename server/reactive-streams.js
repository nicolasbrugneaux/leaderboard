/*globals Meteor*/

var Notifications = new Meteor.Stream( 'server-notifications' );

Notifications.permissions.read( function( eventName )
{
    return eventName === 'chat';
} );
Notifications.permissions.write( function( eventName )
{
    return eventName === 'chat';
} );

// Notifications.on( 'message', function( message, username )
// {
//     console.log( 'something is happening')
//     Notifications.emit('server_message', message, Date.now(), username );
// } );
