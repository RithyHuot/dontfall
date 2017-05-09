/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jumper_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_game_js__ = __webpack_require__(1);




class Game {
  constructor(stage, world, cb) {
    this.stage = stage;
    this.world = world;
    this.platforms = [];
    this.jumper = new __WEBPACK_IMPORTED_MODULE_0__jumper_js__["a" /* default */](stage);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.tick = this.tick.bind(this);

    this.lastPlatformX = 0;
    this.generatePlatform();
    this.movePlatformToEnd = this.movePlatformToEnd.bind(this);

    this.handleScore();

    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleStart = cb;
  }

  generatePlatform(){
    if (this.platforms.length < 4) {
      const platform = new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.stage,this.world);
      this.platforms.push(platform);
      let x = Math.random()*100 + 350;

      for (let i = 0; i < 2; i++) {
        let y = Math.random()*200 + 350;
        let newPlatform = new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.stage, this.world, x, y);
        this.platforms.push(newPlatform);

        this.lastPlatformX = x;
        x += Math.random()*100 + 350;
      }
    }
  }


  movePlatformToEnd(platform, jumperBounds) {
    if (jumperBounds.x > platform.platform.x + 600) {
      this.lastPlatformX += Math.random()*100 + 350;
      platform.platform.x = this.lastPlatformX;
      platform.platform.y = Math.random()*200 + 300;
      this.stage.update();
    }
  }

  tick(e) {
    const { doubleJump, velocity, jumper } = this.jumper;
    let newY;
    let platformX;

    if (!this.onGround || doubleJump) {
      newY = velocity.y += 1;
    }

    document.removeEventListener('keydown', this.handleNewGameKey);
    document.removeEventListener('keydown', this.handleStart);

    this.platforms.forEach((platform) => {
      let platformBounds = platform.platform.getTransformedBounds();
      let jumperBounds = jumper.getTransformedBounds();
      this.movePlatformToEnd(platform, jumperBounds);

      if (jumperBounds.intersects(platformBounds)) {
        if (platformBounds.y > jumperBounds.y && velocity.y > 0 && platformBounds.y > this.lastPositionY + 100) {
          jumper.y = platformBounds.y - 100;
          this.onGround = true;
          platformX = platformBounds.x + platformBounds.width;
        }
      }
    });

    if (this.onGround) {
      this.onGround = true;
      jumper.x += velocity.x;

      if (jumper.x > 1000 && velocity.x < 5) {
        velocity.x += 1;
      } else if( jumper.x > 5000 & velocity.x < 8) {
        velocity.x += 1;
      } else if ( jumper.x > 10000 & velocity.x < 10) {
        velocity.x += 1;
      } else if (jumper.x > 20000 & velocity.x < 13) {
        velocity.x += 1;
      }

      this.score.x = jumper.x - 250;
      this.score.text = `Score: ${Math.round(jumper.x)}`;

      if (jumper.x > this.stage.canvas.width*0.3) {
        this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
      }

      if (platformX < jumper.getTransformedBounds().x) {
        this.onGround = false;
      }

    } else {

      let jumperY = jumper.y + newY;
      let jumperX = jumper.x + velocity.x;

      if (jumperY >= 600) {
        this.handleGameOver();
        this.gameover.y = 100;
        this.gameover.x = jumper.x - 50;
        this.gamereset.y = 200;
        this.gamereset.x = jumper.x - 125;
        this.stage.addChild(this.gameover);
        this.stage.addChild(this.gamereset);
        createjs.Ticker.removeEventListener('tick', this.tick);
        this.handleNewGame();
      }
      if (jumperY < 600 ){

        this.lastPositionY = jumper.y;
        this.lastPositionX = jumper.x;

        jumper.y += newY;
        jumper.x += velocity.x;
        this.score.x = jumper.x - 250;
        this.score.text = `Score: ${Math.round(jumper.x)}`;

        if (jumper.x > this.stage.canvas.width*0.3) {
          this.stage.x = this.stage.canvas.width*0.3 - jumper.x ;
        }
      }
    }

    this.stage.update(e);
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

  handleNewGame(){
    document.addEventListener('keydown', this.handleNewGameKey);
  }

  handleNewGameKey(e) {
    if (e.key === 'Enter') {
      // this.stage.removeAllChildren();
        let game = new __WEBPACK_IMPORTED_MODULE_2__new_game_js__["a" /* default */]();
        game.startGame();
      }
  }

  reset() {
    this.jumper.y = this.jumper.y - 100;
    this.jumper.velocity.y = -15;
  }

  handleKeyDown(e) {
    const { velocity } = this.jumper;
    if (this.onGround) {
      this.onGround = false;
      this.doubleJump = true;
      this.reset();
    } else if (this.doubleJump) {
      this.doubleJump = false;
      this.reset();
    }
  }

  handleScore(){
    this.score = new createjs.Text(`Score: 0`, "40px Arial");
    this.stage.addChild(this.score);
  }

  handleGameOver(){
    this.gameover = new createjs.Text('Game Over!', '100px Arial');
    this.gamereset = new createjs.Text('Press Enter to play again', '60px Arial');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_page_js__ = __webpack_require__(2);



class newGame {
  constructor(stage, world) {
    this.canvas = document.getElementById('jumperCanvas');
    this.canvas.width = 900;
    this.canvas.height = 600;

    this.stage = new createjs.Stage(this.canvas);
    this.world = new createjs.Container();

    this.stage.addChild(this.world);
  }

  startPage() {
    this.start = new __WEBPACK_IMPORTED_MODULE_1__start_page_js__["a" /* default */](this.stage, this.world);
    this.start.createPage();
  }

  startGame(){
    let intro = document.getElementById('intro');
    intro.style.visibility = 'hidden';
    this.canvas.style.background = 'linear-gradient(blue, white';
    const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](this.stage, this.world);
    game.start();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (newGame);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);


class StartPage {
  constructor(stage, world){
    this.stage = stage;
    this.world = world;
    this.handleStart = this.handleStart.bind(this);
  }

  // addToHtmlElements(){
  //   this.createStartBtn();
  // }
  //
  // createPage() {
  //   this.addToHtmlElements();
  // }

  createPage(){
    // let html = document.createElement('button');
    // let content = document.createTextNode('Start');
    // html.appendChild(content);
    // html.id = 'startBtn';
    //
    // let intro  = document.getElementById('intro');
    // intro.appendChild(html);

    // document.body.appendChild(html);
    //
    // let startBtn = new createjs.DOMElement(html);
    // startBtn.x = 300;
    // startBtn.y = 300;

    // startBtn.htmlElement.onclick = this.startFunction(startBtn);
    // debugger
    // this.htmlElements.push(startBtn);

    this.gameTitle = new createjs.Text("Don't Fall!", 'bold 100px Arial', 'white');
    this.startGame = new createjs.Text('Press s to start', '28px Arial', 'white');
    this.directionOne = new createjs.Text('Use up arrow to jump', '28px Arial', 'white');
    this.directionTwo = new createjs.Text('To double jump, hit the up arrow key twice', '28px Arial', 'white');

    this.gameTitle.y = 100;
    this.gameTitle.x = 225;
    this.startGame.y = 400;
    this.startGame.x = 250;
    this.directionOne.y = 450;
    this.directionOne.x = 250;
    this.directionTwo.y = 500;
    this.directionTwo.x = 250;

    this.stage.addChild(this.gameTitle);
    this.stage.addChild(this.startGame);
    this.stage.addChild(this.directionOne);
    this.stage.addChild(this.directionTwo);

    this.stage.update();

    document.addEventListener('keydown', this.handleStart
    );
  }

  handleStart(e){
    if (e.key === 's') {
      let canvas = document.getElementById('jumperCanvas');
      let intro = document.getElementById('intro');
      intro.style.visibility = 'hidden';

      this.stage.removeChild(this.gameTitle);
      this.stage.removeChild(this.startGame);
      this.stage.removeChild(this.directionOne);
      this.stage.removeChild(this.directionTwo);

      canvas.style.background = 'linear-gradient(blue, white)';
      let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](this.stage, this.world, this.handleStart);
      game.start();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (StartPage);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    let spriteSheet = new createjs.SpriteSheet({
      images: ['assets/stickman.png'],
      frames: {width: 180, height: 340, regX:0, regY:0},
      animations: { run: [0, 69, 'run', 2] }
    });

    this.jumper = this.stage.addChild( new createjs.Sprite(spriteSheet));
    this.jumper.setTransform(0, 0, 0.3, 0.3);
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

/* harmony default export */ __webpack_exports__["a"] = (Jumper);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_page_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_game_js__ = __webpack_require__(1);




document.addEventListener('DOMContentLoaded', () => {
  let game = new __WEBPACK_IMPORTED_MODULE_2__new_game_js__["a" /* default */]();
  game.startPage();
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    this.stage.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map