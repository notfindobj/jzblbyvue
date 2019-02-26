import qs from "qs";
import iView from 'iview'

export default function ({ $axios, app }) {
  // console.log(app.$cookies.get('token'))  //每次请求获取cooie
  $axios.defaults.baseURL = 'http://www.jzbl.com:8066/api/'
  $axios.onRequest(config => {
    console.log('请求拦截')
    //获取cookie放在头部传到后端
    // config.headers.Authorization = app.$cookies.get('token')
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    return config;
  });
 
  $axios.onResponse(response => {
    console.log('相应拦截')
    if (response.data) {
      switch (response.data.Code) {
        case 500 :
        iView.Message.info(response.data.Msg);
        break
      }
      return Promise.resolve(response.data);
    }
    
  });
 
  $axios.onError(error => {
    return Promise.reject(error);
  });
}
