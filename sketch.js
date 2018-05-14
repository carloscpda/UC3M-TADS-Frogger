// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var frog;
var frog_img;
var log_img;
var log_2_img;
var car_img;
var car_5_img;
var is_menu;
var is_button = true;
var is_button = false;
var button;
var game_over = false;
var winner = false;
var start_time = 0;
var end_time = 0;

var grid_size = 50;

var rows = [];

// Handles game reset if the frog dies, or at the initial load.
function resetGame() {
  frog = new Frog(width / 2, height - grid_size, grid_size);
  start_time = performance.now();
}

function preload() {
  frog_img = loadImage('imgs/frog.png');
  log_img = loadImage('imgs/log_150.png');
  log_2_img = loadImage('imgs/log_200.png');
  log_1_img = loadImage('imgs/log_100.png');
  car_img = loadImage('imgs/car.png');
  car_5_img = loadImage('imgs/car_5.png');
  is_menu = true
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
  if (is_menu === true) {
    if (is_button === false) {
      button = createButton('Iniciar');
      button.position(0, 0);
      is_button = true;
    } else {
      button.mousePressed(function () {
        is_menu = false;
        is_button = false;
        button.remove();
      });
    }
    background(50);
    textSize(32);
    fill(255);
    text("PAUSE", 50, 200);
  } else if (game_over) {
    background(50);
    textSize(32);
    fill(255);
    text("GAME OVER", 50, 200);
    if (is_button === false) {
      button = createButton('Iniciar');
      button.position(0, 0);
      is_button = true;
    } else {
      button.mousePressed(function () {
        game_over = false;
        is_menu = false;
        is_button = false;
        button.remove();
        resetGame();
      });
    }
  } else if (winner) {
    background(50);
    textSize(32);
    fill(255);
    text("WINNER WINNER CHICKEN DINNER!!", 50, 200, 480);
    textSize(15);
    fill(255);
    text("Score: " + score(), 50, 400, 480);
    console.log(is_button);
    if (is_button === false) {
      console.log("Entra aqui");
      button = createButton('Iniciar');
      button.position(0, 0);
      is_button = true;
    } else {
      button.mousePressed(function () {
        winner = false;
        is_menu = false;
        is_button = false;
        button.remove();
        resetGame();
      });
    }
  } else {
    background(0, 155, 155, 200);

    var intersects = null;

    for(var i = 0; i < rows.length; i++) {
      rows[i].show(log_img, log_2_img, log_1_img, car_img, car_5_img);
      rows[i].update();
      if(frog.intersects(rows[i])) {
        intersects = rows[i].hits(frog);
        if((intersects !== null) ^ rows[i].inverted) {
          game_over = true;
          is_button = false;
        }
      }
    }

    if (frog.y === 0 && winner === false) {
      winner = true;
      end_time = performance.now();
    }

    frog.attach(intersects);
    frog.update();
    frog.show(frog_img);
  }
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
  } else if(keyCode === ESCAPE) {
    is_menu = true;
    is_button = false;
    draw(is_menu);
  }
}

function score() {
  return 10000/Math.abs(start_time-end_time)*100;
}
