import Game from './game.js';
import StartPage from './start_page.js';

class newGame {
  constructor(stage, world) {
    this.canvas = document.getElementById('jumperCanvas');
    this.canvas.width = 900;
    this.canvas.height = 600;

    this.stage = new createjs.Stage(this.canvas);
    this.world = new createjs.Container();

    this.stage.addChild(this.world);
  }

  startPage() {
    const start = new StartPage(this.stage, this.world);
    start.createPage();
  }

  startGame(){
    let intro = document.getElementById('intro');
    intro.style.visibility = 'hidden';
    this.canvas.style.background = 'linear-gradient(rgb(125, 19, 1), rgb(52, 11, 11))';
    const game = new Game(this.stage, this.world);
    game.start();
  }
}
// const newGame = () => {
//   let canvas = document.getElementById('jumperCanvas');
//   canvas.width = 900;
//   canvas.height = 600;
//   const stage = new createjs.Stage(canvas);
//   const world = new createjs.Container();
//   stage.addChild(world);
//
//   // const game = new Game(stage, world);
//   // game.start();
//
//   const startPage = () => {
//     start = new StartPage(stage, world);
//     start.createPage();
//   };
// };

export default newGame;
