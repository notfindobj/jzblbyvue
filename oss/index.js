import axios from 'axios';
import config from './config';
const service = axios.create(config);
// service.defaults.withCredentials = true;
// POST 传参序列化
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    return service({
      method: 'post',
      url,
      data: data
    })
  }
}
