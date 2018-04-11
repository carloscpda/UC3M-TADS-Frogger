// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

// Implements a rectangle for testing collisions.
function Rectangle(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

// Check intersection with any other Rectangle object.
Rectangle.prototype.intersects = function(other) {
  return !(
    this.x + this.w  <= other.x            ||
    this.x           >= other.x + other.w  ||
    this.y + this.h  <= other.y            ||
    this.y           >= other.y + other.h
  );
}

// Moves this rectangle by the provided x and y distances.
Rectangle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
}

Rectangle.prototype.show = function() {
  color(255);
  rect(this.x, this.y, this.w, this.h);
}