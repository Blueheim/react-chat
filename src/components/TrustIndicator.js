import React, { useRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { arc } from 'd3-shape';
import { arcTween } from '../utils/d3-utils';

const tau = 2 * Math.PI;

const TrustIndicator = ({ rate, width, height }) => {
  const svgRef = useRef();

  // An arc function with all values bound except the endAngle. So, to compute an
  // SVG path string for a given angle, we pass an object with an endAngle
  // property to the `arc` function, and it will return the corresponding string.
  const arcGenerator = arc()
    .innerRadius(width / 4)
    .outerRadius(width / 2)
    .startAngle(0);

  useEffect(() => {
    // Get the SVG container, and apply a transform such that the origin is the
    // center of the canvas. This way, we don’t need to position arcs individually.
    const svg = select(svgRef.current);
    const g = svg
      .append('g')
      .attr('class', 'group')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    // Add the background arc, from 0 to 100% (tau).
    g.append('path')
      .datum({ endAngle: tau })
      .style('fill', '#ddd')
      .attr('d', arcGenerator);

    // Add the foreground arc to full at start
    g.append('path')
      .datum({ endAngle: +rate * tau })
      .attr('class', 'arc-rate')
      .style('fill', '#3BB273')
      .attr('d', arcGenerator);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    const g = svg.select('.group');

    if (g) {
      g.select('.arc-rate')
        .transition()
        .duration(300)
        .attrTween('d', arcTween(arcGenerator, +rate * tau))
        .on('end', function() {
          if (+rate === 1) {
            select(this).style('fill', '#3BB273');
          }

          if (+rate < 1 && +rate >= 0.75) {
            select(this).style('fill', '#A8C256');
          }

          if (+rate < 0.75 && +rate >= 0.5) {
            select(this).style('fill', '#FFD400');
          }

          if (+rate < 0.5 && +rate >= 0.25) {
            select(this).style('fill', '#DB4C40');
          }

          if (+rate < 0.25 && +rate >= 0) {
            select(this).style('fill', '#EF233C');
          }
        });
    }
  }, [rate]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default TrustIndicator;
