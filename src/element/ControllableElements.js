import keyboard from '../utils/keyboard';
import hitRendererBound from '../utils/hitRendererBound';

class ControllableElements {
  constructor(config) {
    this.element = config.element;
    this.parent = this.element.parent;
    this.app = config.app;
    this.bindKeyboardEvent();
    this.initControl();
  }

  initControl() {
    const state = (delta) => {
      this.element.x += this.element.vx;
      this.element.y += this.element.vy
      hitRendererBound(this.element, this.app.renderer);
    };
    this.app.ticker.add(delta => {
      state(delta);
    });
  }

  bindKeyboardEvent() {
    console.log('bind event!');
    let left = keyboard(37);
    let up = keyboard(38);
    let right = keyboard(39);
    let down = keyboard(40);

    left.press = () => {
      this.element.vx = -5;
      this.element.vy = 0;
    };

    left.release = () => {
      if (!right.isDown && this.element.vy === 0) {
        this.element.vx = 0;
      }
    };

    right.press = () => {
      this.element.vx = 5;
      this.element.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.element.vy === 0) {
        this.element.vx = 0;
      }
    };

    up.press = () => {
      this.element.vy = -5;
      this.element.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.element.vx === 0) {
        this.element.vy = 0;
      }
    };

    down.press = () => {
      this.element.vy = 5;
      this.element.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.element.vx === 0) {
        this.element.vy = 0;
      }
    };
  }
}

export default ControllableElements;
