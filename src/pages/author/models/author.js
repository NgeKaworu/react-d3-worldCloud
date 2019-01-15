import * as authorService from '../services/author';

export default {
  namespace: 'author',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list: list };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(authorService.fetch);
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
