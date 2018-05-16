const Server = require('boardgame.io/server');

const server = Server({
  games: [game1, game2, ...],

  // Optional, if you want to hook it up to a
  // custom storage backend not supported by
  // the framework. DbImpl must implement the
  // same interface shown in db.js:
  // https://github.com/google/boardgame.io/blob/master/src/server/db.js
  db: new DbImpl(),
});

server.run(8000);