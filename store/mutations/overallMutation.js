export const overallMutation = {
    'SETLOGO' (state, param) {
        state.showSign = param
    },
    'SETLOGGEDIN' (state, param) {
        state.isItLoggedIn = param
    },
    setAuth(state, auth) {
        console.log('刷新', auth)
        state.auth = auth
    }
}