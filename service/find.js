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
// 获取图板类型
export const getAlbumType = async (params) => {
    return await request.get('Picture/GetAlbumType', params)
}
// 创建/修改图板
export const postAlbum = async (params) => {
    return await request.post('Picture/PostAlbum', params)
}
// 创建/修改采集
export const addAlbum = async (params) => {
    return await request.post('Picture/PostPicture', params)
}
// 创建/修改采集
export const getOwnAlbum = async (params) => {
    return await request.get('Picture/GetOwnAlbum', params)
}
// 创建/修改采集
export const getOwnInfo = async (params) => {
    return await request.get('Picture/GetOwnInfo', params)
}
// 创建批量采集
export const addPicture = async (params) => {
    return await request.post('Picture/PostBatchPicture', params)
}
// 删除图板
export const delAlbum = async (params) => {
    return await request.post('Picture/DeleteAlbum', params)
}
// 删除采集
export const delPicture = async (params) => {
    return await request.post('Picture/DeleteOrMovePicture', params)
}
// 推荐-采集列表
export const getSamePicture = async (params) => {
    return await request.post('Picture/GetSamePicture', params)
}