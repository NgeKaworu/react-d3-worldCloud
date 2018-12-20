import * as jobService from "../services/job";

export default {
  namespace: "job",
  state: {
    cloud: {},
    detail: {}
  },
  reducers: {
    save(
      state,
      {
        payload: { cloud, detail }
      }
    ) {
      return { ...state, cloud: JSON.parse(cloud), detail: JSON.parse(detail) };
    }
  },
  effects: {
    *fetch(
      { payload },
      { call, put }
    ) {
      const { data: cloud } = yield call(jobService.fetch, "getCloud");
      const { data: detail } = yield call(jobService.fetch, "getDetail");
      yield put({ type: "save", payload: { cloud, detail } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/job") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
