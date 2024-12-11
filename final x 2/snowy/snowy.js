let snowflakes = []; 
let bigSnowflakes = []; 
let snowyMusic;
let playing = false;

function preload() {
  snowyMusic = loadSound("../assets/Snowy.mp3");
}

function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent("p5-canvas-container"); 
    noStroke();
  }
  

function draw() {
  background(30, 50, 80);

  for (let i = bigSnowflakes.length - 1; i >= 0; i--) {
    let big = bigSnowflakes[i];
    big.show();
    big.fall(); 

    if (big.isFalling) {
      for (let j = 0; j < 2; j++) { 
        snowflakes.push(new SmallSnowflake(big.x, big.y));
      }
    }

    if (big.offScreen()) {
      bigSnowflakes.splice(i, 1);
    }
  }

  for (let i = snowflakes.length - 1; i >= 0; i--) {
    snowflakes[i].show();
    snowflakes[i].fall();
    if (snowflakes[i].offScreen()) {
      snowflakes.splice(i, 1); 
    }
  }

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click to create big snowflakes. Press SPACE to play snowy music!", width / 2, height - 20);
}

function keyPressed() {
  if (key === " " && !playing) {
    snowyMusic.loop();
    playing = true;
  }
}

function mousePressed() {
  bigSnowflakes.push(new BigSnowflake(mouseX, mouseY));
}

class BigSnowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(50, 80);
    this.speed = random(0.5, 1.5); 
    this.isFalling = true;
  }

  show() {
    fill(240, 240, 255, 180);
    ellipse(this.x, this.y, this.size);

    for (let i = 0; i < TWO_PI; i += PI / 6) {
      let xOffset = cos(i) * this.size * 0.5;
      let yOffset = sin(i) * this.size * 0.5;
      ellipse(this.x + xOffset, this.y + yOffset, this.size * 0.3);
    }
  }

  fall() {
    this.y += this.speed;
  }

  offScreen() {
    return this.y > height + this.size; 
  }
}

class SmallSnowflake {
  constructor(x, y) {
    this.x = x + random(-20, 20);
    this.y = y;
    this.size = random(5, 10);
    this.speed = random(1, 3);
  }

  show() {
    fill(255, 250, 250, 200);
    ellipse(this.x, this.y, this.size);
  }

  fall() {
    this.y += this.speed;
    this.x += random(-0.5, 0.5); 
  }

  offScreen() {
    return this.y > height;
  }
}
