// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var frog;
var frog_img;
var log_img;

var grid_size = 50;

var rows = [];

// Handles game reset if the frog dies, or at the initial load.
function resetGame() {
  frog = new Frog(width / 2, height - grid_size, grid_size);
}

function preload() {
  frog_img = loadImage('imgs/frog.png');
  log_img = loadImage('imgs/log_150.png');
}

// p5js setup function, ran on page load.
function setup() {
  width = 500;
  rows = [
    new Row(            0, 1,    0,         width,   0,   0, true),
    new Row(1 * grid_size, 2,  0.5, 4 * grid_size, 400,  10, true),
    new Row(2 * grid_size, 3, -1.3, 2 * grid_size, 200,  30, true),
    new Row(3 * grid_size, 2,  2.3, 3 * grid_size, 250,  25, true),
    new Row(4 * grid_size, 1,    0,         width,   0,   0, true),
    new Row(5 * grid_size, 3,  1.2, 1 * grid_size, 150, 100, false),
    new Row(6 * grid_size, 2, -3.5, 1 * grid_size, 200, 150, false),
    new Row(7 * grid_size, 2,    2, 2 * grid_size, 300,   0, false),
    new Row(8 * grid_size, 1,    0,         width,   0,   0, true),
  ];
  createCanvas(width, rows.length * grid_size);
  resetGame();
}

// p5js draw function, ran on every frame.
function draw() {
  background(0, 155, 155, 200);

  var intersects = null;

  for(var i = 0; i < rows.length; i++) {
    rows[i].show(log_img);
    rows[i].update();
    if(frog.intersects(rows[i])) {
      intersects = rows[i].hits(frog);
      if((intersects !== null) ^ rows[i].inverted) {
        resetGame();
      }
    }
  }

  frog.attach(intersects);
  frog.update();
  frog.show(frog_img);
}

// p5js key pressed function, runs when any key is pressed on the keyboard
// while the game is open.
function keyPressed() {
  if(keyCode === UP_ARROW) {
    frog.move(0, -grid_size);
  } else if(keyCode === DOWN_ARROW) {
    frog.move(0, grid_size);
  } else if(keyCode === LEFT_ARROW) {
    frog.move(-grid_size, 0);
  } else if(keyCode === RIGHT_ARROW) {
    frog.move(grid_size, 0);
  }
}
