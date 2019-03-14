import { serverRequest } from '../actions/serverRequest'
import { serverGetter } from '../getters/serverGetter'
import { serverMutation } from '../mutations/serverMutation'
export const list = {
    state: {
        isFetching: false,
        data: []
    },
    actions: serverRequest,
    getters: serverGetter,
    mutations: serverMutation
}