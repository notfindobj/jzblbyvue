export const overallMutation = {
  'SETLOGO'(state, param) {
    state.showSign = param
  },
  'SETLOGGEDIN'(state, param) {
    state.isItLoggedIn = param
  },
  setAuth(state, auth) {
    state.auth = auth;
  },
  setqueryBase(state, param) {
    state.queryBaseData = param
  },
  setWxRegister(state, param) {
    state.wxRegister = param
  },
  // 存储数据
  setSessionStorage (state, row) {
    state.sessionStorage[row.key] = row.value;
  }
}
