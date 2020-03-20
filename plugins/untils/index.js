import Vue from 'vue'
import moment from 'moment'
// import * as Verify from './Verify'
import * as Filter from './Filter'
const plugins={
    install (Vue, options) {
        // Vue.prototype.$verify = Verify;
        Vue.prototype.$moment = moment;
        // Vue.prototype.$_ = _;
        Object.keys(Filter).forEach(key => {
            Vue.filter(key, Filter[key])
        })
        Vue.prototype.$defaultHead = require('../../assets/images/default.jpeg');
    }
}
import Small_Cards from '../../components/home/Small_Cards'
import Big_Cards from '../../components/home/Big_Cards'
import videoModel from '../../components/videoModel'
import videos from '../../components/videos'
import emotHtml from '../../components/emotHtml'
import loading from '../../components/loading'
const omponents = {
  install: function (Vue) {
    Vue.component('Small-Cards', Small_Cards)
    Vue.component('Big-Cards', Big_Cards),
    Vue.component('videoModel', videoModel)
    Vue.component('videos', videos)
    Vue.component('emotHtml', emotHtml)
    Vue.component('loading', loading)
  }
}
const publicComponents = {...omponents}

export {plugins, publicComponents}