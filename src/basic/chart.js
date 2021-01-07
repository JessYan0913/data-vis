import { select } from 'd3';

const Chart = (() => {
  let data = [];
  let width = 500;
  let height = 500;
  let margin = { top: 20, right: 20, bottom: 20, left: 20 };

  class Chart {
    constructor(selection) {
      this.selection = selection;
      this.svg = select(this.selection).append('svg');
    }

    data(_) {
      if (!arguments.length) return data;
      data = _;
      return this;
    }

    width(_) {
      if (!arguments.length) return width;
      width = +_;
      this.svg.attr('width', width - margin.left - margin.right);
      return this;
    }

    height(_) {
      if (!arguments.length) return height;
      height = +_;
      this.svg.attr('height', height - margin.top - margin.bottom);
      return this;
    }

    margin(_) {
      if (!arguments.length) return margin;
      margin = _;
      this.svg
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom);
      return this;
    }
  }

  return Chart;
})();

export default Chart;
