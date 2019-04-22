import axios from 'axios'
import { Message } from 'iview'
import qs from 'qs'
import config from './config'
import createStore from '../store'
const $store = createStore();

if (process.server) {
  console.log('>>>>>>>>>>>>>', 2)
}
if (process.client) {
  // console.log($store.state)
}
// 判断是路由跳转还是 axios 请求
// if (process.server) {
  config.baseURL = `http://www.api.jzbl.com/api/`
// }
const service = axios.create(config);
// POST 传参序列化
service.interceptors.request.use(
  config => {
    config.headers.Authorization = "Bearer ECCA04352B7C92D436C699708A14B7FBB94A7D49A5701CD6874E330649F77BA20D747BB4EDC1C187"
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    // 服务器端
    if (process.server) {
      if (res.data.Code === 200) {
        return res.data.Data
      } else if (res.data.Code === 500) {
        return {statusCode: 500, message: 'You need back to login again'}
      }
    }
    // 客户端
    if (process.client) {
      if (res.data.Code === 200) {
        return res.data.Data
      } else {
        Message.warning(res.data.Msg);
        return res.data.Data
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    console.log('post request url', url)
    return service({
      method: 'post',
      url,
      data: data
    })
  },
  get (url, data) {
    console.log('get request url', url)
    return service({
      method: 'get',
      url,
      params: data
    })
  },
  delete (url, data) {
    console.log('delete request url', url)
    return service({
      methods: 'delete',
      url,
      params: data
    })
  }
}