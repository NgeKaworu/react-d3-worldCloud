import React, { useState } from 'react';
import compose from '@/utils/compose';
import { connect } from 'dva';
import { Select } from 'antd';
import styled from 'styled-components';
import immutable from 'immutable';
import WordCloud from '@/components/WordCloud';

const Wrap = styled.div`
  display: flex;
  padding: 2vw;
  flex-direction: column;
  h1 {
    text-align: center;
  }
`;

function FrontWordCloud({ dispatch, allTime, wordCloud }) {
  const [getCurrent, setCurrent] = useState();
  const data = (wordCloud[getCurrent] || []).map(({ word, count }) => ({
    text: word,
    size: count,
  }));
  const cloud = immutable.fromJS(data);

  return (
    <Wrap>
      <h1>佛山前端技术栈流行程度</h1>
      <Select
        placeholder="请选择时间"
        showSearch
        style={{ width: 255 }}
        onChange={value => {
          setCurrent(value);
          if (!wordCloud[value]) {
            dispatch({
              type: 'job/fetchWordCloudWithTime',
              payload: value,
            });
          }
        }}
      >
        {allTime.map(({ createTime }) => (
          <Select.Option key={createTime} value={createTime}>
            {createTime}
          </Select.Option>
        ))}
      </Select>
      {<WordCloud immuData={cloud} range={[50, 200, 300]} />}
    </Wrap>
  );
}

export default compose(
  connect(({ job: { allTime, wordCloud } }) => ({
    allTime,
    wordCloud,
  }))
)(FrontWordCloud);
