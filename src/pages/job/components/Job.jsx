import { connect } from "dva";
import React from "react";
import WordCloud from "../../../components/WordCloud";
import immutable from "immutable";
import isNull from "../../../utils/objIsNull";

@connect(state => ({
  cloud: state.job.cloud,
  detail: state.job.detail
}))
class Job extends React.Component {
  //trans to Immutable CloudWord Data
  toCouldData = data => {
    const temp =
      !isNull(data) && data.map(d => ({ text: d.word, size: d.count }));
    return immutable.fromJS(temp);
  };

  render = () => {
    const { detail, cloud } = this.props;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>编程语言需求量</h1>
        <WordCloud
          immuData={this.toCouldData(cloud)}
          range={[50, 200, 300]}
        />
        <h1 style={{ textAlign: "center" }}>前端技术栈权重</h1>
        <WordCloud
          immuData={this.toCouldData(detail)}
          range={[50, 200, 300]}
        />
      </>
    );
  };
}
export default Job;
