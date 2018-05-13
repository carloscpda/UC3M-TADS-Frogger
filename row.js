// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

/* Implements a row of the game
 *
 * y: represents the y-position of this Row
 * count: The number of obstacles on this Row
 * speed: How fast the obstacles move
 * obs_width: The width of the obstacles
 * spacing: The gap between the obstacles. This is measured from the left
 *          of the first obstacle to the left of the next.
 * offset: The x-coordinate of the first obstacle on the row
 * inverted: Represents if the frog dies when hit by an obstacle (false)
 *           or if the frog dies when not hit by an obstacle (true)
 */
function Row(y, count, speed, obs_width, spacing, offset, inverted) {
  Rectangle.call(this, 0, y, width, grid_size);
  this.obstacles = [];
  this.inverted = inverted;
  this.speed = speed;
  for(var i = 0; i < count; i++) {
    var x = i * spacing + offset;
    if (count === 1) {
      this.obstacles.push(new SafeArea(x, y, obs_width, grid_size, this.speed));
    } else if(inverted) {
      this.obstacles.push(new Obstacle(x, y, obs_width, grid_size, this.speed));
    } else {
      this.obstacles.push(new Platform(x, y, obs_width, grid_size, this.speed));
    }
  }
}

// Extend Rectangle.
Row.prototype = Object.create(Rectangle.prototype);

// Shows this Row, showing all obstacles on it.
Row.prototype.show = function(log15, log2, log1) {
  for(var i = 0; i < this.obstacles.length; i++) {
    if (this.obstacles[i] instanceof Obstacle) {
      this.obstacles[i].show(log15, log2, log1);
    }
    else if (this.obstacles[i] instanceof Platform){
      this.obstacles[i].show();
    } else {
      this.obstacles[i].show();
    }
  }
}

// Update all obstacles on this row.
Row.prototype.update = function() {
  for(var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].update();
  }
}

// Handle a collision with another Rectangle, collider.
// Calculates which obstacle, if any, the collider has intersected.
Row.prototype.hits = function(collider) {
  var obstacle = null;
  for(var i = 0; i < this.obstacles.length; i++) {
    if(collider.intersects(this.obstacles[i])) {
      obstacle = this.obstacles[i];
    }
  }
  return obstacle;
}
