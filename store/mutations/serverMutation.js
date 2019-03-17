export const serverMutation = {
    'FETCH_LIST_REQUEST' (state, param) {
        state.isFetching = param.id
        return state.isFetching
    },
}