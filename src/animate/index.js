
const animations = [];

const animateTimingFunctions = {
  linear: n => n,
  ease: n => n * n,
  easeOut: n => Math.sqrt(n)
}

class Animation {
  constructor () {
    this.duration = 300;
    this.delay = 0;
    this.timingFunction = 'ease';
    this.data = null;
    this.timeStart = null;
    this.playing = false;
    this.timePaused = null;
    this.loop = 1;
    this.direction = 'normal';
  }

  run () {
    let timeStamp = +new Date();

    if (timeStamp - this.timeStart > this.delay) {
      let p = (timeStamp - this.timeStart - this.delay) / this.duration;
      let fn = this.timingFunction;
      let { obj, originalStatus, deltas } = this.data;
      let n;

      if (p > 1) {
        if (--this.loop) {
          p -= 1;
          this.timeStart += this.duration;
        } else {
          p = 1;
          animations.splice(animations.indexOf(this), 1);
          this.playing = false;
        }
      }

      typeof fn === 'string' && (fn = animateTimingFunctions[fn] || animateTimingFunctions['ease']);
      n = fn(p);

      for (let k in deltas) {
        obj[k] = originalStatus[k] + deltas[k] * n;
      }
    }
  }

  play () {
    if (!this.playing && this.loop > 0) {
      this.playing = true;
      
      if (!this.timeStart) {
        this.timeStart = +new Date();
      }
      
      if (this.timePaused) {
        this.timeStart += +new Date - this.timePaused;
      }
      
      animations.push(this);
      if (animations.length === 1) runAimation(); 
    }

    return this;
  }

  pause () {
    if (this.playing) {
      animations.splice(animations.indexOf(this), 1);
      this.playing = false;
      this.timePaused = +new Date();
    }

    return this;
  }

  delay (delay = 0) {
    this.delay = delay;

    return this;
  }

  loop (n = 1) {
    this.loop = n;

    return this;
  }

  restart (loop) {
    this.loop = loop ? Math.max(loop, 1) : Math.max(this.loop, 1);
    this.timeStart = null;
    this.timePaused = null;
    this.play()
  }
}

function animate (obj, target, options) {
  let originalStatus = {};
  let deltas = {};

  Object.keys(target).forEach(key => {
    if (!isNaN(target[key]) && !isNaN(obj[key])) {
      originalStatus[key] = obj[key];
      deltas[key] = target[key] - obj[key];
    }
  })

  let animation = new Animation();

  Object.assign(animation, {
    data: { obj, originalStatus, deltas },
    ...options
  })

  animation.play();
  return animation;
}

function runAimation () {
  if (animations.length) {
    requestAnimationFrame(runAimation);
  }

  animations.forEach(ani => {
    ani.run()
  })
}

export default animate;