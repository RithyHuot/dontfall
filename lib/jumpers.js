import Game from './game.js';
import StartPage from './start_page.js';
import newGame from './new_game.js';

document.addEventListener('DOMContentLoaded', () => {
  let game = new newGame();
  game.startPage();
});
