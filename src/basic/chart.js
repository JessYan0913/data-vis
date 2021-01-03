const Chart = (() => {
  let data = [];
  let width = 500;
  let height = 500;
  let margin = { top: 20, right: 20, bottom: 20, left: 20 };

  class Chart {
    constructor(selection) {
      this.selection = selection;
    }

    data(_) {
      if (!arguments.length) return data;
      data = _;
      return this;
    }

    width(_) {
      if (!arguments.length) return width;
      width = +_;
      return this;
    }

    height(_) {
      if (!arguments.length) return height;
      height = +_;
      return this;
    }

    margin(_) {
      if (!arguments.length) return margin;
      margin = _;
      return this;
    }
  }

  return Chart;
})();

export default Chart;
