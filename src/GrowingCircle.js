class GrowingCircle {
  /**
   * Creates a growing circle that can be drawn on a canvas
   * @param {String} color the color to draw the circle (css color string)
   * @param {Number} x center of circle
   * @param {Number} y center of circle
   * @param {Number} radius initial starting radius of circle
   * @param {Number} maxRadius how large the circle should get before it marked for destruction
   * @param {Number} growRate coefficent that grows the circle
   */
  constructor(color, x, y, radius, maxRadius, growRate = 1.02) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxRadius = maxRadius;
    this.growRate = growRate;
  }
  /**
   * Perform one 'tick' of growing pattern, set render flag.
   * @return true if radius is still less than maxRadius
   */
  tick() {
    this.radius *= this.growRate;
    // console.log(`radius now ${this.radius}`)
    this.needsRender = true;
    if (this.radius < this.maxRadius) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Draw the circle in its current state. Clears render flag.
   * @param {CanvasRenderingContext2D} context the context to draw with
   */
  render(context) {
    this.needsRender = false;
    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }
}

export default GrowingCircle;