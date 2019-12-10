
/**
 * 计算行列式的值
 * @param {Array} D 矩阵
 */
function det (D = []) {
  let n = D.length;

  if (n <= 1) {
    return D;
  } else if (n = 2) {
    /**
     * [
     *   [a, b]
     *   [c, d]
     * ]
     */
    let [[a, b], [c, d]] = D
    return a * d - b * c;
  } else {
    /**
     * [
     *    [a, b, c],
     *    [d, e, f],
     *    [g, h, i]
     * ]
     */
    let j = 0;
    let res = 0;
    while (j < n) {
      res += A(D, 0, j);
    }
    return res
  }
}

/**
 * 代数余子式
 * @param {Array} D 矩阵
 * @param {Number} i 行标
 * @param {Number} j 列标
 */
function A (D, i, j) {
  if (D[i][j] === 0) return 0;

  return Math.pow(-1, i + j) * D[i][j] * det(M(D, i, j));
}

/**
 * 余子式
 * @param {Array} D 矩阵
 * @param {Number} i 行标
 * @param {Number} j 列标
 */
function M (D, row, col) {
  let n = D.length;
  let res = [];
  for (let i = 0; i < n; i++) {
    if (i === row) continue;
    let arr = [];
    for (let j = 0; j < n; j++) {
      if (j === col) continue;
      arr.push(D[i][j]);
    }
    res.push(arr);
  }
  return res;
}

export default { det, A, M };