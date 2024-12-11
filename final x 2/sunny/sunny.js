let angle = 0;
let s = 30; 
let sunnyMusic; 
let playing = false;

function preload() {
  sunnyMusic = loadSound("../assets/Sunny.mp3");
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100);
  noFill();
}

function draw() {
  background(20, 80, 100); 

  for (let i = 0; i < width; i += s) {
    for (let j = 0; j < height; j += s) {
      let d = dist(mouseX, mouseY, i, j);
      let f = map(d, 0, sqrt(width * width + height * height), 0.1, 2);
      let h = map(d, 0, width, 20, 60); 
      let sat = map(angle % (2 * PI), 0, 2 * PI, 50, 100);
      angle = map(d, 0, sqrt(width * width + height * height), 0, 2 * PI);

      stroke(h, sat, 100, 0.8);
      push();
      translate(i, j);
      rotate(angle);

      if ((i + j) % 60 < 30) {
        line(0, 0, s * f, s * f);
      } else {
        ellipse(0, 0, s * f, s * f);
      }

      pop();
    }
  }

  fill(100, 50, 90);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click once to enable sound. Move your mouse to make the sun shine!", width / 2, height - 20);
}

function mousePressed() {
  if (!playing) {
    sunnyMusic.loop();
    sunnyMusic.setVolume(0); 
    playing = true;
  }
}

function mouseMoved() {
  if (playing) {
    let volume = map(mouseX, 0, width, 0, 1); 
    sunnyMusic.setVolume(volume);
  }
}
