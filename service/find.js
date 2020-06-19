import request from './index'
// 获取采集列表
export const getPicturelist = async (params) => {
    return await request.post('Picture/GetPicturelist', params)
}
// 获取采集详情
export const getPictureDetail = async (params) => {
    return await request.get('Picture/GetPictureDetail', params)
}
// 获取图板详情
export const getAlbumDetail = async (params) => {
    return await request.get('Picture/GetAlbumDetail', params)
}