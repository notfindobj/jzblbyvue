import { overallActions } from '../actions/overallActions'
import { overallGetters } from '../getters/overallGetters'
import { overallMutation } from '../mutations/overallMutation'
export const overas = {
    state: {
        showSign: false
    },
    actions: overallActions,
    getters: overallGetters,
    mutations: overallMutation
}