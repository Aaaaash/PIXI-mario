import { Application } from "pixi.js";

class Renderer {
  constructor() {
    this.init();
    this.instances = [];
  }

  static getInstance() {
    if (!Renderer.instance) {
        Renderer.instance = new Renderer();
    }
    return Renderer.instance;
  }

  init() {
    // const width = 500;
    // const height = 500;
    this.game = new Application({
      // width,
      // height,
      antialiasing: true,
      transparent: false,
      resolution: 1,
      autoResize: false,
    });

    const { view, renderer } = this.game;
    view.style.width = '100%';
    view.style.height = '100%';

    this.runTicker();
  }

  insertInstance(instance) {
    this.instances.push(instance);
  }

  runTicker() {
    this.game.ticker.add(delta => {
      this.updateResize(delta);
    });
  }

  updateResize(delta) {
    const { view, renderer } = this.game;
    renderer.resize(view.clientWidth, view.clientHeight);
  }
}

export default Renderer;
