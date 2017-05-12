import Game from './game.js';

class StartPage {
  constructor(stage){
    this.stage = stage;
    this.handleStart = this.handleStart.bind(this);
  }

  createPage(){
    this.gameTitle = new createjs.Text("Don't Fall!", 'bold 100px Arial', 'white');
    this.startGame = new createjs.Text('Press s to start', '28px Arial', 'white');
    this.directionOne = new createjs.Text('Use up arrow to jump', '28px Arial', 'white');
    this.directionTwo = new createjs.Text('To double jump, hit the up arrow key twice', '28px Arial', 'white');

    this.gameTitle.y = 100;
    this.gameTitle.x = 225;
    this.startGame.y = 400;
    this.startGame.x = 250;
    this.directionOne.y = 450;
    this.directionOne.x = 250;
    this.directionTwo.y = 500;
    this.directionTwo.x = 250;

    this.stage.addChild(this.gameTitle);
    this.stage.addChild(this.startGame);
    this.stage.addChild(this.directionOne);
    this.stage.addChild(this.directionTwo);

    this.stage.update();

    document.addEventListener('keydown', this.handleStart);
  }

  handleStart(e){
    if (e.key === 's') {
      let canvas = document.getElementById('jumperCanvas');
      this.stage.removeChild(this.gameTitle);
      this.stage.removeChild(this.startGame);
      this.stage.removeChild(this.directionOne);
      this.stage.removeChild(this.directionTwo);

      canvas.style.background = 'linear-gradient(blue, white)';
      let game = new Game(this.stage, this.handleStart);
      game.start();
    }
  }
}

export default StartPage;
