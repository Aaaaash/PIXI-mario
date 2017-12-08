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

import keyboard from './keyboard';
import hitTestRectangle from './hitTestRectangle';

import img from './images/mirro.png';

/**
 * 传入配置创建一个app对象
 */

const app = new Application({
  width: 500,
  height: 500,
  antialiasing: true, // 抗锯齿
  transparent: false, // 透明
  resolution: 1, // 解析度
});

// canvas对象全屏
// app.renderer.view.style.position = "absolute"
// app.renderer.view.style.width = window.innerWidth + "px";
// app.renderer.view.style.height = window.innerHeight + "px";
// app.renderer.view.style.display = "block";

// app.view属性是canvas场景
document.body.appendChild(app.view);

// resize
// app.renderer.resize(512, 512);

// 修改背景颜色
// app.renderer.backgroundColor = 0x061639;

// 导入一张图片
loader.add(img)
  .on('progress', loadProgressHandler)
  .load(setup);

function setup() {
  const mirro = TextureCache[img];

  const box = new Graphics();
  box.beginFill(0xCCFF99);
  box.drawRect(0, 0, 64, 64);
  box.endFill();
  box.x = 120;
  box.y = 96;
  app.stage.addChild(box);

  let rectangle = new Rectangle(192, 128, 64, 64);
  let rocket = new Sprite(mirro);
  rocket.width = 50;
  rocket.height = 50;
  rocket.y = 96; 
  rocket.vx = 0;
  rocket.vy = 0;
  app.stage.addChild(rocket);
  
  let style = new TextStyle({
    fontFamily: "sans-serif",
    fontSize: 18,
    fill: "white",
  }); 
  
  const message = new Text("No collision...", style);
  message.position.set(8, 8);
  app.stage.addChild(message);

  const state = (delta) => {
    rocket.x += rocket.vx;
    rocket.y += rocket.vy
    if (hitTestRectangle(rocket, box)) {
      //if there's a collision, change the message text
      //and tint the box red
      message.text = "hit!";
      box.tint = 0xff3300;
    } else {
      //if there's no collision, reset the message
      //text and the box's color
      message.text = "No collision...";
      box.tint = 0xccff99;
    }
  
  };

  app.ticker.add(delta => {
    state(delta);
  });


  let left = keyboard(37),
  up = keyboard(38),
  right = keyboard(39),
  down = keyboard(40);

  left.press = () => {
    //Change the cat's velocity when the key is pressed
    rocket.vx = -5;
    rocket.vy = 0;
  };

  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the rocket isn't moving vertically:
    //Stop the rocket
    if (!right.isDown && rocket.vy === 0) {
      rocket.vx = 0;
    }
  };

  right.press = () => {
    rocket.vx = 5;
    rocket.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && rocket.vy === 0) {
      rocket.vx = 0;
    }
  };

  up.press = () => {
    rocket.vy = -5;
    rocket.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && rocket.vx === 0) {
      rocket.vy = 0;
    }
  };

  //Down
  down.press = () => {
    rocket.vy = 5;
    rocket.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && rocket.vx === 0) {
      rocket.vy = 0;
    }
  };

}

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url); 

  console.log(`progress: ${loader.progress}%`);
}

