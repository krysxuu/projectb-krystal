let raindrop;
let rainyMusic;

function preload() {
    rainyMusic = loadSound("assets/Rainy.mp3", 
        () => console.log("Sound loaded successfully!"),
        (err) => console.error("Failed to load sound:", err)
    );
}

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('p5-canvas-container');
    raindrop = new Raindrop(300, 300);

    // Add a start button for audio (in case autoplay is blocked)
    let startButton = createButton("Start Rain Sound");
    startButton.position(width / 2 - 50, height + 20);
    startButton.mousePressed(() => {
        if (!rainyMusic.isPlaying()) {
            rainyMusic.play();
        }
    });
}

function draw() {
    background(200, 230, 255);
    raindrop.display();
    raindrop.move();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || 
        keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        if (!rainyMusic.isPlaying()) {
            rainyMusic.play();
        }
    }
}

function keyReleased() {
    if (!keyIsPressed) { // Simplified logic
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
        bezierVertex(this.size / 4, -this.size / 3,
                     this.size / 4, this.size / 3,
                     0, this.size / 2);
        bezierVertex(-this.size / 4, this.size / 3,
                     -this.size / 4, -this.size / 3,
                     0, -this.size / 2);
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
