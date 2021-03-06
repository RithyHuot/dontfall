class Jumper {
  constructor(stage){
    this.stage = stage;
    this.createImage();
    this.velocity = { x: 5, y: 12};

    this.onGround = false;
    this.doubleJump = false;
  }

  createImage() {
    this.onImageLoaded();
  }

  onImageLoaded(e) {
    // let spriteSheet = new createjs.SpriteSheet({
    //   images: ['assets/stickman.png'],
    //   frames: {width: 180, height: 340, regX:0, regY:0},
    //   animations: { run: [0, 69, 'run', 2] }
    // });
    let spriteSheet = new createjs.SpriteSheet({
      images: ['assets/running.png'],
      frames: {width: 280, height: 385, regX:0, regY:0},
      animations: { run: [0, 9, 'run', 0.5] }
    });

    this.jumper = this.stage.addChild( new createjs.Sprite(spriteSheet));
    this.jumper.setTransform(0, 0, 0.3, 0.29);
    this.jumper.gotoAndPlay('run');
    this.jumper.y = 100;
    this.jumper.x = 0;

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
  }
}

export default Jumper;
