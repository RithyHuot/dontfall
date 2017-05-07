import Jumper from './jumper.js';
import Platform from './platform.js';
import newGame from './new_game.js';

class Game {
  constructor(stage, world) {
    this.stage = stage;
    this.world = world;
    this.platforms = [];
    this.jumper = new Jumper(stage);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.tick = this.tick.bind(this);

    this.lastPlatformX = 0;
    this.generatePlatform();
    this.movePlatformToEnd = this.movePlatformToEnd.bind(this);

    this.handleScore();

    this.handleNewGame = this.handleNewGame.bind(this);
  }

  generatePlatform(){
    const platform = new Platform(this.stage,this.world);
    this.platforms.push(platform);
    let x = Math.random()*100 + 350;

    for (let i = 0; i < 3; i++) {
      let y = Math.random()*200 + 300;
      let newPlatform = new Platform(this.stage, this.world, x, y);
      this.platforms.push(newPlatform);

      this.lastPlatformX = x;
      x += Math.random()*100 + 350;
    }
  }


  movePlatformToEnd(platform, jumperBounds) {
    if (jumperBounds.x > platform.platform.x + 600) {
      this.lastPlatformX += Math.random()*100 + 350;
      platform.platform.x = this.lastPlatformX;
      platform.platform.y = Math.random()*200 + 300;
    }

    this.stage.update();
  }

  tick(e) {
    const { doubleJump, velocity, jumper } = this.jumper;
    let newY;
    let platformX;

    if (!this.onGround || doubleJump) {
      newY = velocity.y += 1;
    }

    this.platforms.forEach((platform) => {
      let platformBounds = platform.platform.getTransformedBounds();
      let jumperBounds = jumper.getTransformedBounds();
      this.movePlatformToEnd(platform, jumperBounds);

      if (jumperBounds.intersects(platformBounds)) {
        if (platformBounds.y > jumperBounds.y && velocity.y > 0) {
          jumper.y = platformBounds.y - 100;
          this.onGround = true;
          platformX = platformBounds.x + platformBounds.width;
        }
      }
    });

    if ( this.onGround) {
      this.onGround = true;
      jumper.x += velocity.x;
      this.score.x = jumper.x - 250;
      this.score.text = `Score: ${Math.round(jumper.x)}`;

      if (jumper.x > this.stage.canvas.width*0.3) {
        this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
      }

      if (platformX < jumper.getTransformedBounds().x) {
        this.onGround = false;
      }
    } else {

      let jumperY = jumper.y + newY;
      let jumperX = jumper.x + velocity.x;

      if (jumperY > 600) {
        this.handleGameOver();
        this.gameover.y = 150;
        this.gameover.x = jumper.x - 50;
        this.stage.addChild(this.gameover);
        createjs.Ticker.removeEventListener('tick', this.tick);
        this.handleNewGame();
      } else {

        this.lastPositionY = jumper.y;
        this.lastPositionX = jumper.x;

        jumper.y += newY;
        jumper.x += velocity.x;
        this.score.x = jumper.x - 250;
        this.score.text = `Score: ${Math.round(jumper.x)}`;

        if (jumper.x > this.stage.canvas.width*0.3) {
          this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
        }
      }
    }

    this.stage.update(e);
  }

  start(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', this.tick);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        this.handleKeyDown();
      }
    });
  }

  handleNewGame(){
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        let game = new newGame();
        game.startGame();
      }
    });
  }

  // handlePause(){
  //   document.addEventListener('keydown', (e) => {
  //     if (e.key === p) {
  //
  //     }
  //   });
  // }

  reset() {
    this.jumper.y = this.jumper.y - 100;
    this.jumper.velocity.y = -15;
  }

  handleKeyDown(e) {
    const { velocity } = this.jumper;
    if (this.onGround) {
      this.onGround = false;
      this.doubleJump = true;
      this.reset();
    } else if (this.doubleJump) {
      this.doubleJump = false;
      this.reset();
    }
  }

  handleScore(){
    this.score = new createjs.Text(`Score: 0`, "40px Arial");
    this.stage.addChild(this.score);
  }

  handleGameOver(){
    this.gameover = new createjs.Text('Game Over!', '100px Arial');
  }
}

export default Game;
