import React from "react";
import immutable from 'immutable';

import * as d3 from "d3";
import cloud from "d3.layout.cloud-browserify";


class WordCloud extends React.Component {
  //用immutable防止重复刷新
  shouldComponentUpdate = (np, ns) => !immutable.is(np.immuData, this.props.immuData)

  componentDidMount = () => {
    this.renderChart();
  }

  componentDidUpdate = () => {
    this.renderChart();
  }

  renderChart = () => {
    // 清除旧数据
    d3.selectAll('svg').remove()
    const { immuData } = this.props;
    if (!immuData) return
    const data = immuData.toJS();
    const min = d3.min(data, d => d.size);
    const max = d3.max(data, d => d.size);
    //比例尺
    const linear = d3
      .scaleLinear()
      .domain([min, max])
      .range([25, 75, 225]);
    // 颜色比例尺
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // 节点
    const node = this.node;
    // 渲染词云
    var layout = cloud()
      .size([800, 600])
      .words(data.map(d => ({ text: d.text, size: linear(d.size) })))
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact")
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select(node)
        .append('svg')
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => d.size + "px")
        .style("font-family", "Impact")
        .style("fill", (d, i) => color(i))
        .attr("text-anchor", "middle")
        .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
        .text(d => d.text)
        // 添加事件
        .on('click', () => {
          console.log('click', d3.event.target.firstChild.nodeValue);
        });

    }
  };

  render() {
    return <div ref={node => (this.node = node)} />;
  }
}

export default WordCloud;
