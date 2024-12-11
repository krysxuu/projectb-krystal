let stormSound;
let fft;
let playing = false;

function preload() {
  stormSound = loadSound('../assets/Stormy.mp3', loaded, loadError);
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container"); 
  fft = new p5.FFT();
  noFill();
}

function draw() {
  background(30, 30, 50);

  if (!playing) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Click anywhere to start the music and adjust volume with your mouse!", width / 2, height / 2);
  }

  if (playing && stormSound.isPlaying()) {
    let volume = map(mouseY, height, 0, 0, 1);
    stormSound.setVolume(volume);

    let waveform = fft.waveform();
    stroke(200, 200, 255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, height / 2 - 50, height / 2 + 50);
      vertex(x, y);
    }
    endShape();
  }
}

function mousePressed() {
  if (!playing) {
    stormSound.loop();
    playing = true;
  }
}

function loaded() {
  console.log("Sound loaded successfully.");
}

function loadError(err) {
  console.error("Error loading sound file:", err);
}
