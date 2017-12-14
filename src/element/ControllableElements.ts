import { Container, Application } from 'pixi.js';

import keyboard from '../utils/keyboard';
import hitRendererBound from '../utils/hitRendererBound';

import { Direction, KeyboardControl } from '../typings/control';
import { MarioSprite } from '../typings/elements';

interface ControllableConfig {
  element: MarioSprite;
  app: Application;
  bound: string;
  direction: Direction;
}

class ControllableElements {
  constructor(config: ControllableConfig) {
    this.element = config.element;
    this.parent = this.element.parent;
    this.app = config.app;
    this.direction = config.direction;
    this.bindElementMoveEvent();
    this.initControl();
  }

  public element: MarioSprite;

  public parent: Container;

  public app: Application;

  public direction: Direction;

  private initControl(): void {
    const state = (deltaTime: number) => {
      this.element.x += this.element.vx;
      this.element.y += this.element.vy
      hitRendererBound(this.element, this.app.renderer);
    };
    this.app.ticker.add((deltaTime: number) => {
      state(deltaTime);
    });
  }

  private bindElementMoveEvent(): void {
    console.log('bind event!');
  
    const { direction } = this;
  
    let left = keyboard(37);
    let up = keyboard(38);
    let right = keyboard(39);
    let down = keyboard(40);
  
    if ((<string []>direction).length) {
      this.movex(left, right);
      this.movey(up, down);
    }

    if (direction === 'x') {
      this.movex(left, right);
    }

    if (direction === 'y') {
      this.movey(up, down);
    }
  }

  private movex(left: KeyboardControl, right: KeyboardControl): void {
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
  }

  private movey(up: KeyboardControl, down: KeyboardControl): void {
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
