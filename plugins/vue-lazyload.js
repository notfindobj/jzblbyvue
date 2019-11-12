import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://iph.href.lu/230x230?text=%E5%BB%BA%E7%AD%91%E9%83%A8%E8%90%BD&fg=ff3c00&bg=f0f0f0',
    loading: 'https://img.588ku.com/gif/19/07/09/9c8c589ba3f2db4cb86f06c1c22c24ba.gif!qk620',
    attempt: 1
  })