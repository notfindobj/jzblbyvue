import axios from 'axios';
import { Message } from 'iview';
import qs from 'qs';
import config from './config';
import createStore from '../store';
const $store = createStore();

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
      if (res.data.Code === 200 && res.data.Success) {
        return res.data.Data
      } else if (res.data.Code === 500) {
        return {statusCode: 500, message: 'You need back to login again'}
      } else if (res.data.Code === 101) {
        // $router.push({name: "index"})
      }
    }
    // 客户端
    if (process.client) {
      if (res.data.Code === 200 && res.data.Success) {
        if (!res.data.Data) {
          res.data.Data = 1
        }
        return res.data.Data
      } else if (res.data.Code === 6001) {
        return res.data
      }else if (res.data.Code === 101) {
        Message.warning(res.data.Msg);
          $store.dispatch('LOGININ', null);
          sessionStorage.removeItem("LOGININ");
          delCookie("adminToken");
          if (window.location.href !== "https://www.jzbl.com/") {
            window.location.href="https://www.jzbl.com"
          }
      } else if (res.data.Code === 1001) {
        return res.data
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
//取cookies     
function getCookie(name){
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]); 
  return null;
}
//删除cookie
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
export default {
  post (url, data) {
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
    return service({
      methods: 'delete',
      url,
      data: data
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
      // responseType: 'blob',
      url,
      params: data
    })
  }
}
