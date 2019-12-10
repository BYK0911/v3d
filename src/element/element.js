class Element {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.fill = 'rgba(255, 255, 255, 0)';
    this.stroke = 'rgba(0, 0, 0, .5)';
    this.lineWidth = 1;
  }

  render () {

  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Element;