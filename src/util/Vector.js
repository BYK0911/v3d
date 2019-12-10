import determinant from './Det';

let { A } = determinant;

const Vector = {
  add (...vs) {
    let res = [];

    vs.forEach(v => {
      v.forEach((d, i) => {
        res[i] = res[i] ? res[i] + d : d
      })
    })

    return res;
  },

  minus (v1, v2) {
    let v = [...v1];
    v2.forEach((d, i) => {
      v[i] = (v[i] || 0) - d;
    })
  },

  norm (v) {
    if (v.length === 0) return;
    return Math.sqrt(v.reduce((res, n) => res + n * n, 0));
  },

  dot (v1, v2) {
    let len = Math.min(v1.length, v2.length),
      res = 0,
      i = -1;
    
    while (++i < len) {
      res += v1[i] * v2[i]
    }
    
    return res;
  },

  /**
   * 向量积
   * @param {Array} v1 
   * @param {Array} v2 
   */
  cross (v1, v2) {
    let [x1, y1, z1] = v1;
    let [x2, y2, z2] = v2;
    z1 === undefined && (z1 = 0);
    z2 === undefined && (z2 = 0);
    
    let D = [
      [1, 1, 1],
      [x1, y1, z1],
      [x2, y2, z2]
    ]

    return [A(D, 0, 0), A(D, 0, 1), A(D, 0, 2)];
  },

  scale (v, n) {
    return v.map(d => d * n);
  },

  cos (v1, v2) {
    let n1 = this.norm(v1);
    let n2 = this.norm(v2);
    if (!n1 || !n2) return 1;

    return this.dot(v1, v2) / n1 / n2;
  },

  sin (v1, v2) {
    let n1 = this.norm(v1);
    let n2 = this.norm(v2);
    if (!n1 || !n2) return 1;

    return this.norm(this.cross(v1, v2)) / n1 / n2;
  },

  normalVector (ps) {
    let res = [0, 0, 0];
    let i = -1;
    ps = [...ps, ps[0]];

    while (++i < ps.length - 1) {
      res = this.add(res, this.cross(ps[i], ps[i + 1]))
    }

    return res;
  }
}
export default Vector;