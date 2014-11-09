#Leaderboard

Work in progress. Attempt to create a nice and user-friendly sport leaderboard.
The idea comes from the numerous pool table games played at work, to have some kind of ranking.
The ranking will be mainly based on the [elo algorithm](https://github.com/nicolasbrugneaux/elo-js)

Built with :heart: and AmpersandJS, Koa, RethinkDB, Redis.

###Requirements

```sh
rethinkdb               # document storage
redis                   # session storage
node --version >= 0.11  # (harmony flag is used for generators and stuff.)
```
###Usage

```sh
npm install
npm start
```
