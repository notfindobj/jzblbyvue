import { Message } from 'iview'
export const overallGetters = {
    // 判断是否登录
    isLogin (state) {
        if (!state.auth) {
            // Message.warning('请登陆后操作！');
            return false
        } else {
          return true
        }
    },
    getToken(state) {
        return state.auth
    },
    getSessionStorage (state) {
        return state.sessionStorage
    },
    getCusData (state) {
        return state.dingzhi
    },
    getComment (state) {
        return state.pinglun
    },
    getInviter (state) {
        return state.inviter
    },
    getSystem (state) {
        return state.system
    }
}