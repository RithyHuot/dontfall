class EnemyGhost {
  constructor(stage, x, y) {
    this.stage = stage;
    this.velocity ={ x: 5, y: 12};
    this.x = x;
    this.y = y;
    this.createImage();
  }

  createImage() {
    let spriteSheet = new createjs.SpriteSheet({
      images: ['assets/enemy1.png'],
      frames: {width: 64 , height: 64, regX:0, regY:0},
      animations: { run: [8, 15] }
    });

    this.enemy = this.stage.addChild( new createjs.Sprite(spriteSheet));
    this.enemy.gotoAndPlay('run');
    this.enemy.snapToPixel = true;
    this.enemy.x = this.x;
    this.enemy.y = this.y;
    this.stage.update();
  }
}

export default EnemyGhost;
