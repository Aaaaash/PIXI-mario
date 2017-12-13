import {
  Application,
  loader,
  Sprite,
  Container,
  TextureCache,
  Rectangle,
  Graphics,
  TextStyle,
  Text,
} from 'pixi.js';

import keyboard from './utils/keyboard';
import hitTestRectangle from './utils/hitTestRectangle';
import Renderer from './view/Renderer';
import SpriteImage from './element/SpriteImage';
import img from './images/mirro.png';

const renderer = new Renderer.getInstance();

const app = renderer.game;
document.body.appendChild(app.view);

const mirroSprite = new SpriteImage({
  src: img,
  loadProgressHandler,
  setup: handleSetup,
  keyboardControl: true,
});

function handleSetup(instance) {
  instance.width = 50;
  instance.height = 50;
  instance.y = 96; 
  instance.vx = 0;
  instance.vy = 0;
  renderer.insertInstance(instance);
  app.stage.addChild(instance);

  const state = (delta) => {
    instance.x += instance.vx;
    instance.y += instance.vy
  };
  if (!!mirroSprite.keyboardControl) {
    app.ticker.add(delta => {
      state(delta);
    });
  }
}

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url); 

  console.log(`progress: ${loader.progress}%`);
}
