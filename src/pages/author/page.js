import { connect } from "dva";
import React from "react";
import * as d3 from "d3";
import cloud from "d3.layout.cloud-browserify";

@connect(state => ({
  author: state.author.list
}))
class Author extends React.Component {
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart = () => {
    const { author } = this.props;
    console.log(author)
    const min = d3.min(author, d => d.count);
    const max = d3.max(author, d => d.count);
    //比例尺
    const linear = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, 100, 200, 400, 500, 600]);
    // 颜色比例尺
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // 节点
    const node = this.node;
    // 渲染词云
    var layout = cloud()
      .size([600, 600])
      .words(author.map(d => ({ text: d.author, size: linear(d.count) })))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact")
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select(node)
        .attr("width", linear(layout.size()[0]))
        .attr("height", linear(layout.size()[1]))
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
          console.log('click', d3.event.target);
        });
    }
  };

  render() {
    console.log(this.props.author);
    return <svg ref={node => (this.node = node)} />;
  }
}

export default Author;
