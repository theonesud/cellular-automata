let myp5 = new p5((sketch) => {

  // let cellSize = 5; // in pixels
  // let startingLife = 35;
  let fps = 60;
  let w

  sketch.setup = () => {
    cell_size = Math.min(window.innerWidth, window.innerHeight) / 8

    sketch.createCanvas(cell_size * 8, cell_size * 8);

    sketch.background(dead_black);
    sketch.stroke(255, 17);
    sketch.frameRate(fps);
    sketch.textSize(20);

    resetButton = sketch.createButton('Reset');
    resetButton.position(0, 0);
    resetButton.mousePressed(resetWorld);

    clearButton = sketch.createButton('Clear');
    clearButton.position(75, 0);
    clearButton.mousePressed(clearWorld);

    debug = sketch.createButton('Debug');
    debug.position(150, 0);
    debug.mousePressed(debugWorld);

    side = 1
    w = new chessworld(sketch, cell_size, 8, 8);
    w.Init(side);
    w.images_preload()

    sketch.loop();
  };

  sketch.draw = () => {
    w.render();
    w.nextGen();
  };

  sketch.keyPressed = () => {
    if (sketch.key === " ") {
      if (sketch.isLooping()) {
        sketch.noLoop();
      } else {
        sketch.loop();
      }
    }
  };

  resetWorld = () => {
    w.randomInit(startingLife);
    w.render();
  };

  clearWorld = () => {
    w.clear();
    w.render();
  };

  debugWorld = () => {
    w.toggle_stats()
  };
});
