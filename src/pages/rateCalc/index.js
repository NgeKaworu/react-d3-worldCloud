// /**
//  * I:   总利息
//  * i:   每期利息
//  * pv:  现值
//  * c:   每期本金
//  * fv:  终植
//  * pfv: 每期的终值
//  * periods： 周期
//  */

import React, { useReducer } from 'react';
import { Input, InputNumber, Select } from 'antd';
import Chart from './chart';
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
    rate: rate * slope,
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
  // c(n) = i(n) + c
  const fv = pv + I;
  return { I, fv, c };
}

function calcEqualityInterest(pv, periods, realRate) {
  const pfv = (pv * realRate * (1 + realRate) ** periods) / ((1 + realRate) ** periods - 1);
  const fv = pfv * periods;
  const I = fv - pv;
  return { I, fv, pfv };
}

function calcCompound(pv, periods, realRate) {
  const fv = pv * (1 + realRate) ** periods;
  const I = fv - pv;
  return { I, fv };
}

function calc(state) {
  const { rate, ratePeriods, pv, periods, periodsType } = state;
  const realRate = (rate * (periodsType / ratePeriods)) / 100;

  const { I: cpd_I, fv: cpd_fv } = calcCompound(pv, periods, realRate);

  const { I: ec_I, fv: ec_fv, c: ec_c } = calcEqualityCorpus(pv, periods, realRate);

  const { I: ei_I, fv: ei_fv, pfv: ei_pfv } = calcEqualityInterest(pv, periods, realRate);

  const periodsCalc = Array(periods)
    .fill(Object.create(null))
    .reduce(
      (accumulator, cur, index) => {
        const { compound, ec, ei } = accumulator;
        /* compound */

        const cpd_c = pv * (1 + realRate) ** index;
        const cpd_i = cpd_c * realRate;

        compound['periods'].push({
          c: cpd_c,
          i: cpd_i,
        });
        /* Compound */

        /* ec */

        const ec_i = (pv - (pv / periods) * index) * realRate;
        ec['periods'].push({
          c: ec_c,
          i: ec_i,
        });

        /* ec */

        /* ei */

        const ei_c = (ei_pfv - pv * realRate) * (1 + realRate) ** index;
        const ei_i = ei_pfv - ei_c;

        ei['periods'].push({
          c: ei_c,
          i: ei_i,
        });
        /* ei */

        return accumulator;
      },
      {
        compound: { periods: [] },
        ec: { periods: [] },
        ei: { periods: [] },
      }
    );

  const { compound, ec, ei } = periodsCalc;

  const intactCompound = { ...compound, cpd_I, cpd_fv };
  const intactEc = { ...ec, ec_I, ec_fv, ec_c };
  const intactEi = { ...ei, ei_I, ei_fv, ei_pfv };
  return {
    rate,
    ratePeriods,
    pv,
    intactCompound,
    intactEc,
    intactEi,
    periods,
    periodsType,
  };
}

function RateCale() {
  const [
    {
      pv,
      rate,
      ratePeriods,
      periods,
      periodsType,
      intactCompound = {},
      intactEc = {},
      intactEi = {},
    },
    dispatch,
  ] = useReducer(reducer, initState);
  const { cpd_fv } = intactCompound;
  const { ec_fv } = intactEc;
  const { ei_fv } = intactEi;
  console.log(intactCompound, intactEc, intactEi);
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
      <div>复利:{cpd_fv}</div>
      <div>等额本金{ec_fv}</div>
      <div>等额本息{ei_fv}</div>
      {intactCompound.periods && intactCompound.periods.length > 0 && (
        <Chart dataset={intactCompound.periods} />
      )}
      {intactEc.periods && intactEc.periods.length > 0 && <Chart dataset={intactEc.periods} />}
      {intactEi.periods && intactEi.periods.length > 0 && <Chart dataset={intactEi.periods} />}
    </div>
  );
}

export default RateCale;
