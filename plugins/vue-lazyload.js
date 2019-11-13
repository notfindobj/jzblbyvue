import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../assets/images/vue-load.png',
    loading: '../assets/images/vue-load.png',
    attempt: 1
  })