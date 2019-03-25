import request from './index'


export const getMenu =async (params)=>  {
    return  request.get('Account/RegisterUser', params)
}
// 获取验证码
export const getMobileCode =async (params)=>  {
    return await request.post('Account/GetMobileCode', params)
}
// 注册 
export const registerUser =async (params)=>  {
    return await request.post('Account/RegisterUser', params)
}