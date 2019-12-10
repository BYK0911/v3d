
import v3d from '../src';

var scene = new v3d.Scene();

scene.perspective = 500;
scene.setSize(window.innerWidth, window.innerHeight);
scene.setLight(0, 1, 1);
document.body.appendChild(scene.renderer.dom);

var cubic = new v3d.Cubic(0, 0, 0, 150, 150, 150);

cubic.fill = '#5fa';
scene.add(cubic);

scene.render();

let ani = v3d.animate(scene, { rotationX: 360, rotationZ: 360 }, { timingFunction: 'linear', duration: 10000, loop: Infinity })
window.addEventListener('click', () => {
  ani.playing ? ani.pause() : ani.play();
})