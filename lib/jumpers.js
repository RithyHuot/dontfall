import Background from './background.js';
import { getHeight, getWidth } from './utils.js';
import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('jumperCanvas');
  // canvas.width = getWidth();
  // canvas.height = getHeight();
  canvas.width = 900;
  canvas.height = 600;
  const stage = new createjs.Stage(canvas);
  const world = new createjs.Container();
  stage.addChild(world);

  new Game(stage);
});
