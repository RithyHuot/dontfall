class Platform {
  constructor(stage, world, x,y){
    this.stage = stage;
    this.world = world;
    this.createImage();

    if ( x && y) {
      this.y = y;
      this.x = x;
    } else {
      this.y = 550;
      this.x = 0;
    }
  }

  createImage() {
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = 'assets/platform.png';
  }

  onImageLoaded(e) {
    this.platform = new createjs.Bitmap(this.image);
    this.world.addChild(this.platform);
    this.platform.y = this.y;
    this.platform.x = this.x;
    this.platform.name = 'Platform';
    this.platform.snapToPixel = true;
    //TESTING
    this.platform.cache(0,0, 250, 32);
    //TESTING
    this.stage.update();
  }
}

export default Platform;
