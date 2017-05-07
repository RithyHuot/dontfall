import Game from './game.js';

class StartPage {
  constructor(stage, world){
    this.stage = stage;
    this.world = world;
    this.htmlElements = [];
  }

  addToHtmlElements(){
    this.createStartBtn();
  }

  createPage() {
    // debugger
    this.addToHtmlElements();

    // this.htmlElements.forEach((el) => {
    //   this.stage.addChild(el);
    // });
    //
    // this.stage.update();
  }

  createStartBtn(){
    let html = document.createElement('button');
    let content = document.createTextNode('Start');
    html.appendChild(content);
    html.id = 'startBtn';

    let intro  = document.getElementById('intro');
    intro.appendChild(html);

    // document.body.appendChild(html);
    //
    // let startBtn = new createjs.DOMElement(html);
    // startBtn.x = 300;
    // startBtn.y = 300;

    // startBtn.htmlElement.onclick = this.startFunction(startBtn);
    // debugger
    // this.htmlElements.push(startBtn);
    html.onclick = this.startFunction();
    this.htmlElements.push(html);

  }

  startFunction(){
    return () => {
      console.log('Clicked');
      let canvas = document.getElementById('jumperCanvas');
      let intro = document.getElementById('intro');
      intro.style.visibility = 'hidden';

      canvas.style.background = 'linear-gradient(rgb(125, 19, 1), rgb(52, 11, 11))';
      const game = new Game(this.stage, this.world);
      game.start();
    };
  }
}

export default StartPage;
