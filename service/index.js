import axios from 'axios'
import { Message } from 'iview'
import qs from 'qs'
import config from './config'
import createStore from '../store'
const $store = createStore();
// 判断是路由跳转还是 axios 请求
// if (process.server) {
  config.baseURL = `http://www.api.jzbl.com/api/`
// }
const service = axios.create(config);
service.defaults.withCredentials = true;
// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.file && config.method === 'post') {
      config.data = config.data
    } else if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
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
        if (!res.data.Data) {
          res.data.Data = 1
        }
        return res.data.Data
      } else {
        Message.warning(res.data.Msg);
        // return res.data.Data
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
    let tooken = '';
    if (process.server) {
      if ($store.state.overas.auth) {
        tooken = $store.state.overas.auth.token
      }
    }
    if (process.client) {
      if (JSON.parse(localStorage.getItem('LOGININ'))) {
        tooken = JSON.parse(localStorage.getItem('LOGININ')).token
      }
    }
    return service({
      headers: {
        Authorization : "Bearer "+ tooken
      },
      method: 'post',
      url,
      data: data
    })
  },

  postFile (url, data) {
    console.log('post request url', url)
    let tooken = '';
    if (process.server) {
      if ($store.state.overas.auth) {
        tooken = $store.state.overas.auth.token
      }
    }
    if (process.client) {
      if (JSON.parse(localStorage.getItem('LOGININ'))) {
        tooken = JSON.parse(localStorage.getItem('LOGININ')).token
      }
    }
    return service({
      file: 'file',
      headers: {
        Authorization : "Bearer "+ tooken
      },
      method: 'post',
      url,
      data: data
    })
  },

  get (url, data) {
    console.log('get request url', url)
    let tooken = '';
    if (process.server) {
      if ($store.state.overas.auth) {
        tooken = $store.state.overas.auth.token
      }
    }
    if (process.client) {
      if (JSON.parse(localStorage.getItem('LOGININ'))) {
        tooken = JSON.parse(localStorage.getItem('LOGININ')).token
      }
    }
    return service({
      headers: {
        Authorization : "Bearer "+ tooken
      },
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
  },
  downFile (url, data ) {
    let tooken = '';
    if (process.server) {
      if ($store.state.overas.auth) {
        tooken = $store.state.overas.auth.token
      }
    }
    if (process.client) {
      if (JSON.parse(localStorage.getItem('LOGININ'))) {
        tooken = JSON.parse(localStorage.getItem('LOGININ')).token
      }
    }
    return service({
      headers: {
        Authorization : "Bearer "+ tooken
      },
      methods: 'post',
      responseType: 'blob',
      url,
      params: data
    })
  }
}
