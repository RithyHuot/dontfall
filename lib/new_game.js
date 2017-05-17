import Game from './game.js';
import StartPage from './start_page.js';

class newGame {
  constructor(stage, cb) {
    this.canvas = document.getElementById('jumperCanvas');
    this.canvas.width = 900;
    this.canvas.height = 600;

    if (cb) {
      document.removeEventListener('keydown', cb);
    }

    if (stage) {
      stage.removeAllChildren();
      stage.removeAllEventListeners();
      stage.enableDOMEvents(false);
      stage.canvas = this.canvas;
      stage.clear();
    }

    this.stage = new createjs.Stage(this.canvas);
  }

  startPage() {
    this.stage.removeAllChildren();
    this.start = new StartPage(this.stage);
    this.start.createPage();
  }

  startGame(){
    this.stage.removeAllChildren();
    // this.canvas.style.background = 'linear-gradient(blue, white)';
    this.canvas.style.backgroundImage = "url('assets/gamebg.jpg')";
    this.stage.canvas.style.filter = 'invert(0%)';
    const game = new Game(this.stage);
    game.start();
  }
}

export default newGame;
