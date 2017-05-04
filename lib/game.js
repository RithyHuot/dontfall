import Jumper from './jumper.js';
import Platform from './platform.js';

class Game {
  constructor(stage) {
    const platform = new Platform(stage);
    const jumper = new Jumper(stage, platform);
    jumper.start();
  }
}

export default Game;
