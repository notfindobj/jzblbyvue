import { Message } from 'iview'
export const overallGetters = {
    // 判断是否登录
    isLogin (state) {
        if (!state.auth) {
            Message.warning('请登陆后操作！');
            return false
        } else {
          return true
        }
    }
}