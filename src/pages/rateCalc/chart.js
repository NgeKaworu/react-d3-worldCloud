import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

var salesData = [
  {
    date: '2017-06-30T18:30:00.000Z',
    Ram: 359,
    Laptops: 0,
    Processor: 23,
  },
  {
    date: '2017-07-31T18:30:00.000Z',
    Ram: 828,
    Laptops: 1,
    Processor: 30,
  },
  {
    date: '2017-08-31T18:30:00.000Z',
    Ram: 788,
    Laptops: 81,
    Processor: 70,
  },
  {
    date: '2017-09-30T18:30:00.000Z',
    Ram: 503,
    Laptops: 132,
    Processor: 128,
  },
  {
    date: '2017-10-31T18:30:00.000Z',
    Ram: 844,
    Laptops: 287,
    Processor: 106,
  },
  {
    date: '2017-11-30T18:30:00.000Z',
    Ram: 1725,
    Laptops: 114,
    Processor: 131,
  },
  {
    date: '2017-12-31T18:30:00.000Z',
    Ram: 2761,
    Laptops: 83,
    Processor: 324,
  },
  {
    date: '2018-01-31T18:30:00.000Z',
    Ram: 2120,
    Laptops: 42,
    Processor: 361,
  },
  {
    date: '2018-02-28T18:30:00.000Z',
    Ram: 1205,
    Laptops: 32,
    Processor: 172,
  },
  {
    date: '2018-03-31T18:30:00.000Z',
    Ram: 477,
    Laptops: 48,
    Processor: 57,
  },
  {
    date: '2018-04-30T18:30:00.000Z',
    Ram: 508,
    Laptops: 49,
    Processor: 37,
  },
];

const ChartDemo = () => {
  const chartRef = useRef();

  useEffect(() => {
    const { current: chartDOM } = chartRef;
    renderChar(chartDOM);
  });

  const renderChar = chartDOM => {
    if (!chartDOM) return;
    var group = ['Laptops', 'Processor', 'Ram'];
    var parseDate = d3.timeFormat('%b-%Y');

    salesData.forEach(function(d) {
      d = type(d);
    });
    var layers = d3
      .stack()
      .keys(group)
      .offset(d3.stackOffsetDiverging)(salesData);

    var svg = d3.select(chartDOM),
      margin = {
        top: 20,
        right: 30,
        bottom: 60,
        left: 60,
      },
      width = +svg.attr('width'),
      height = +svg.attr('height');

    var x = d3
      .scaleBand()
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    x.domain(
      salesData.map(function(d) {
        return d.date;
      })
    );

    var y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

    y.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

    function stackMin(layers) {
      return d3.min(layers, function(d) {
        return d[0];
      });
    }

    function stackMax(layers) {
      return d3.max(layers, function(d) {
        return d[1];
      });
    }

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var maing = svg
      .append('g')
      .selectAll('g')
      .data(layers);

    var g = maing
      .enter()
      .append('g')
      .attr('fill', function(d) {
        return z(d.key);
      });

    var rect = g
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
        var data = {};
        data['key'] = d.key;
        data['value'] = d.data[d.key];
        var total = 0;
        group.map(function(d1) {
          total = total + d.data[d1];
        });
        data['total'] = total;
        return JSON.stringify(data);
      })
      .attr('width', x.bandwidth)
      .attr('x', function(d) {
        return x(d.data.date);
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
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.bottom * 0.5)
      .attr('dx', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Month');

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
      .text('Sales');

    function type(d) {
      d.date = parseDate(new Date(d.date));
      group.forEach(function(c) {
        d[c] = +d[c];
      });
      return d;
    }
  };

  return <svg ref={chartRef} width="800" height="500" />;
};

export default ChartDemo;
