import { Application } from "pixi.js";

class Renderer {
  constructor() {
    this.init();
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
}

export default Renderer;
