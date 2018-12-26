import { connect } from "dva";
import React from "react";

import router from "umi/router";

import { Select } from "antd";

import isNull from '../../../utils/objIsNull';
import getIn from '../../../utils/getIn';

const Option = Select.Option;

@connect(state => ({
  about: getIn(state, ["about", "about"]),
  list: getIn(state, ["author", "list"])
}))
class About extends React.Component {
  render = () => {
    const { author, description } = this.props.about;
    const { list } = this.props;
    return (
      <div style={{ padding: '2vw'}}>
        <h1>{author}</h1>
        <Select
          value={author}
          style={{ width: '240px' }}
          onChange={value => {
            router.push({ pathname: `/about`, query: { author: value } })
          }}
        >
          {!isNull(list) && list.map(i => (
            <Option key={i.author}>{i.author}</Option>
          ))}
        </Select>

        <div>{description}</div>
      </div>
    );
  };
}
export default About;
