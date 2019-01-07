import React from "react";
import immutable from "immutable";

import * as d3 from "d3";
import cloud from "d3.layout.cloud-browserify";

import { Row, Col } from "antd";

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

    // 颜色比例尺 固定色
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 手动设置渐变色
    const a = d3.rgb(0, 255, 255);
    const b = d3.rgb(0, 0, 255);
    // 渐变色范围
    const compute = d3.interpolate(a, b);
    //渐变色比例尺
    const colorLinear = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 1]);
    const color2 = d3.scaleSequential(compute);

    const draw = words => {
      d3.select(node)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + layout.size()[0] + " " + layout.size()[1])
        .style("width", "100%")
        .style("height", "auto")
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
        .style("fill", (d, i) => {
          console.log(colorLinear(i), color2(colorLinear(i)));
          return color2(colorLinear(i));
        })
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
          tooltip
            .html(
              `
            <h2>${d.text}</h2>
            占比第 ${Number(i + 1)}
            `
            )
            .style("left", d3.event.clientX + 16 + "px")
            .style("top", d3.event.clientY + 16 + "px")
            .style("opacity", 0.8);
        })
        .on("mousemove", d => {
          tooltip
            .style("left", d3.event.clientX + 16 + "px")
            .style("top", d3.event.clientY + 16 + "px");
        })
        .on("mouseout", d => {
          tooltip.style("opacity", 0);
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
      position: "fixed",
      width: "120px",
      height: "auto",
      fontFamily: "yaHei",
      fontSize: "14px",
      textAlign: "center",
      backgroundColor: "#eee",
      borderRadius: "3px",
      opacity: 0
    };
    return (
      <Row type="flex" justify="center">
        <Col md={{ span: 16 }}>
          <div style={tooltip} ref={tooltip => (this.tooltip = tooltip)} />
          <div ref={node => (this.node = node)} />
        </Col>
      </Row>
    );
  }
}

export default WordCloud;
