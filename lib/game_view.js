class GameView {
  constructor(stage) {
    this.createImage();
    this.stage = stage;
  }

  createImage() {
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = '../assets/background2.jpg';
  }

  onImageLoaded(e) {
    let background = new Bitmap(this.image);
    this.stage.addChild(background);
    this.stage.update();

    Ticker.setFPS(30);
    Ticker.addListener(tick);
  }

  tick() {
    stage.update();
  }
}
