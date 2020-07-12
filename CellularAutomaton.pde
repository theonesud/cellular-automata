int cellSize = 5;  // in pixels
int percentAlive = 15;
int fps = 25;

World w;
boolean isPaused = false;

void setup() {
    size(800, 500);  // size of the world in pixels
    background(0);
    stroke(255, 35);
    frameRate(fps);
    // noSmooth();
    // noLoop();

    w = new World(cellSize);
    w.randomInit(percentAlive);
}

void draw() {
    // println(round(frameRate) + " fps");
    w.render();
    w.nextGen();
}

void keyPressed() {

}