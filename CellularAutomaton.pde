int cellSize = 5;  // in pixels
int percentAlive = 20;
int fps = 20;
boolean debug = true;

World w;
boolean isPaused = false;

void setup() {
    size(800, 500);  // size of the world in pixels
    background(dead_black);
    stroke(255, 35);
    frameRate(fps);
    textSize(20);
    // noSmooth();
    // noLoop();

    w = new World(cellSize);
    w.randomInit(percentAlive);
}

void draw() {
    if (isPaused == false) {
        w.render();
        w.nextGen();
    }
}

void keyPressed() {
    if (key == ' '){
        isPaused = !isPaused;
    } else if ((key == 'c' || key == 'C')&&(isPaused == true)){
        w.clear();
        w.render();
    } else if ((key == 'r' || key == 'R')&&(isPaused == true)){
        w.randomInit(percentAlive);
        w.render();
    }
}