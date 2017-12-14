import { loaders } from 'pixi.js';

import Renderer from './view/Renderer';
import SpriteImage from './element/SpriteImage';
import * as img from './images/mirro.png';

const renderer = new Renderer();
const app = renderer.game;
document.body.appendChild(app.view);

const mirroSprite = new SpriteImage({
  src: img,
  loadProgressHandler,
  setup: handleSetup,
  keyboardControl: true,
  app,
});

console.log(mirroSprite);

function handleSetup() {
  mirroSprite.instance.width = 50;
  mirroSprite.instance.height = 50;
  mirroSprite.instance.y = 96; 
  mirroSprite.instance.vx = 0;
  mirroSprite.instance.vy = 0;
  renderer.insertInstance(mirroSprite.instance);
  app.stage.addChild(mirroSprite.instance);
}

function loadProgressHandler(loader: loaders.Loader, resource: loaders.Resource) {
  console.log("loading: " + resource.url); 

  console.log(`progress: ${loader.progress}%`);
}
