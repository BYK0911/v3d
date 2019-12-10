
const n = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'a': 10,
  'b': 11,
  'c': 12,
  'd': 13,
  'e': 14,
  'f': 15,
}

function getRgba (color) {
  let r, g, b, a = 1;
  
  if (color[0] === '#') {
    let s = color.slice(1);
    s.length === 3 && (s = `${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`);

    r = n[s[0]] * 16 + n[s[1]];
    g = n[s[2]] * 16 + n[s[3]];
    b = n[s[4]] * 16 + n[s[5]];
  } else if (color.match(/rgba/)) {
    [r, g, b, a] = color.slice(5, -1).split(/,\s*/g);
  } else {
    [r, g, b] = color.slice(4, -1).split(/,\s*/g);
  }

  return {r, g, b, a};
}

export default getRgba;