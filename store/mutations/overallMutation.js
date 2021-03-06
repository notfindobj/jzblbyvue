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
    state.showSign = true
  },
  setsearchData(state, param) {
    state.searchNav = param
  },
  setCusData(state, param = {}) {
    state.dingzhi = param
  },
  setComment(state, param = {}) {
    state.pinglun = param
  },
  setInviter(state, param = {}) {
    state.inviter = param
  },
  setSystem(state, param = {}) {
    state.system = param
  },
  // 存储数据
  setSessionStorage (state, row) {
    state.sessionStorage[row.key] = row.value;
  }
}
