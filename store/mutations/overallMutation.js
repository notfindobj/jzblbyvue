export const overallMutation = {
    'SETLOGO' (state, param) {
        state.showSign = param
    },
    'SETLOGGEDIN' (state, param) {
        state.isItLoggedIn = param
    },
    setAuth(state, auth) {
        state.auth = auth;
        console.log(state)
    },
    setqueryBase (state, param) {
        state.queryBaseData = param
    }
}