<template>
  <div id="dataVisLine"></div>
</template>

<script>
import { select, scaleLinear, extent, line, axisRight, axisTop } from 'd3';
import dataSource from './data.json';

function makeScaleLinear(data, accessor, range) {
  return scaleLinear()
    .domain(extent(data, accessor))
    .range(range)
    .nice();
}

let width = 500,
  height = 500;

function axis(svg, xScale, yScale, width, height) {
  if (!(svg instanceof Object)) {
    return;
  }

  svg
    .append('g')
    .call(axisRight(yScale))
    .call(g =>
      g
        .selectAll('.tick:not(:first-of-type) line')
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', '2,9')
        .attr('x2', width)
    );

  svg
    .append('g')
    .call(axisTop(xScale))
    .call(g =>
      g
        .selectAll('.tick:not(:first-of-type) line')
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', '2,9')
        .attr('y2', -height)
    )
    .attr('transform', 'translate(0, ' + height + ')');
}

function bar(svg, data, width, heigh, xScale, yScale) {
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d['x']))
    .attr('width', 10)
    .attr('y', d => yScale(d['y']))
    .attr('height', function(d) {
      return height - yScale(d['y']);
    });
}

function drawLine() {
  const svg = select('#dataVisLine')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  let xScale = makeScaleLinear(dataSource, d => d['x'], [0, width]);
  let yScale = makeScaleLinear(dataSource, d => d['y'], [height, 0]);
  
  bar(svg, dataSource, width, height, xScale, yScale);
  axis(svg, xScale, yScale, width, height);
}

export default {
  name: 'dataVisLine',
  data() {
    return {};
  },
  mounted() {
    drawLine();
  },
  methods: {}
};
</script>

<style>
.bar {
  fill: steelblue;
}
</style>
