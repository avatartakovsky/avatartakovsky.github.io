// sketch.js
let cnv, t = 0;

function setup() {
  // Ensure old canvas (if hot-reloaded) is cleared
  const old = document.querySelector('#canvas-holder canvas');
  if (old) old.remove();

  const w = (windowWidth > 900) ? 520 : Math.max(320, windowWidth - 64);
  cnv = createCanvas(w, 340);

  // Parent canvas into the black box
  cnv.parent('canvas-holder');

  noiseDetail(2, 0.4);
}

function windowResized() {
  const w = (windowWidth > 900) ? 520 : Math.max(320, windowWidth - 64);
  resizeCanvas(w, 340);
}

function draw() {
  background(15, 18, 28, 220);

  noStroke();
  for (let i = 0; i < 6; i++) {
    const x = width * (0.2 + 0.6 * noise(i * 99 + t * 0.08));
    const y = height * (0.2 + 0.6 * noise(i * 31 + t * 0.08));
    const r = 50 + 120 * noise(i * 7 + t * 0.06);
    fill(50 + 100 * noise(i + 1), 100 + 120 * noise(i + 2), 255, 32);
    circle(x, y, r * 2);
  }

  stroke(210, 224, 255, 120);
  noFill();
  for (let yy = 30; yy < height - 20; yy += 14) {
    beginShape();
    for (let xx = 20; xx < width - 20; xx += 18) {
      const n = noise(xx * 0.005, yy * 0.01, t * 0.02);
      const y2 = yy + (n - 0.5) * 26;
      vertex(xx, y2);
    }
    endShape();
  }

  t += 0.8 / 60;
}
