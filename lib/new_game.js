import Game from './game.js';
import StartPage from './start_page.js';

class newGame {
  constructor(stage, world, cb) {
    this.canvas = document.getElementById('jumperCanvas');
    this.canvas.width = 900;
    this.canvas.height = 600;

    if (cb) {
      document.removeEventListener('keydown', cb);
    }

    if (stage && world) {
      stage.removeAllChildren();
      world.removeAllChildren();
      this.stage = stage;
      this.world = world;
    } else {
      this.stage = new createjs.Stage(this.canvas);
      this.world = new createjs.Container();
    }

    this.stage.addChild(this.world);
  }

  startPage() {
    this.start = new StartPage(this.stage, this.world);
    this.start.createPage();
  }

  startGame(){
    // let intro = document.getElementById('intro');
    // intro.style.visibility = 'hidden';
    this.canvas.style.background = 'linear-gradient(blue, white';
    const game = new Game(this.stage, this.world);
    game.start();
  }
}

export default newGame;
