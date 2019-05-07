/**
 * I:   总利息
 * i:   每期利息
 * pv:  现值
 * c:   每期本金
 * fv:  终植
 * pfv: 每期的终值
 * periods： 周期
 */

import React, { useReducer } from 'react';
import { Input, InputNumber, Select } from 'antd';

const initState = {
  pv: 0,
  rate: 0,
  ratePeriods: 365, //1: "日", 30: "月"， 365："年"
  fv: 0,
  periods: 0,
  periodsType: 365, //计息周期, 1: "日", 30: "月"， 365："年"
  equalityCorpus: 0,
  equalityInterest: 0,
};

/**
 * 利率与利率类型动态转换
 *
 */
function changeRatePeriods(state, previewRatePeriods) {
  const { rate, ratePeriods } = state;
  // 求斜率
  const slope = previewRatePeriods / ratePeriods;
  return {
    ...state,
    rate: Math.round(rate * slope),
    ratePeriods: previewRatePeriods,
  };
}

/**
 *  周期与利率类型动态转化
 *
 */
function changePeriodsType(state, previewPeriodsType) {
  const { periods, periodsType } = state;
  // 求斜率
  const slope = previewPeriodsType / periodsType;
  return {
    ...state,
    periods: Math.round(periods / slope),
    periodsType: previewPeriodsType,
  };
}

function reducer(state, { type, payload: { pv, rate, ratePeriods, periods, periodsType } }) {
  let temp = { ...state };
  switch (type) {
    case 'setPv':
      temp = { ...temp, pv };
      break;
    case 'setRate':
      temp = { ...temp, rate };
      break;
    case 'setRatePeriods':
      temp = changeRatePeriods(state, ratePeriods);
      break;
    case 'setPeriods':
      temp = { ...temp, periods };
      break;
    case 'setPeriodsType':
      temp = changePeriodsType(state, periodsType);
      break;
    default:
      throw new Error();
  }
  return calc(temp);
}

function calcEqualityCorpus(pv, periods, realRate) {
  const I = (pv * realRate * (periods + 1)) / 2;
  const c = pv / periods;
  // pfv(n) = i(n) + c
  // fv = pv + I
  return I;
}

function calcEqualityInterest(pv, periods, realRate) {
  const pfv = (pv * realRate * (1 + realRate) ** periods) / ((1 + realRate) ** periods - 1);
  const fv = pfv * periods;
  const I = fv - pv;
  return I;
}

function calcFv(pv, periods, realRate) {
  const fv = pv * (1 + realRate) ** periods;
  return fv - pv;
}

function calc(state) {
  const { rate, ratePeriods, pv, periods, periodsType } = state;
  const realRate = (rate * (periodsType / ratePeriods)) / 100;

  const equalityCorpus = calcEqualityCorpus(pv, periods, realRate);
  const equalityInterest = calcEqualityInterest(pv, periods, realRate);
  const fv = calcFv(pv, periods, realRate);

  const periodsCalc = Array(periods)
    .fill(Object.create(null))
    .map((i, index) => ({
      equalityInterest: {
        i: (pv * realRate) ** index,
      },
      equalityCorpus: {
        i: (pv - (pv / periods) * index) * realRate,
      },
      fv: {},
    }));

  return {
    rate,
    ratePeriods,
    pv,
    fv,
    equalityCorpus,
    equalityInterest,
    periods,
    periodsType,
  };
}

function RateCale() {
  const [
    { pv, rate, ratePeriods, periods, periodsType, fv, equalityCorpus, equalityInterest },
    dispatch,
  ] = useReducer(reducer, initState);
  return (
    <div>
      <Input.Group compact>
        <InputNumber
          placeholder={'现值'}
          value={pv || ''}
          onChange={value =>
            dispatch({
              type: 'setPv',
              payload: { pv: value },
            })
          }
        />
        <Select
          defaultValue={ratePeriods}
          onChange={value =>
            dispatch({
              type: 'setRatePeriods',
              payload: { ratePeriods: value },
            })
          }
        >
          <Select.Option value={1}>日率</Select.Option>
          <Select.Option value={30.416666666666}>月率</Select.Option>
          <Select.Option value={365}>年率</Select.Option>
        </Select>
        <InputNumber
          formatter={value => value && `${value}%`}
          parser={value => value && value.replace('%', '')}
          placeholder={'利率'}
          value={rate || ''}
          onChange={value =>
            dispatch({
              type: 'setRate',
              payload: { rate: value },
            })
          }
        />

        <Select
          defaultValue={periodsType}
          onChange={value =>
            dispatch({
              type: 'setPeriodsType',
              payload: { periodsType: value },
            })
          }
        >
          <Select.Option value={1}>按日计息</Select.Option>
          <Select.Option value={30.416666666666}>按月计息</Select.Option>
          <Select.Option value={365}>按年计息</Select.Option>
        </Select>
        <InputNumber
          placeholder={'期数'}
          value={periods || ''}
          onChange={value =>
            dispatch({
              type: 'setPeriods',
              payload: { periods: value },
            })
          }
        />
      </Input.Group>
      <div>终值:{fv}</div>
      <div>等额本金{equalityCorpus}</div>
      <div>等额本息{equalityInterest}</div>
    </div>
  );
}

export default RateCale;
