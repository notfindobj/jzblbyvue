import request from './index'

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
// 获取资源库
export const getBaseData =async (params)=>  {
  return await request.post('ItemList/GetItemList', params)
}