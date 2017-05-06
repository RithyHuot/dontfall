import Jumper from './jumper.js';
import Platform from './platform.js';

class Game {
  constructor(stage, world) {
    this.stage = stage;
    this.world = world;
    this.platforms = [];
    this.generatePlatform();
    this.jumper = new Jumper(stage, world);
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

        alert("You lose");
        jumper.y = 300;
        jumper.x = 50;
        this.stage.x = 0;
      } else {
      // //testing
      // if ( jumperY > 600) {
      //   jumper.y = 600;
      //   //end testing
      // debugger
        this.lastPositionY = jumper.y;
        this.lastPositionX = jumper.x;

        // if (jumper.y < 600 ){
        //   jumper.y += newY;
        //   this.onGround = true;
        // }

        jumper.y += newY;
        jumper.x += velocity.x;
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

  movePlatformToEnd(platform, jumperBounds) {
    if (jumperBounds.x > platform.x) {
    }

    this.stage.update();
  }
}

export default Game;
