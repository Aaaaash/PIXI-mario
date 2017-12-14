import { loader, Sprite } from 'pixi.js';

import ControllableElements from './ControllableElements';

class SpriteImage {
  constructor(config: any) {
    this.sourceUrl = config.src;
    this.load = this.load.bind(this);
    this.handleSetup = config.setup;
    this.keyboardControl = config.keyboardControl;
    this.app = config.app;
    loader.add(config.src)
      .on('progress', config.loadProgressHandler)
      .load(this.load);
  }

  public sourceUrl: string;

  public handleSetup: (T: object) => void;

  public keyboardControl: boolean;

  public app: any;

  public instance: any;

  private load() {
    const img = loader.resources[this.sourceUrl].texture;
    this.instance = new Sprite(img);

    this.handleSetup(this.instance);

    if (this.keyboardControl) {
      this.instance = new ControllableElements({
        element: this.instance,
        app: this.app,
        bound: 'parent', 
      }).element;
    }
  }
}

export default SpriteImage;
