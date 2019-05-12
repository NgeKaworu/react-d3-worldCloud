import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const StackChart = ({ dataset }) => {
  const chartRef = useRef();

  useEffect(
    () => {
      const { current: chartDOM } = chartRef;
      renderChar(chartDOM);
    },
    [chartRef, dataset]
  );

  const renderChar = chartDOM => {
    if (!chartDOM) return;
    d3.select(chartDOM)
      .select('svg')
      .remove();

    const group = Object.keys(dataset[0]);

    const layers = d3
      .stack()
      .keys(group)
      .offset(d3.stackOffsetDiverging)(dataset);

    const margin = {
        top: 20,
        right: 30,
        bottom: 60,
        left: 60,
      },
      width = 800,
      height = 500,
      svg = d3
        .select(chartDOM)
        .append('svg') // 缩放
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .style('width', '100%')
        .style('height', 'auto');

    const x = d3
      .scaleBand()
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    x.domain(
      dataset.map(function(d, index) {
        return index;
      })
    );

    const y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

    y.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

    function stackMin(layers) {
      return d3.min(layers, function(d, ...arg) {
        return d[0];
      });
    }

    function stackMax(layers) {
      return d3.max(layers, function(d) {
        return d[1];
      });
    }

    const z = d3.scaleOrdinal(d3.schemeCategory10);

    const maing = svg
      .append('g')
      .selectAll('g')
      .data(layers);

    const g = maing
      .enter()
      .append('g')
      .attr('fill', function(d) {
        return z(d.key);
      });

    const rect = g
      .selectAll('rect')
      .data(function(d) {
        d.forEach(function(d1) {
          d1.key = d.key;
          return d1;
        });
        return d;
      })
      .enter()
      .append('rect')
      .attr('data', function(d) {
        const data = {};
        data['key'] = d.key;
        data['value'] = d.data[d.key];
        let total = 0;
        group.map(function(d1) {
          total = total + d.data[d1];
        });
        data['total'] = total;
        return JSON.stringify(data);
      })
      .attr('width', x.bandwidth)
      .attr('x', function(d, index) {
        return x(index);
      })
      .attr('y', function(d) {
        return y(d[1]);
      })
      .attr('height', function(d) {
        return y(d[0]) - y(d[1]);
      });

    svg
      .append('g')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .style('writing-mode', 'tb-rl')
      .attr('textLength', 90)
      .call(d3.axisBottom(x))
      .append('text')
      .style('writing-mode', 'none')
      .attr('x', width / 2)
      .attr('y', margin.bottom * 0.5)
      .attr('dx', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('期数');

    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - height / 2)
      .attr('y', 15 - margin.left)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .text('每期');
  };

  return <div ref={chartRef} />;
};

export default StackChart;
