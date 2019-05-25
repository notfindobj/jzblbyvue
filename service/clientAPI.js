import request from './index'
export const getMenu = async (params)=>  {
    return await request.get('Menu/GetMenuAll', params)
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
// 获取资源库
export const getBaseData =async (params)=>  {
  return await request.post('ItemList/GetItemList', params)
}
/**
 * 资源库详情
 */
// 点赞
export const setthumbsUp = async (params)=>  {
    return await request.post('CollectionOrLike/Like', params)
}
// 收藏
export const setCollection = async (params)=>  {
    return await request.post('CollectionOrLike/Collection', params)
}
// 收藏
export const setFollow = async (params)=>  {
    return await request.post('CollectionOrLike/Follow', params)
}
// 评论
export const setComments = async (params)=>  {
    return await request.post('Comments/PublishComments', params)
}
// 发布说说 说说指的是（图文，视频，问答）
export const releaseStatement = async (params)=>  {
    return await request.post('Publish/ReleaseTalk', params)
}

// 数据上传
export const uploadFile = async (params, uploadType) => {
    return await request.postFile(`Upload/DataUpload?uploadType=${uploadType}`, params)
}

// 获取问答标签
export const getQALabel = async () => {
    return await request.post(`Publish/GetQALabel`, {
        BelongTypes: '',
        page: 0
    })
}
