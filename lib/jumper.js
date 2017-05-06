import { getHeight, getWidth, getBounds, calculateIntersection } from './utils.js';

class Jumper {
  constructor(stage, world){
    this.stage = stage;
    this.world = world;
    this.createImage();
    this.velocity = { x: 3, y: 12};

    this.onGround = false;
    this.doubleJump = false;
  }

  createImage() {
    // this.image = new Image();
    // this.image.onload = this.onImageLoaded.bind(this);
    // this.image.src = 'assets/hero.png';

    this.onImageLoaded();

  }

  onImageLoaded(e) {
    let spriteSheet = new createjs.SpriteSheet({
      images: ['assets/stickman.png'],
      frames: {width: 180, height: 340, regX:0, regY:0},
      animations: { run: [0, 69, "run", 2] }
    });
    // let spriteSheet = new createjs.SpriteSheet({
    //   images: ['assets/runninghero.png'],
    //   frames: {width: 100, height: 100, regX:0, regY:0},
    //   animations: {
    //     run: {
    //       frames: [46, 47, 48, 49, 50, 51, 52, 53],
    //       speed: 0.5
    //     }
    //   }
    // });
    // let spriteSheet = new createjs.SpriteSheet({
    //   images: ['assets/pokemon.png'],
    //   frames: {width: 28, height: 29, regX:0, regY:0},
    //   animations: {
    //     run: {
    //       frames: [3, 17, 31, 45, 59, 73],
    //       speed: 0.5
    //     }
    //   }
    // });

    this.jumper = this.stage.addChild( new createjs.Sprite(spriteSheet));
    this.jumper.setTransform(0, 0, 0.3, 0.3);
    this.jumper.gotoAndPlay('run');
    this.jumper.y = 100;
    this.jumper.x = 0;


    // this.jumper = new createjs.Bitmap(this.image);
    // this.world.addChild(this.jumper);
    // this.jumper.y = 300;
    // this.jumper.x = 50;
    // this.jumper.snapToPixel = true;
    // this.jumper.name = 'Jumper';
    //
    // this.stage.update();
  }
}

export default Jumper;
