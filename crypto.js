var bcrypt = require( 'bcrypt' );

var _genSalt = function( rounds, seedLength )
{
    return function( done )
    {
        bcrypt.genSalt(rounds, seedLength, done);
    };
};

var _hash = function( s, salt )
{
    return function( done )
    {
        bcrypt.hash( s, salt, done );
    };
};

var _compare = function(s, hash)
{
    return function( done )
    {
        bcrypt.compare( s, hash, done );
    };
};

exports.hash = function* hash( password )
{
    var salt = yield _genSalt( 10 );
    return yield _hash( password, salt );
};

exports.compare = function* compare( password, userPassword )
{
    return yield _compare( password, userPassword );
};