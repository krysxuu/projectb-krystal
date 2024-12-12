let raindrop;
let rainyMusic;

function preload() {
    rainyMusic = loadSound("assets/Rainy.mp3");
}

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('p5-canvas-container');
    raindrop = new Raindrop(width / 2, height / 2);

    let startButton = createButton("Start Rain Sound");
    startButton.position(20, height + 20);
    startButton.mousePressed(() => {
        if (!rainyMusic.isPlaying()) {
            rainyMusic.loop();
        }
    });
}

function draw() {
    background(180, 220, 255);
    raindrop.display();
    raindrop.move();
}

function keyPressed() {
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
        if (!rainyMusic.isPlaying()) {
            rainyMusic.play();
        }
    }
}

function keyReleased() {
    if (!keyIsPressed) {
        rainyMusic.stop();
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
        vertex(0, -this.size / 2);
        bezierVertex(this.size / 4, -this.size / 3, this.size / 4, this.size / 3, 0, this.size / 2);
        bezierVertex(-this.size / 4, this.size / 3, -this.size / 4, -this.size / 3, 0, -this.size / 2);
        endShape(CLOSE);
        pop();
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }
}
