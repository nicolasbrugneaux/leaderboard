var compress    = require( 'koa-compress' );
var logger      = require( 'koa-logger' );
// var serve       = require( 'koa-static' );
var Route       = require( 'koa-router' );
// var jade         = require( 'koa-jade' );
var koa         = require( 'koa' );
var session     = require( 'koa-generic-session' );
var RedisStore  = require( 'koa-redis' );
var SSL         = require( 'koa-force-ssl' );
// var path        = require( 'path' );
var http        = require( 'http' );
var https       = require( 'https' );
var fs          = require( 'fs' );
var r           = require( 'rethinkdb' );
var Moonboots   = require( 'moonboots' );
var stylizer    = require( 'stylizer' );
var templatizer = require( 'templatizer' );

var getPath = function( path )
{
    return __dirname + '/' + path;
};

var config      = require( getPath( 'config' ) );
var api         = require( getPath( 'api' ) );

var app         = koa();
var route       = new Route();



// app.use( jade.middleware( {viewPath: getPath( 'views' )} ) );
/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
function* createConnection(next) {
    try{
        var conn = yield r.connect(config.rethinkdb);
        this._rdbConn = conn;
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

/*
 * Close the RethinkDB connection
 */
function* closeConnection(next) {
    this._rdbConn.close();
    yield next;
}

// configure our app
var clientApp = new Moonboots(
{
    jsFileName      : 'pool_party',
    cssFileName     : 'pool_party',
    resourcePrefix  : '/static/',
    main            : getPath( 'client/app.js' ),
    developmentMode : config.isDev,
    libraries       : [],
    stylesheets     :
    [
        getPath( 'public/css/bootstrap.css' ),
        getPath( 'public/css/app.css' )
    ],
    browserify      :
    {
        debug: false
    },
    beforeBuildJS   : function()
    {
        // This re-builds our template files from jade each time the app's main
        // js file is requested. Which means you can seamlessly change jade and
        // refresh in your browser to get new templates.
        if ( config.isDev )
        {
            templatizer( getPath( 'templates' ), getPath( 'client/templates.js' ) );
        }
    },
    beforeBuildCSS  : function( done )
    {
        // This re-builds css from stylus each time the app's main
        // css file is requested. Which means you can seamlessly change stylus files
        // and see new styles on refresh.
        if ( config.isDev )
        {
            stylizer(
            {
                infile      : getPath( 'public/css/app.styl' ),
                outfile     : getPath( 'public/css/app.css' ),
                development : true
            }, done );
        }
        else
        {
            done();
        }
    }
} );


var readStatic = function( type )
{
    return new Promise( function( resolve, reject )
    {
        if ( type === 'js' )
        {
            clientApp.jsSource( function( err, js )
            {
                if ( err )
                {
                    reject( err );
                }

                resolve( js );
            } );
        }
        else if ( type === 'css' )
        {
            clientApp.cssSource( function( err, css )
            {
                if ( err )
                {
                    reject( err );
                }

                resolve( css );
            } );
        }
        else if ( type === 'html' )
        {
            resolve( clientApp.htmlSource() );
        }
    } );
};

function* render()
{
    this.body = yield readStatic( 'html' );
}

route

// API
.get( '/api/players', api.players.getAll )
.get( '/api/players/:id', api.players.get )
.delete( '/api/players/:id', api.players.del )
.put( '/api/players/:id', api.players.update )
.post( '/api/players', api.players.create )

//matches
.post( '/api/matches', api.matches.createMatch )

.get( '/static/:file', function* serveStatic()
{
    try
    {
        if ( this.params.file === clientApp.jsFileName() )
        {
            this.type = 'application/javascript';
            this.body = yield readStatic( 'js' );
        }
        else if ( this.params.file === clientApp.cssFileName() )
        {
            this.type = 'text/css';
            this.body = yield readStatic( 'css' );
        }
    }
    catch( e )
    {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
} )

.post( '/api/login', api.players.login )
.post( '/api/logout', api.players.isLoggedIn, api.players.logout )
.get( '/api/isLoggedIn', api.players.isLoggedIn, api.players.get )

// CLIENT RENDERING
.get( /^(?!\/api\/).*/, render );

app.keys = config.koa.keys;
app.use( SSL( config.koa.port ) );
app.use( session(
{
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
    store: new RedisStore()
} ) );
app.use( logger() );
app.use( compress() );
// app.use( serve( path.join( getPath( 'public' ) ) ) );
app.use( createConnection );
app.use( route.middleware() );
app.use( closeConnection );


var options =
{
    key   : fs.readFileSync( config.koa.tls_key ),
    cert  : fs.readFileSync( config.koa.tls_cert )
};

if ( !module.parent )
{
    https.createServer( options, app.callback() ).listen( config.koa.port );
    console.log( 'listening on port ' + config.koa.port );
}
