module.exports =
{
    rethinkdb:
    {
        host: 'localhost',
        port: 28015,
        authKey: '',
        db: 'pool_party'
    },
    redis:
    {
        host: 'localhost',
        port: 6379,
        pass: '',
        db: 'sessions'
    },
    koa:
    {
        port: 8888,
        keys: ['I love playing pool. Also this is super secure now.'],
        tls_key: './pool_party-key.pem',
        tls_cert: './pool_party-cert.pem',
    },
    isDev: true
};
