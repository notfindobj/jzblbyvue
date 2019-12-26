export default {
  // 自定义的请求头
  headers: {
    post: {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
    },
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 超时设置
  timeout: 150000,
  processData: false, //默认true，设置为 false，不需要进行序列化处理
  cache: false, //设置为false将不会从浏览器缓存中加载请求信息
  async: false, //发送同步请求
  contentType: false, //避免服务器不能正常解析文件---------具体的可以查下这些参数的含义
  dataType: 'json',
  // withCredentials: true,
  // crossDomain: true,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
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