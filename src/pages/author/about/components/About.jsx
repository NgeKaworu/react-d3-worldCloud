import { connect } from "dva";
import React from "react";

import router from "umi/router";
import { Select } from "antd";

import isNull from "../../../../utils/objIsNull";
import getIn from "../../../../utils/getIn";

const Option = Select.Option;
@connect(state => ({
  author: getIn(state, ["about", "author"]),
  description: getIn(state, ["about", "description"]),
  list: getIn(state, ["author", "list"])
}))
class About extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "author/fetch" });
  }
  render = () => {
    const {
      author = "please select someone",
      description = "please select someone",
      list
    } = this.props;
    return (
      <div style={{ padding: "2vw" }}>
        <h1>{author}</h1>
        <Select
          value={author}
          style={{ width: "240px" }}
          onChange={value => {
            router.push({ pathname: `/author/about/${value}` });
          }}
        >
          {!isNull(list) &&
            list.map(i => <Option key={i.author}>{i.author}</Option>)}
        </Select>

        <div>{description}</div>
      </div>
    );
  };
}
export default About;
