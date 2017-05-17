import Jumper from './jumper.js';
import Platform from './platform.js';
import newGame from './new_game.js';
import Enemy from './enemy.js';
import Attack from './attack.js';

class Game {
  constructor(stage, cb) {
    this.stage = stage;
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

    this.handleNewGameKey = this.handleNewGameKey.bind(this);

    this.enemies = [];
    this.generateEnemy();

    this.life = 100;

    this.music = true;
    this.handleMusic = this.handleMusic.bind(this);
    this.handleMusicKey = this.handleMusicKey.bind(this);

    this.attackCount = 5;

    this.attacks = [];
    this.generateAttack = this.generateAttack.bind(this);
  }

  generatePlatform(){
    if (this.platforms.length < 4) {
      const platform = new Platform(this.stage);
      this.platforms.push(platform);
      let x = Math.random()*100 + 350;

      for (let i = 0; i < 2; i++) {
        let y = Math.random()*200 + 350;
        let newPlatform = new Platform(this.stage, x, y);
        this.platforms.push(newPlatform);

        this.lastPlatformX = x;
        x += Math.random()*100 + 350;
      }
    }
  }

  movePlatformToEnd(platform, jumperBounds) {
    if (platform.platform) {
      if ( jumperBounds.x > platform.platform.x + 600) {
        this.lastPlatformX += Math.random()*100 + 350;
        platform.platform.x = this.lastPlatformX;
        platform.platform.y = Math.random()*200 + 350;
        this.stage.update();
      }
    }
  }

  generateEnemy(){
    let x = this.lastEnemy || 6000;

    for (let i = 0; i < 4; i++) {
      let y = Math.random()*300 + 200;
      x += Math.random()*100 + 400;
      let enemy = new Enemy(this.stage, x, y);
      this.enemies.push(enemy);

      this.lastEnemy = x;
    }
  }

  moveEnemyToEnd(enemy, jumperBounds) {
    if (jumperBounds.x > enemy.enemy.x + 600) {
      this.lastEnemy += Math.random()*100 + 700;
      enemy.enemy.x = this.lastEnemy;
      enemy.enemy.y =  Math.random()*300 + 200;
      this.stage.update();
    }
  }

  generateAttack(x,y){
    let attack = new Attack(this.stage, x, y);
    this.attacks.push(attack);
  }

