import { Sprite } from 'pixi.js';

export class MarioSprite extends Sprite {
  vx: number;
  vy: number;
}

export type CustemElement = MarioSprite;

export interface LocatableElements {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  halfWidth: number;
  halfHeight: number;
}
