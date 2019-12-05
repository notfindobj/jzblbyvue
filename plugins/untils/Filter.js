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
//人性化时间处理 传入时间戳
Vue.filter('timestamp', function (timestamp) {
  if (!timestamp) {
    return
  }
  let mistiming = Math.round((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (mistiming < 1 ) {
    return '刚刚';
  }
  let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (let i = 0; arrn.length; i++) {
    let inm = Math.floor(mistiming / arrn[i]);
      if (inm != 0) {
          return inm + arrr[i] + '前';
      }
  }
})