  handleAttack() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key === 'f' && this.attackCount > 0) {
        this.attackCount -= 1;
        this.generateAttack(this.jumper.jumper.x, this.jumper.jumper.y);
      }
    });
  }

  tick(e) {
    const { doubleJump, velocity, jumper } = this.jumper;
    let platformX;
    let newY;

    if (!this.onGround || doubleJump) {
      newY = velocity.y += 1;
    }

    document.removeEventListener('keydown', this.handleNewGameKey);
    document.removeEventListener('keydown', this.handleStart);
    if (this.music) {
      this.gameMusic.play();
    }

    if (jumper.x > this.lastPositionX + 50) {
      // this.stage.canvas.style.background = 'linear-gradient(blue, white)';
      this.stage.canvas.style.backgroundImage = "url('assets/gamebg.jpg')";
      this.stage.canvas.style.filter = 'invert(0%)';
    }

    let jumperBounds = jumper.getTransformedBounds();
    if (this.platforms.length !== 0) {
      this.platforms.forEach((platform) => {
        let platformBounds;
        if ( platform.platform) {
          platformBounds = platform.platform.getTransformedBounds();
          this.movePlatformToEnd(platform, jumperBounds);
          if (jumperBounds.intersects(platformBounds)) {
            if (platformBounds.y > jumperBounds.y && velocity.y > 0 && platformBounds.y > this.lastPositionY + 100) {
              jumper.y = platformBounds.y - 100;
              this.onGround = true;
              platformX = platformBounds.x + platformBounds.width;
            }
          }
        }
      });
    }

    if (this.enemies.length < 4) {
      this.generateEnemy();
    }

    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy) => {
        enemy.enemy.x -= 5;
        enemy.enemy.y += Math.floor(Math.random()*1);

        let enemyBounds = enemy.enemy.getTransformedBounds();
        this.moveEnemyToEnd(enemy, jumperBounds);

        if (jumperBounds.intersects(enemyBounds) && jumperBounds.x > enemyBounds.x - 5) {
          this.life -= 1;
          // this.stage.canvas.style.background = 'rgb(120, 10, 37)';
          this.stage.canvas.style.filter = 'invert(100%)';
          if (this.music) this.gameHit.play();
          if (this.life === 0) {
            this.handleGameOver();
            this.gameover.y = 100;
            this.gameover.x = jumper.x - 50;
            this.gamereset.y = 200;
            this.gamereset.x = jumper.x - 125;
            this.stage.addChild(this.gameover);
            this.stage.addChild(this.gamereset);
            createjs.Ticker.removeEventListener('tick', this.tick);
            document.removeEventListener('keydown', this.handleMusicKey);
            if(this.music){
              this.gameMusic.pause();
              this.gameOver.play();
            }
            this.handleNewGame();
          }
        }

        if (this.attacks.length > 0) {
          this.attacks.forEach((attack) => {
            attack.attack.x += velocity.x + 1;
            if (attack.attack.x > this.jumper.jumper.x + 1000) {
              this.stage.removeChild(attack.attack);
              this.attacks.splice(this.attacks.indexOf(attack),1);
            }

            let attackBounds = attack.attack.getTransformedBounds();
            attackBounds.x -= 25;
            attackBounds.y += 25;

            if (enemyBounds.intersects(attackBounds)) {
              this.stage.removeChild(enemy.enemy);
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
              this.stage.removeChild(attack.attack);
              this.attacks.splice(this.attacks.indexOf(attack),1);
            }
          });
        }

      });
    }

    if (jumper.x > 1000 & velocity.x < 6) {
      velocity.x += 1;
    } else if( jumper.x > 5000 & velocity.x < 8) {
      velocity.x += 1;
    } else if ( jumper.x > 10000 & velocity.x < 10) {
      velocity.x += 1;
      this.attackCount = 5;
    } else if (jumper.x > 20000 & velocity.x < 13) {
      velocity.x += 1;
      this.attackCount = 5;
    } else if (jumper.x > 40000 & velocity.x < 25) {
      velocity.x += 1;
      this.attackCount = 5;
    }

    if (this.onGround) {
      this.onGround = true;
      jumper.x += velocity.x;

      this.score.x = jumper.x - 250;
      this.score.text = `Score: ${Math.round(jumper.x)}`;
      this.lifeText.x = jumper.x - 250;
      this.lifeText.y = 50;
      this.lifeText.text = `HP: ${this.life}`;
      this.attackText.x = jumper.x - 250;
      this.attackText.y = 80;
      this.attackText.text = `Attack Left: ${this.attackCount}`;
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
        document.removeEventListener('keydown', this.handleMusicKey);
        if(this.music){
          this.gameMusic.pause();
          this.gameOver.play();
        }
        this.handleNewGame();
      } else {

        this.lastPositionY = jumper.y;
        this.lastPositionX = jumper.x;

        jumper.y += newY;
        jumper.x += velocity.x;
        this.score.x = jumper.x - 250;
        this.score.text = `Score: ${Math.round(jumper.x)}`;
        this.lifeText.x = jumper.x - 250;
        this.lifeText.y = 50;
        this.lifeText.text = `HP: ${this.life}`;
        this.attackText.x = jumper.x - 250;
        this.attackText.y = 80;
        this.attackText.text = `Attack Left: ${this.attackCount}`;

        if (jumper.x > this.stage.canvas.width*0.3) {
          this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
        }
      }
    }

    this.stage.update(e);
  }

  start(){
    createjs.Ticker.setFPS(60);
    // createjs.Ticker.setInterval(15);
    this.gameMusic = new Audio('assets/music/game.mp3');
    this.gameOver = new Audio('assets/music/gameover.mp3');
    this.gameHit = new Audio('assets/music/hit.wav');
    this.gameMusic.volume = 0.6;
    this.handleMusic();
    this.handleAttack();
    createjs.Ticker.addEventListener('tick', this.tick);
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key === 'ArrowUp') {
        this.handleKeyDown();
      }
    });
  }

  handleMusic() {
    document.addEventListener('keydown', this.handleMusicKey);
  }

  handleMusicKey(e){
    e.preventDefault();
    if (e.key === 't') {
      this.music = !this.music;
      if (this.music) {
        this.gameMusic.play();
      } else {
        this.gameMusic.pause();
      }
    }
  }

  handleNewGame(){
    document.addEventListener('keydown', this.handleNewGameKey);
  }

  handleNewGameKey(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
        let game = new newGame(this.stage, this.handleNewGameKey);
        this.gameOver.pause();
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
    this.lifeText = new createjs.Text(`HP: ${this.life}`, "32px Arial");
    this.attackText = new createjs.Text(`Attack Left: ${this.attackCount}`, '32px Arial');
    this.stage.addChild(this.score);
    this.stage.addChild(this.lifeText);
    this.stage.addChild(this.attackText);
  }

  handleGameOver(){
    this.gameover = new createjs.Text('Game Over!', '100px Arial');
    this.gamereset = new createjs.Text('Press Enter to play again', '60px Arial');
  }

}

export default Game;
