// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

/* Implementation of the frog
 *
 * x: initial x position of the frog
 * y: initial y position of the frog
 * size: the width & height of the frog
 */
function Heart(x, y, size) {
  Rectangle.call(this, x, y, size, size);
}

// Extend Rectangle.
Heart.prototype = Object.create(Rectangle.prototype);

// Show the frog in the game window.
Heart.prototype.show = function(img) {
  image(img, this.x, this.y, this.w, this.h);
}
