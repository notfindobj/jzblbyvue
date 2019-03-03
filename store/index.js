import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const state = () => ({
  SignIn: false,
  token:null,
})
export const getters = {
  getToken(state){
    return state.token
  }
}
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  SETSIGNIN (state, isSignIn) {
    state.SignIn = isSignIn
  }
}
export const actions = {
    //TODO ajax here
}