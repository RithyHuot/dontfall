import { getHeight, getWidth, getBounds, calculateIntersection } from './utils.js';

class Jumper {
  constructor(stage, world, platforms){
    this.stage = stage;
    this.world = world;
    this.platforms = platforms;
    this.createImage();
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.tick = this.tick.bind(this);
    this.velocity = { x: 8, y: 12};

    this.onGround = false;
    this.doubleJump = false;
  }

  createImage() {
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = 'assets/hero.png';
  }

  onImageLoaded(e) {
    this.jumper = new createjs.Bitmap(this.image);
    this.world.addChild(this.jumper);
    this.jumper.y = 300;
    this.jumper.x = 50;
    this.jumper.snapToPixel = true;
    this.jumper.name = 'Jumper';

    this.stage.update();
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

  tick(e) {
    let newY;
    if ( !this.onGround || this.doubleJump) {
      newY = this.velocity.y += 1;
    }

    this.platforms.forEach((platform) => {

      let platformBounds = platform.platform.getTransformedBounds();
      let jumperBounds = this.jumper.getTransformedBounds();

      if (jumperBounds.intersects(platformBounds)) {
        if ( platformBounds.y > this.jumper.y  && this.velocity.y > 0) {
          this.jumper.y = platformBounds.y - 30;
          this.onGround = true;
        } else if ( platformBounds.x > this.jumper.x) {
          this.jumper.x = platformBounds.x - 30;
          this.onGround = false;
        }
      }
    });

    if ( this.onGround ) {
      this.onGround = true;
      // this.jumper.x += this.velocity.x;
    } else {
      let jumperY = this.jumper.y + newY ;
      let jumperX = this.jumper.x + this.velocity.x;

      if ( jumperY > 600) {
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

        // if (this.jumper.y > this.stage.canvas.height*0.3) {
        //   this.stage.y = this.stage.canvas.height*0.3 - this.jumper.y;
        // } else if ( this.jumper.y > this.stage.canvas.height*0.7) {
        //   this.stage.y = this.stage.canvas.height*0.7 - this.jumper.y;
        // }
      }
    }

    this.stage.update(e);
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

export default Jumper;
