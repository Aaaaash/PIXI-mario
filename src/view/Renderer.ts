import { Application } from "pixi.js";

export default class Renderer {
  constructor() {
    this.init();
  }

  public instances: Array<object> = [];

  public instance: object;

  public game: Application;

  init() {
    this.game = new Application(0, 0, {
      transparent: false,
      resolution: 1,
      autoResize: false,
    });

    const { view } = this.game;
    view.style.width = '100%';
    view.style.height = '100%';
    this.runTicker();
  }

  insertInstance(instance: any) {
    this.instances.push(instance);
  }

  runTicker() {
    this.game.ticker.add(delta => {
      this.updateResize(delta);
    });
  }

  updateResize(delta: any) {
    const { view, renderer } = this.game;
    renderer.resize(view.clientWidth, view.clientHeight);
  }
}

