import { from } from 'core-js/fn/array';
import { scaleLinear } from 'd3';
import { AxisOrientation } from '../enums'

const Axis = (() => {
  let orientation = AxisOrientation.TOP;
  let scale = scaleLinear();

  class Axis {
    constructor(svg) {
      this.svg = svg;
    }

    draw() {
      orientation.scale(scale);
    }

    scale(_) {
      if (!arguments.length) {
        return scale;
      }
      scale = _;
      return this;
    }

    orient(_) {
      if (!arguments.length) {
        return orientation;
      }
      orientation = _;
      return this;
    }
  }
  return Axis;
})();

export default Axis;
