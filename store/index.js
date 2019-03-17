import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {requests, overas} from './modules/index'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      requests,
      overas
    },
    plugins: [createLogger()],
    strict: process.env.NODE_ENV !== 'production'
  })
}
// if (module.hot) {
//   module.hot.accept(['./mutations/*.js'], () => {
//     const newMutations = require('./mutations/*.js').default

//     store.hotUpdate({
//       mutations: newMutations
//     })
//   })
// }

export default createStore