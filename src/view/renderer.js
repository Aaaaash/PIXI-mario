import { Application } from "pixi.js";

class Renderer {
  constructor() {
    this.init();
    this.instances = [];
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
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
