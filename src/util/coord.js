class Coord {
  constructor (x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  matrix (a, b, c, d, e, f, g, h, i, j, k, l) {
    /**
     * a, b, c, d   x
     * e, f, g, h   y
     * i, j, k, l   z
     * 0, 0, 0, 1   1
     */
    let {x, y, z} = this;
    this.x = a * x + b * y + c * z + d;
    this.y = e * x + f * y + g * z + h;
    this.z = i * x + j * y + k * z + l
  }

  translate (dx = 0, dy = 0, dz = 0) {
    this.x += dx;
    this.y += dy;
    this.z += dz;
  }

  rotate (angle = 0) {
    angle = angle / 180 * Math.PI;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    this.matrix(cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0);
  }

  rotateX (angle = 0) {
    angle = angle / 180 * Math.PI;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    this.matrix(1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0);
  }

  rotateY (angle = 0) {
    angle = angle / 180 * Math.PI;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    this.matrix(cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0);
  }
}

export default function (x, y, z) {
  return new Coord(x, y, z);
}
