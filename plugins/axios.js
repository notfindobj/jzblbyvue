import qs from "qs";
import iView from 'iview'

export default function ({ $axios, app }) {
  console.log(app)
  // console.log(app.$cookies.get('token'))  //每次请求获取cooie
  // $axios.defaults.baseURL = 'http://123/'
  $axios.onRequest(config => {
    //获取cookie放在头部传到后端
    // config.headers.Authorization = app.$cookies.get('token')
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    Object.assign(config, {
      baseURL: 'https://www.apiopen.top/journalismApi'
    })
    return config;
  });
 
  $axios.onResponse(response => {
    console.log(iView.Message, response)
    if (response.data && response.data.msg) {
      iView.Message.info(response.data.msg)
    }
    return Promise.resolve(response.data);
  });
 
  $axios.onError(error => {
    return Promise.reject(error);
  });
}
