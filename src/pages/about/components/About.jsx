import { connect } from "dva";
import React from "react";

import router from "umi/router";

import { Select } from "antd";
const Option = Select.Option;

@connect(state => ({
  about: state.about.about,
  list: state.author.list
}))
class About extends React.Component {
  render = () => {
    const { author, description } = this.props.about;
    const { list } = this.props;
    return (
      <div>
        <h1>{author}</h1>
        <Select
          value={author}
          style={{ width: '240px' }}
          onChange={value => {
            router.push({ pathname: `/about`, query: { author: value } })
          }}
        >
          {list && list.map(i => (
            <Option key={i.author}>{i.author}</Option>
          ))}
        </Select>

        <div>{description}</div>
      </div>
    );
  };
}
export default About;
