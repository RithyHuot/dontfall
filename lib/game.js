import Jumper from './jumper.js';
import Platform from './platform.js';

class Game {
  constructor(stage, world) {
    this.stage = stage;
    this.world = world;
    this.platforms = [];
    this.generatePlatform();
    this.jumper = new Jumper(stage, world, this.platforms);
    this.movePlatformToEnd = this.movePlatformToEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  generatePlatform(){
    while(this.platforms.length < 4) {
      const platform = new Platform(this.stage,this.world);
      this.platforms.push(platform);
      let x = Math.random()*100 + 350;

      for (let i = 0; i < 6; i++) {
        let y = Math.random()*400 + 50;
        let newPlatform = new Platform(this.stage, this.world, x, y);
        this.platforms.push(newPlatform);
        x += Math.random()*100 + 350;
      }
    }
  }

  movePlatformToEnd(platform, jumperBounds) {
    if (jumperBounds.x > platform.x) {
      // debugger
      // this.world.removeChild(platform.platform);
    }

    this.stage.update();
  }


  tick(e) {
    const { onGround, doubleJump, velocity } = this.jumper;
    let newY;

    if (!onGround || doubleJump) {
      newY = velocity.y += 1;
    }

    this.platforms.forEach((platform) => {
      let platformBounds = platform.platform.getTransformedBounds();
      let jumperBounds = this.jumper.getTransformedBounds();

      if (jumperBounds.intersects(platformBounds)) {
        if (platformBounds.y > this.jumper.y && velocity.y > 0) {
          this.jumper.y = platformBounds.y -30;
          this.onGround = true;
        } else if ( platformBounds.x > this.jumper.x) {
          this.onGround = false;
        }
      }
    });

    if ( onGround) {
      this.onGround = true;
      alert("You lose");
      this.jumper.y = 300;
      this.jumper.x = 50;
      this.stage.x = 0;
    } else {
      this.lastPositionY = this.jumper.y;
      this.lastPositionX = this.jumper.x;
      this.jumper.y += newY;
      this.jumper.x += this.velocity.x;
      if (this.jumper.x > this.stage.canvas.width*0.3) {
        this.stage.x = this.stage.canvas.width*0.3 - this.jumper.x ;
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

  reset() {
    this.jumper.y = this.jumper.y - 100;
    this.velocity.y = -15;
  }

  handleKeyDown(e) {
    if (this.onGround) {
      this.onGround = false;
      this.doubleJump = true;
      this.reset();
    } else if (this.doubleJump) {
      this.doubleJump = false;
      this.reset();
    }
  }

}

export default Game;
