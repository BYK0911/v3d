
import v3d from '../src';

var scene = new v3d.Scene();

scene.perspective = 600;
scene.rotationX = 60;
scene.rotationZ = 60;
scene.backgroundColor = 'rgba(200, 200, 200, .5)';
scene.setSize(window.innerWidth, window.innerHeight);
scene.setPosition(0, 120, 0);

document.body.appendChild(scene.renderer.dom);

var cubic1 = new v3d.Cubic(0, -50, 200, 130, 150, 400);
var cubic2 = new v3d.Cubic(10, 160, 120, 110, 110, 240);
var cubic3 = new v3d.Cubic(10, 290, 60, 110, 150, 120);
var cubic4 = new v3d.Cubic(-65, 265, 15, 40, 200, 30);
scene.add(cubic4);
scene.add(cubic3);
scene.add(cubic2);
scene.add(cubic1);

scene.render();

// var ani = v3d.animate(scene, { rotationX: 360, rotationZ: 360 }, { timingFunction: 'linear', duration: 10000, loop: Infinity })

// window.ondblclick = function () {
//   ani.playing ? ani.pause() : ani.play();
// }

window.onmousewheel = function (e) {
  let k = e.wheelDelta > 0 ? 1.1 : 1 / 1.1;
  scene.perspective *= k;
}

let x = 0;
let y = 0;
let down = false;

window.onmousedown = function (e) {
  down = true;
  x = e.pageX;
  y = e.pageY;
}

window.onmousemove = function (e) {
  if (down) {
    scene.x += e.pageX - x;
    scene.y += e.pageY - y;
    x = e.pageX;
    y = e.pageY;
  }
}

window.onmouseup = function (e) {
  down = false
}