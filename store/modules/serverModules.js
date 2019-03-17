import { serverRequest } from '../actions/serverRequest'
import { serverGetter } from '../getters/serverGetter'
import { serverMutation } from '../mutations/serverMutation'
export const requests = {
    actions: serverRequest,
    getters: serverGetter,
    mutations: serverMutation
}