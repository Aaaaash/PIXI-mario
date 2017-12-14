import { loader, Application, loaders } from 'pixi.js';

import ControllableElements from './ControllableElements';
import { MarioSprite } from '../typings/elements';

interface SpriteConfig {
  src: string;
  setup: () => void;
  keyboardControl: boolean;
  app: Application;
  loadProgressHandler: (loader: loaders.Loader, resource: loaders.Resource) => void;
}

class SpriteImage {
  constructor(config: SpriteConfig) {
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

  public handleSetup: () => void;

  public keyboardControl: boolean;

  public app: Application;

  public instance: MarioSprite;

  public controlable: ControllableElements;

  private load() {
    const img = loader.resources[this.sourceUrl].texture;
    this.instance = new MarioSprite(img);

    this.handleSetup();

    if (this.keyboardControl) {
      this.controlable = new ControllableElements({
        element: this.instance,
        app: this.app,
        bound: 'parent',
        direction: 'x',
      });
      this.instance = this.controlable.element;
    }
  }
}

export default SpriteImage;
