import Jumper from './jumper.js';
import Platform from './platform.js';
import newGame from './new_game.js';
import Enemy from './enemy.js';

class Game {
  constructor(stage, world, cb) {
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
    this.handleStart = cb;

    this.enemies = [];
    this.generateEnemy();

    this.life = 25;
  }

  generatePlatform(){
    if (this.platforms.length < 4) {
      const platform = new Platform(this.stage,this.world);
      this.platforms.push(platform);
      let x = Math.random()*100 + 350;

      for (let i = 0; i < 2; i++) {
        let y = Math.random()*200 + 350;
        let newPlatform = new Platform(this.stage, this.world, x, y);
        this.platforms.push(newPlatform);

        this.lastPlatformX = x;
        x += Math.random()*100 + 350;
      }
    }
  }

  movePlatformToEnd(platform, jumperBounds) {
    if (jumperBounds.x > platform.platform.x + 600) {
      this.lastPlatformX += Math.random()*100 + 350;
      platform.platform.x = this.lastPlatformX;
      platform.platform.y = Math.random()*200 + 350;
      this.stage.update();
    }
  }

  generateEnemy(){
    let x = 6000;

    for (let i = 0; i < 4; i++) {
      let y = Math.random()*300 + 200;
      x += Math.random()*100 + 400;
      let enemy = new Enemy(this.stage, this.world, x, y);
      this.enemies.push(enemy);

      this.lastEnemy = x;
    }
  }

  moveEnemyToEnd(enemy, jumperBounds) {
    if (jumperBounds.x > enemy.enemy.x + 600) {
      this.lastEnemy += Math.random()*100 + 700;
      enemy.enemy.x = this.lastEnemy;
      enemy.enemy.y = Math.random()*200;
      this.stage.update();
    }
  }

  tick(e) {
    const { doubleJump, velocity, jumper } = this.jumper;
    let newY;
    let platformX;

    if (!this.onGround || doubleJump) {
      newY = velocity.y += 1;
    }

    document.removeEventListener('keydown', this.handleNewGameKey);
    document.removeEventListener('keydown', this.handleStart);

    let jumperBounds = jumper.getTransformedBounds();
    this.platforms.forEach((platform) => {
      let platformBounds = platform.platform.getTransformedBounds();
      this.movePlatformToEnd(platform, jumperBounds);

      if (jumperBounds.intersects(platformBounds)) {
        if (platformBounds.y > jumperBounds.y && velocity.y > 0 && platformBounds.y > this.lastPositionY + 100) {
          jumper.y = platformBounds.y - 100;
          this.onGround = true;
          platformX = platformBounds.x + platformBounds.width;
        }
      }
    });

    this.enemies.forEach((enemy) => {
      enemy.enemy.x -= 15;
      enemy.enemy.y += Math.floor(Math.random()*1);

      let enemyBounds = enemy.enemy.getTransformedBounds();
      this.moveEnemyToEnd(enemy, jumperBounds);

      if (jumperBounds.intersects(enemyBounds) && jumperBounds.x > enemyBounds.x - 5) {
        this.life -= 1;
        if (this.life === 0) {
          this.handleGameOver();
          this.gameover.y = 100;
          this.gameover.x = jumper.x - 50;
          this.gamereset.y = 200;
          this.gamereset.x = jumper.x - 125;
          this.stage.addChild(this.gameover);
          this.stage.addChild(this.gamereset);
          createjs.Ticker.removeEventListener('tick', this.tick);
          this.handleNewGame();
        }
      }

    });

    if (this.onGround) {
      this.onGround = true;
      jumper.x += velocity.x;

      if (jumper.x > 1000 & velocity.x < 6) {
        velocity.x += 1;
      } else if( jumper.x > 5000 & velocity.x < 8) {
        velocity.x += 1;
      } else if ( jumper.x > 10000 & velocity.x < 10) {
        velocity.x += 1;
      } else if (jumper.x > 20000 & velocity.x < 13) {
        velocity.x += 1;
      } else if (jumper.x > 40000 & velocity.x < 25) {
        velocity.x += 1;
      }

      this.score.x = jumper.x - 250;
      this.score.text = `Score: ${Math.round(jumper.x)}`;
      this.lifeText.x = jumper.x - 250;
      this.lifeText.y = 50;
      this.lifeText.text = `HP: ${this.life}`;
      if (jumper.x > this.stage.canvas.width*0.3) {
        this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
      }

      if (platformX < jumper.getTransformedBounds().x) {
        this.onGround = false;
      }

    } else {

      let jumperY = jumper.y + newY;
      let jumperX = jumper.x + velocity.x;

      if (jumperY >= 600) {
        this.handleGameOver();
        this.gameover.y = 100;
        this.gameover.x = jumper.x - 50;
        this.gamereset.y = 200;
        this.gamereset.x = jumper.x - 125;
        this.stage.addChild(this.gameover);
        this.stage.addChild(this.gamereset);
        createjs.Ticker.removeEventListener('tick', this.tick);
        this.handleNewGame();
      }
      if (jumperY < 600 ){

        this.lastPositionY = jumper.y;
        this.lastPositionX = jumper.x;

        jumper.y += newY;
        jumper.x += velocity.x;
        this.score.x = jumper.x - 250;
        this.score.text = `Score: ${Math.round(jumper.x)}`;
        this.lifeText.x = jumper.x - 250;
        this.lifeText.y = 50;
        this.lifeText.text = `HP: ${this.life}`;

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
    document.addEventListener('keydown', this.handleNewGameKey);
  }

  handleNewGameKey(e) {
    if (e.key === 'Enter') {
      // this.stage.removeAllChildren();
        let game = new newGame();
        game.startGame();
      }
  }

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
    this.lifeText = new createjs.Text(`HP: ${this.life}`, "40px Arial");
    this.stage.addChild(this.score);
    this.stage.addChild(this.lifeText);
  }

  handleGameOver(){
    this.gameover = new createjs.Text('Game Over!', '100px Arial');
    this.gamereset = new createjs.Text('Press Enter to play again', '60px Arial');
  }
}

export default Game;
