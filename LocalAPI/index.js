import request from './dataStorage'
// 本地存储
export const setDemo = async (name, params) => {
    return await request.post(`session/${name}`, params);
}
// 本地代理登录接口
export const login = async (params) => {
    return await request.post('front/mobileLogin', params);
}
// 本地代理退出接口
export const logout = async (params) => {
    return await request.post('api/logout', params);
}
// 本地代理修改昵称头像
export const setHearImg = async (params) => {
    return await request.post('user/setUserInfo', params);
}