import * as jobService from "../services/job";

export default {
  namespace: "job",
  state: {
    cloud: {},
    detail: {},
    allTime: [],
    wordCloud: {}
  },
  reducers: {
    save(
      state,
      {
        payload
      }
    ) {
      return { ...state, ...payload };
    },
    mergeWordCloud(state, { payload }) {
      const wordCloud = { ...state.wordCloud, ...payload };
      return { ...state, wordCloud }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data: cloud } = yield call(jobService.fetch, "cloud");
      const { data: detail } = yield call(jobService.fetch, "detail");
      yield put({ type: "save", payload: { cloud, detail } });
    },
    *fetchAllTime(action, { call, put }) {
      const { data } = yield call(jobService.fetchAllTime);
      yield put({ type: 'save', payload: { allTime: data } })
    },
    *fetchWordCloudWithTime({ payload }, { call, put }) {
      const { data } = yield call(jobService.fetchWordCloudWithTime, payload)
      const { createTime, classify } = data;
      yield put({ type: 'mergeWordCloud', payload: { [createTime]: classify } })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        switch (pathname) {
          case "/job/":
            dispatch({ type: "fetch" });
            break;
          case '/job/new/':
            dispatch({ type: 'fetchAllTime' });
            break;
          default:
            break;
        }

      });
    }
  }
};
