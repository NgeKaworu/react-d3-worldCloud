import * as aboutService from "../services/about";

export default {
  namespace: "about",
  state: {
    author: "",
    description: ""
  },
  reducers: {
    save(
      state,
      {
        payload: { data: about }
      }
    ) {
      return { ...state, ...about };
    }
  },
  effects: {
    *fetch(
      {
        payload: { author }
      },
      { call, put }
    ) {
      const { data } = yield call(aboutService.fetch, { author });
      yield put({ type: "save", payload: { data } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const path = /(\/about\/*)(.*)$/g;
        const match = path.exec(pathname);
        if (match) {
          if (match[2]) {
            dispatch({ type: "fetch", payload: { author: match[2] } });
          }
        }
      });
    }
  }
};
