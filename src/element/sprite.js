import { utils, loader, Sprite } from 'pixi.js';
import keyboard from '../utils/keyboard';

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
    this.handleSetup(this.instance);

    if (this.keyboardControl) {
      this.initControl();
    }
  }

  initControl() {
    let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

    left.press = () => {
      this.instance.vx = -5;
      this.instance.vy = 0;
    };

    left.release = () => {
      if (!right.isDown && this.instance.vy === 0) {
        this.instance.vx = 0;
      }
    };

    right.press = () => {
      this.instance.vx = 5;
      this.instance.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.instance.vy === 0) {
        this.instance.vx = 0;
      }
    };

    up.press = () => {
      this.instance.vy = -5;
      this.instance.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.instance.vx === 0) {
        this.instance.vy = 0;
      }
    };

    down.press = () => {
      this.instance.vy = 5;
      this.instance.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.instance.vx === 0) {
        this.instance.vy = 0;
      }
    };
  }
}

export default SpriteImage;
