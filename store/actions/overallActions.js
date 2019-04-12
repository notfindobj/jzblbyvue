const cookieparser = process.server ? require('cookieparser') : undefined
export const overallActions ={
    // 打开登录框
    SETUP ({ commit, state }, params) {
        commit("SETLOGO", params)
    },
    // 切换登录注册状态
    LOGGEDIN ({ commit, state }, params) {
        commit("SETLOGGEDIN", params)
    },
    // 设置cookie
    LOGININ ({ commit, state }, params) {
        commit("setAuth", params)
    },
    // 设置资料库导航数据
    BASEDATA ({ commit, state }, params) {
        commit("setqueryBase", params)
    },
    nuxtServerInit({ commit, state }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.adminToken.split('j:')[1])
            } catch (err) {
                // 找不到有效的Cookie`
            }
        }
        commit('setAuth', auth);
    }
}