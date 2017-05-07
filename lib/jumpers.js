import { getHeight, getWidth } from './utils.js';
import Game from './game.js';
import StartPage from './start_page.js';
import newGame from './new_game.js';

document.addEventListener('DOMContentLoaded', () => {
  // let canvas = document.getElementById('jumperCanvas');
  // canvas.width = 900;
  // canvas.height = 600;
  // const stage = new createjs.Stage(canvas);
  // const world = new createjs.Container();
  // stage.addChild(world);

  // const game = new Game(stage, world);
  // game.start();

  let game = new newGame();
  // game.startPage();
  game.startGame();
  // const startPage = new StartPage(stage, world);
  // startPage.createPage();
});
