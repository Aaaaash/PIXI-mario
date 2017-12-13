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
    const width = 500;
    const height = 500;
    this.game = new Application({
      width,
      height,
      antialiasing: true,
      transparent: false,
      resolution: 1,
    });
  }

  insertInstance(instance) {
    this.instances.push(instance);
  }
}

export default Renderer;
