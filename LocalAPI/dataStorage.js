const axios = require('axios')
const qs = require('qs')
axios.defaults.withCredentials = true;
const url = process.env.NODE_ENV === 'production' ? 'http://www.demo.jzbl.com/' : 'http://127.0.0.1:8889/';
const LocalAPI = axios.create();
// POST 传参序列化
LocalAPI.interceptors.request.use(
    config => {
      config.baseURL = url
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
// 返回状态判断
LocalAPI.interceptors.response.use(
    res => {
      // 服务器端
      if (res.data.Code === 200) {
        return res.data.Data
      } else if (res.data.Code === 500) {
        return {statusCode: 500, message: 'You need back to login again'}
      }
    },
    error => {
      return Promise.reject(error)
    }
  )
export default {
    post (url, data) {
      return LocalAPI({
        method: 'post',
        url,
        data: data
      })
    }
}