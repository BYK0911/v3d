import createCoord from './util/coord'
import Renderer from "./renderer";
import Vector from './util/Vector'
import getRgba from './util/getRgba';

class Scene {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 300;
    this.rotationX = 0;
    this.rotationZ = 0;
    this.perspective = 100;
    this.light = [1, 1, 1];
    this.backgroundColor = 'rgba(255, 255, 255, 0)';
    this.elements = [];
    this.renderer = new Renderer();
  }

  render () {
    window.requestAnimationFrame(() => this.render());

    let elems = this.getRenderElements();

    this.renderer.ctx.clearRect(0, 0, this.width, this.height);
    this.renderer.ctx.save();
    this.renderer.ctx.fillStyle = this.backgroundColor;
    this.renderer.ctx.fillRect(0, 0, this.width, this.height);
    this.renderer.ctx.translate(this.width / 2, this.height / 2);
    this.renderer.ctx.scale(1, -1);

    elems.sort((a, b) => {
      return a.index - b.index;
    })
    .forEach(elem => {
      elem.faces.forEach(f => this.drawFace(f, elem.fill));
      elem.edges.forEach(e => this.drawEdge(e, elem.stroke));
    });
    this.renderer.ctx.restore();
  }

  // 画面
  drawFace (face, fill) {
    let { points, normal } = face, k, color;
    let {r, g, b} = getRgba(fill);

    if (normal[2] > 0) {
      k = (1 + Vector.cos(this.light, normal)) / 2 * .5 + .4;
      color = `rgba(${r * k}, ${g * k}, ${b * k}, 1)`;

      this.renderer.polygone(points);
      this.renderer.ctx.fillStyle = color;
      this.renderer.ctx.fill();
    }
  }

  // 画线
  drawEdge (edge) {
    let { points } = edge;

    this.renderer.ctx.beginPath();
    this.renderer.polyline(points);
    this.renderer.ctx.strokeStyle = '#ccc';
    this.renderer.ctx.stroke();
    this.renderer.ctx.beginPath();
  }

  add (elem) {
    this.elements.includes(elem) || this.elements.push(elem);
  }

  setPosition (x, y) {
    this.x = x;
    this.y = y;
  }

  setSize (w, h) {
    this.width = w;
    this.height = h;
    this.renderer.dom.width = w;
    this.renderer.dom.height = h;
    this.renderer.dom.style.width = w + 'px';
    this.renderer.dom.style.height = h + 'px';
  }

  setLight (x = 1, y = 1, z = 1) {
    this.light[0] = x;
    this.light[1] = y;
    this.light[2] = z;
  }

  getRenderElements () {
    let elems = [];

    this.elements.forEach(el => {
      let vs = [];
      let faces = [];
      let edges = [];
      let minZ;

      el.vertexes.forEach(v => {
        let _v = this.coordTransform(createCoord(...v));
        vs.push(_v);
        if (minZ === undefined || _v[2] < minZ) {
          minZ = _v[2];
        }
      });
      
      if (el.faces && el.faces.length) {
        el.faces.forEach(f => {
          let ps = f.map(i => vs[i]);
          let nv = Vector.normalVector(ps);
          faces.push({
            points: ps,
            normal: nv
          })
        })
      }

      if (el.edges && el.edges.length) {
        el.edges.forEach(e => {
          edges.push({
            points: e.map(i => vs[i])
          })
        })
      }

      elems.push({ index: minZ, faces, edges, fill: el.fill, stroke: el.stroke })
    })

    return elems;
  }

  coordTransform (coord) {
    coord.rotate(this.rotationZ);
    coord.rotateX(this.rotationX);
    coord.translate(this.x, -this.y); // 画布的y轴是向上的，与实际y轴方向相反；
    let {x, y, z} = coord;

    let k = (1 + z / this.perspective) * (this.width / this.perspective / 2);

    return [x * k, y * k, z];
  }
}

export default Scene;