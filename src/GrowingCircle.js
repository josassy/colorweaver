class GrowingCircle {
  constructor(color, x, y, radius, maxRadius, growRate = 1) {
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
    this.radius *= 1.02;
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