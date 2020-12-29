<template>
  <div class="container">
    <svg id="defs">
      <defs>
        <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#005C99;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0099FF;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0   0
                     0 0 0 0.9 0
                     0 0 0 0.9 0
                     0 0 0 1   0"
          />
          <feGaussianBlur stdDeviation="5.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import { geoOrthographic, geoPath, select, zoom } from 'd3';
import world from './world.json';

function drawStars(startNumber) {
  const data = [];
  for (let i = 0; i < startNumber; i += 1) {
    data.push({
      geometry: {
        type: 'Point',
        coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90]
      },
      type: 'Feature',
      properties: {
        radius: Math.random() * 1.5
      }
    });
  }
  return data;
}

function drawEarth(width, height) {
  const spaceProjection = geoOrthographic().translate([width / 2, height / 2]);
  spaceProjection.scale(spaceProjection.scale() * 3);
  const spacePath = geoPath()
    .projection(spaceProjection)
    .pointRadius(1);

  const projection = geoOrthographic().translate([width / 2, height / 2]);
  const scale = projection.scale();
  const path = geoPath()
    .projection(projection)
    .pointRadius(2);

  const svg = select('.container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  const starList = drawStars(300);
  const stars = svg
    .append('g')
    .selectAll('g')
    .data(starList)
    .enter()
    .append('path')
    .attr('class', 'star')
    .attr('d', d => {
      spacePath.pointRadius(d.properties.radius);
      return spacePath(d);
    });

  svg
    .append('rect')
    .attr('class', 'frame')
    .attr('width', width)
    .attr('height', height);

  const backgroundCircle = svg
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', projection.scale())
    .attr('class', 'globe')
    .attr('filter', 'url(#glow)')
    .attr('fill', 'url(#gradBlue)');

  const g = svg.append('g');

  const features = g
    .selectAll('.feature')
    .data(world.features)
    .enter()
    .append('path')
    .attr('class', 'feature')
    .attr('d', path)
    .on('mouseover', function() {
      select(this).attr('class', 'selectedFeature');
    })
    .on('mouseout', function() {
      select(this).attr('class', 'feature');
    });

  const move = zoom()
    .scaleExtent([1, 5])
    .on('zoom', event => {
      const eventScale = event.transform.k * scale;
      let rotate = [event.transform.x * -1, event.transform.y];

      projection.scale(eventScale);
      spaceProjection.scale(eventScale * 3);
      backgroundCircle.attr('r', eventScale);
      path.pointRadius((3 * eventScale) / scale);

      projection.rotate(rotate);
      spaceProjection.rotate([rotate[0] * -1, rotate[1] * -1]);

      features.attr('d', path);

      stars.attr('d', d => {
        spacePath.pointRadius(d.properties.radius);
        return spacePath(d);
      });
    });
  svg.call(move);
}

export default {
  name: 'Earth',
  data() {
    return { width: 1000, height: 1000 };
  },
  mounted() {
    drawEarth(this.width, this.height);
  }
};
</script>

<style>
.container {
  background-color: #444444;
  background-image: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#000),
    to(#333)
  );
  background-image: -webkit-linear-gradient(left top, #000, #333);
  background-image: -moz-linear-gradient(left top, #000, #333);
  overflow: hidden;
}

#defs {
  height: 0;
  width: 0;
}

.frame {
  fill: none;
  pointer-events: all;
}

.feature {
  fill: #6ccc00;
  stroke: #fff;
  stroke-width: 0.5px;
}

.selectedFeature {
  fill: cadetblue;
  stroke: #fff;
  stroke-width: 0.5px;
}

.globe {
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 0.25px;
}

.star {
  fill: #fff;
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 0.25px;
}
</style>
