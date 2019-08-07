const axios = require('axios')
import { Message } from 'iview'
const qs = require('qs')
// const url = process.env.NODE_ENV === 'production' ? 'http://www.demo.jzbl.com/' : 'http://192.168.10.19:8889/';
const url = process.env.NODE_ENV === 'production' ? 'http://www.demo.jzbl.com/' : 'http://127.0.0.1:8889/';
const LocalAPI = axios.create();
import createStore from '../store'
const $store = createStore();
// POST 传参序列化
LocalAPI.interceptors.request.use(
    config => {
      config.baseURL = url;
      if (config.method === 'post') {
        let isSossion = config.data;
        if (isSossion) {
            if (isSossion.key) {
              $store.dispatch('Serverstorage', isSossion)
            }
            config.data = qs.stringify(config.data);
        }
        config.headers = {
          'Content-Type':'application/x-www-form-urlencoded'
        }
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
      } else {
        Message.warning(res.data.Msg);
      }
    },
    error => {
      return Promise.reject(error)
    }
  )
LocalAPI.defaults.withCredentials = true;
export default {
    post (url, data) {
      return LocalAPI({
        method: 'post',
        url,
        data: data
      })
    }
}
