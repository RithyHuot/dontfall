class Background {
  constructor(stage) {
    this.stage = stage;
    this.createImage();
  }

  createImage() {
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = 'assets/background2.jpg';
  }

  onImageLoaded(e) {
    let background = new createjs.Bitmap(this.image);
    this.stage.addChild(background);
    this.stage.update();

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener(this.tick);
  }

  tick(e) {
    stage.update();
  }
}

export default Background;
