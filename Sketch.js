let blobs = [];
let numBlobs = 8;

function setup() {
  createCanvas(600, 800);
  noStroke();
  angleMode(RADIANS);

  for (let i = 0; i < numBlobs; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      r: random(40, 80),
      speed: random(1, 2),       // faster
      offset: random(1000),
      wobbleSeed: random(1000)
    });
  }
}

function draw() {
  background(15, 10, 30, 40); // dark background to enhance glow

  for (let b of blobs) {
    b.y -= b.speed;
    if (b.y < -b.r * 2) {
      b.y = height + b.r;
      b.x = random(width);
    }

    drawSquigglyBlob(b);
  }
}

function drawSquigglyBlob(b) {
  let x = b.x + map(noise(b.offset + frameCount * 0.01), 0, 1, -15, 15);
  let y = b.y;
  let r = b.r;
  let detail = 40;

  // Glowy aura
  for (let i = 3; i > 0; i--) {
    fill(255, 80, 80, 15); // soft red glow
    drawBlobShape(x, y, r * i * 1.1, detail, b.wobbleSeed, 0.8);
  }

  // Main red blob
  fill(255, 80, 80, 150);
  drawBlobShape(x, y, r, detail, b.wobbleSeed, 1.3);
}

function drawBlobShape(x, y, baseR, points, seed, wobbleAmount) {
  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / points) {
    let nx = cos(i + frameCount * 0.01);
    let ny = sin(i + frameCount * 0.01);
    let noiseFactor = map(noise(seed + nx, seed + ny, frameCount * 0.01), 0, 1, 1 - wobbleAmount, 1 + wobbleAmount);
    let r = baseR * noiseFactor;
    let px = x + cos(i) * r;
    let py = y + sin(i) * r;
    vertex(px, py);
  }
  endShape(CLOSE);
}
