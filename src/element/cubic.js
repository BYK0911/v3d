import Element from './element'

class Cubic extends Element {
  constructor (ox = 0, oy = 0, oz = 0, a = 1, b = 1, c = 1) {
    super();
    this.stroke = 'rgba(0, 0, 0, .5)';
    this.fill = 'rgba(200, 200, 200, 1)';
    this.vertexes = [
      [0, 0, 0],
      [a, 0, 0],
      [a, b, 0],
      [0, b, 0],
      [0, 0, c],
      [a, 0, c],
      [a, b, c],
      [0, b, c],
    ].map(p => {
      let [x, y, z] = p;
      return [x - a / 2 + ox, y - b / 2 + oy, z - c / 2 + oz];
    })

    this.edges = [];

    this.faces = [
      [0, 3, 2, 1],
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7],
      [4, 5, 6, 7]
    ]
  }
}

export default Cubic;