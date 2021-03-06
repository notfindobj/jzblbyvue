const {configUrl} = require('../LocalEnv');
export default {
  baseURL: configUrl.baseUrl,
  // 自定义的请求头
  headers: {
    post: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
    },
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 超时设置
  timeout: 150000,
  // 跨域是否带Token
  // withCredentials: true,
  // crossDomain: true,
  // // // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  // responseType: 'json',
  // // XSRF 设置
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
  // // 用于node.js
  // httpAgent: new http.Agent({
  //   keepAlive: true
  // }),
  // httpsAgent: new https.Agent({
  //   keepAlive: true
  // })
}