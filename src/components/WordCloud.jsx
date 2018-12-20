import React from "react";
import immutable from "immutable";

import * as d3 from "d3";
import cloud from "d3.layout.cloud-browserify";

class WordCloud extends React.Component {
  //用immutable防止重复刷新
  shouldComponentUpdate = (np, ns) =>
    !immutable.is(np.immuData, this.props.immuData);

  componentDidMount = () => {
    this.renderChart();
  };

  componentDidUpdate = () => {
    this.renderChart();
  };

  renderChart = () => {
    // 节点
    const node = this.node;
    const tooltip = d3.select(this.tooltip);
    // 清除旧数据
    d3.select(node)
      .select("svg")
      .remove();
    const { immuData, cb, range = [25, 75, 280] } = this.props;
    if (!immuData) return;
    const data = immuData.toJS();
    const min = d3.min(data, d => d.size);
    const max = d3.max(data, d => d.size);
    //比例尺
    const linear = d3
      .scaleLinear()
      .domain([min, max])
      .range(range);
    // 颜色比例尺
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const draw = words => {
      d3.select(node)
        .append("svg")
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
        .style("font-family", "Impact, YaHei")
        .style("fill", (d, i) => color(i))
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
        )
        .text(d => d.text)
        // 添加事件
        .on("click", (...arg) => {
          cb && cb(d3.event, ...arg);
        })
        .on("mouseover", (d, i) => {
          tooltip.html(
            `
            <h2>${d.text}</h2>
            占比第 ${Number(i + 1)}
            `
          )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 12) + "px")
            .style("opacity", 1.0);
        })
        .on("mousemove", d => {
          tooltip
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 12) + "px");
        })
        .on("mouseout", d => {
          tooltip
            .style("opacity", 0);
        });
    };
    // 渲染词云
    const layout = cloud()
      .size([800, 600])
      .words(data.map(d => ({ text: d.text, size: linear(d.size) })))
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact, YaHei")
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();
  };

  render() {
    const tooltip = {
      position: "absolute",
      width: "120px",
      height: "auto",
      fontFamily: "simsun",
      fontSize: "14px",
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: "1px",
      backgroundColor: "white",
      borderRadius: "5px",
      opacity: 0
    };
    return (
      <>
        <div
          style={tooltip}
          ref={tooltip => {
            this.tooltip = tooltip;
          }}
        >
          123
        </div>
        <div ref={node => (this.node = node)} />
      </>
    );
  }
}

export default WordCloud;
