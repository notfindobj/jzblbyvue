import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const state = () => ({
  token:null,
})
export const getters = {
  getToken(state){
    return state.token
  },
}
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
}
export const actions = {
    //TODO ajax here
}