import { Client } from 'boardgame.io/react';

const App = Client({
  // The return value of Game().
  game: game,

  // The number of players.
  numPlayers: 2,

  // The React component representing your game board.
  board: Board,

  // Set to true to enable sending move updates to the
  // server via WebSockets. Can also be set to
  // { server: 'hostname:port' }
  // to specify a socket server that's different from
  // the one that served up the page.
  multiplayer: false,

  // Set to false to disable the Debug UI.
  debug: true,
});

ReactDOM.render(<App />, document.getElementById('app'));