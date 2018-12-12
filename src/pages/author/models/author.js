import * as usersService from '../services/author';

export default {
  namespace: 'author',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data } = yield call(usersService.fetch, { page });
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
