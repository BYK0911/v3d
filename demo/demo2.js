
import v3d from '../src';

var scene = new v3d.Scene();

scene.perspective = 1300;
scene.rotationX = 65;
scene.rotationZ = 126;
scene.backgroundColor = 'rgba(0, 0, 0, 1)';
scene.setSize(window.innerWidth, window.innerHeight);
scene.setPosition(-112, 140, 0);

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
  let k = e.wheelDelta < 0 ? 1.1 : 1 / 1.1;
  scene.perspective *= k;
}

let x = 0;
let y = 0;

let cx = window.innerWidth / 2;
let cy = window.innerHeight / 2;
let down = false;

window.onmousedown = function (e) {
  down = true;
  x = e.pageX;
  y = e.pageY;
}

window.onmousemove = function (e) {
  if (down && (e.pageX !== x || e.pageY !== y)) {
    if (e.shiftKey) {
      let [a, b] = [x - cx, y - cy];
      let [c, d] = [e.pageX - cx, e.pageY - cy];
      let boo = a * d > b * c;
      let angle = Math.acos((a * c + b * d) / Math.sqrt(a * a + b * b) / Math.sqrt(c * c + d * d));
      angle = angle / Math.PI * 180;
      scene.rotationZ += boo ? angle : -angle;
    } else if (e.metaKey) {
      
      scene.rotationX += e.pageY < y ? 5 : e.pageY > y ? -5 : 0;
    } else {
      scene.x += e.pageX - x;
      scene.y += e.pageY - y;
    }

    x = e.pageX;
    y = e.pageY;
  }
}

window.onmouseup = function (e) {
  e.preventDefault();
  console.log(scene);
  down = false
}

var d = document.createElement('div');
d.innerHTML = '拖动移动图形位置；<br>按下Shift键拖动 延z轴旋转；<br>按下Command或Window键 延x轴旋转；';
d.style.position = 'fixed';
d.style.top = '0';
d.style.left = '0';
d.style.width = '100%';
d.style.color = '#fff';
d.style.fontSize = '12px';
d.style.padding = '10px';
d.style.textAlign = 'center';

document.body.append(d);