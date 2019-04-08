import request from './index'


export const getMenu =async (params)=>  {
    return  request.get('Account/RegisterUser', params)
}
// 登录
export const lognIn = async (params)=>  {
    return fetch('/api/login', {
        // 发送客户端 cookies 到服务端
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return res.json()
        }
      })
      .then((authUser) => {
        commit('SET_USER', authUser)
      })
}

// 获取验证码
export const getMobileCode =async (params)=>  {
    return await request.post('Account/GetMobileCode', params)
}
// 注册 
export const registerUser =async (params)=>  {
    return await request.post('Account/RegisterUser', params)
}
// 重置密码
export const ResetPwd =async (params)=>  {
    return await request.post('Account/ResetPwd', params)
}