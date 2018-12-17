import * as aboutService from '../services/about';

export default {
  namespace: 'about',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return null
      return { ...state, list: JSON.parse(list) };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(aboutService.fetch);
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/author') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
