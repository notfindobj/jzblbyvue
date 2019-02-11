import Vue from 'vue'
import moment from 'moment'
import * as Verify from './Verify'
import * as Filter from './Filter'
const plugins={
    install (Vue, options) {
        Vue.prototype.$verify = Verify;
        Vue.prototype.$moment = moment;
        // Vue.prototype.$_ = _;
        Object.keys(Filter).forEach(key => {
            Vue.filter(key, Filter[key])
        })
    }
}
import Small_Cards from '../../components/Small_Cards'
import Big_Cards from '../../components/Big_Cards'
const omponents = {
  install: function (Vue) {
    Vue.component('Small-Cards', Small_Cards)
    Vue.component('Big-Cards', Big_Cards)
  }
}
console.log(omponents)
const publicComponents = {...omponents}

export {plugins, publicComponents}