import Vue from 'vue'
import {plugins, publicComponents} from './untils/index'
import {websockets} from './websocket.js'
Vue.use(plugins)
Vue.use(publicComponents)
Vue.use(websockets)