import request from './index'


export const getMenu =async (params)=>  {
    return  request.get('Account/RegisterUser', params)
}
// 登录
export const lognIn =async (params)=>  {
    return  request.post('Account/CheckLogin', params)
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