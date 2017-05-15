class Attack {
  constructor(stage, x, y) {
    this.stage = stage;
    this.velocity ={ x: 10};
    this.x = x;
    this.y = y;
    this.createImage();
  }

  createImage() {
    let spriteSheet = new createjs.SpriteSheet({
      images: ['assets/enery.png'],
      frames: {width: 64 , height: 64, regX:0, regY:0},
      animations: { fire: [4, 7] }
    });

    this.attack = this.stage.addChild( new createjs.Sprite(spriteSheet));
    this.attack.setTransform(0, 0, 1.5, 1.5);
    this.attack.gotoAndPlay('fire');
    this.attack.snapToPixel = true;
    this.attack.x = this.x;
    this.attack.y = this.y;
    this.stage.update();
  }
}

export default Attack;
