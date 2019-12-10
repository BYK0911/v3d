class Renderer {
  constructor () {
    this.dom = document.createElement('canvas');
    this.ctx = this.dom.getContext('2d');
  }

  polyline (ps) {
    ps.forEach((p, i) => {
      if (i=== 0) this.ctx.moveTo(...p);
      else this.ctx.lineTo(...p);
    })
  }

  polygone (ps) {
    this.ctx.beginPath();
    this.polyline(ps);
    this.ctx.closePath();
  }
}

export default Renderer;