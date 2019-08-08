import Vue from 'vue'
import moment from 'moment'
//  时间转换格式
Vue.filter('datefmt', function (input, fmtstring) {
  return moment(input).format(fmtstring)
})
//  截取|
Vue.filter('interceptText', function (value) {
  let reg = RegExp(/|/);
  if(reg.test(value)){
    return value.split('|')[0]
  } else {
    return value
  }
})
//获取整数部分
Vue.filter('NumFormat', function (value) {
  if (!value) return '0';
  return Number(value).toFixed(0);
})
