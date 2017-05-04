import { getHeight, getWidth, getBounds, calculateIntersection } from './utils.js';

class Jumper {
  constructor(stage, platform){
    this.stage = stage;
    this.platform = platform;
    this.name = 'Jumper';
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
    this.stage.addChild(this.jumper);
    this.jumper.y = 300;
    this.jumper.x = 50;
    this.jumper.snapToPixel = true;

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
    let platformBounds = this.platform.platform.getTransformedBounds();
    let jumperBounds = this.jumper.getTransformedBounds();
    let collision = null;
    // debugger
    if (jumperBounds.intersects(platformBounds)) {
      // debugger
      this.onGround = true;
    } else {
      let jumperY = this.jumper.y + newY ;
      let jumperX = this.jumper.x + this.velocity.x;

      if ( jumperY > 600) {
      } else {
        this.jumper.y += newY;
        this.jumper.x += this.velocity.x;
      }
    }



    this.stage.update(e);
  }

  reset() {
    this.jumper.y = 700 / 2;
    // this.jumper.x =  300 / 1.25;
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
