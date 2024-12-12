let raindrop;
let moveSound;

function preload() {
  soundFormats('mp3');
  moveSound = loadSound('Rainy.mp3');
}

function setup() {
  createCanvas(600, 600);
  raindrop = new Raindrop(300, 300);
}

function draw() {
  background(200, 230, 255);
  raindrop.display();
  raindrop.move();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || 
      keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    if (!moveSound.isPlaying()) {
      moveSound.play();
    }
  }
}

function keyReleased() {
  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && 
      !keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
    moveSound.stop();
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(100, 149, 237);
    noStroke();
    beginShape();
    vertex(0, -this.size/2);
    bezierVertex(this.size/4, -this.size/3, 
                 this.size/4, this.size/3, 
                 0, this.size/2);
    bezierVertex(-this.size/4, this.size/3, 
                 -this.size/4, -this.size/3, 
                 0, -this.size/2);
    endShape(CLOSE);
    pop();
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
