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

function handleSetup(instance: any) {
  instance.width = 50;
  instance.height = 50;
  instance.y = 96; 
  instance.vx = 0;
  instance.vy = 0;
  renderer.insertInstance(instance);
  app.stage.addChild(instance);
}

function loadProgressHandler(loader: any, resource: any) {
  console.log("loading: " + resource.url); 

  console.log(`progress: ${loader.progress}%`);
}
