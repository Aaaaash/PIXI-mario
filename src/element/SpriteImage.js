import { utils, loader, Sprite } from 'pixi.js';

import ControllableElements from './ControllableElements';

class SpriteImage {
  constructor(config) {
    this.sourceUrl = config.src;
    this.load = this.load.bind(this);
    this.handleSetup = config.setup;
    this.keyboardControl = config.keyboardControl;
    loader.add(config.src)
      .on('progress', config.loadProgressHandler)
      .load(this.load);
  }

  load() {
    const img = loader.resources[this.sourceUrl].texture;
    this.instance = new Sprite(img);

    if (this.keyboardControl) {
      this.instance = new ControllableElements(this.instance).element;
    }

    this.handleSetup(this.instance);
  }
}

export default SpriteImage;
