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
    const max = d3.max(data, d => d.size);
    // 比例总值
    const dataTotalSize = data && data.reduce((a, d) => a + d.size, 0);
    //占比比例尺
    const ProportionScale = d3
      .scaleLinear()
      .domain([0, dataTotalSize])
      .range([0, 100]);

    const fontWeightScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, 1000]);

    //比例尺
    const linear = d3
      .scaleLinear()
      .domain([0, max])
      .range(range);

    // 颜色比例尺 固定色
    const color = d3.scaleSequential(d3.interpolateBlues);

    // 手动设置渐变色
    const a = d3.rgb(0, 255, 255);
    const b = d3.rgb(0, 0, 255);
    // 渐变色范围
    const compute = d3.interpolate(a, b);
    //渐变色比例尺
    const colorScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([1, 0]);
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
        .style("font-weight", d => d.weight)
        .style("font-family", "Impact, YaHei")
        .style("fill", (d, i) => color(colorScale(i)))
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
          const findDataByText = data.find(v => v.text === d.text);
          const proportion = ProportionScale(findDataByText.size);

          tooltip
            .html(
              `
            <h2>${d.text}</h2>
            第 ${Number(i + 1)}
            比重 ${proportion.toFixed(2)} %
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
      .words(data)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact, YaHei")
      .fontSize(d => linear(d.size))
      .fontWeight(d => fontWeightScale(d.size))
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
