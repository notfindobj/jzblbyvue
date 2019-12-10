import request from './index'
export const getMenu = async (params) => {
  return await request.get('Menu/GetMenuAll', params)
}

// qq登录
export const loginByQQ = async () => {
  return await request.post('Account/Thirdparty_QQ_binding?redirectUri=http://www.jzbl.com/qq')
}

// 微信登录
export const loginByWX = async () => {
  return await request.post('Account/Thirdparty_wx_binding?redirectUri=http://www.jzbl.com/wx')
}

// 获取验证码
export const getMobileCode = async (params) => {
  return await request.post('Account/GetMobileCode', params)
}
// 注册
export const registerUser = async (params) => {
  return await request.post('Account/RegisterUser', params)
}
// 重置密码
export const ResetPwd = async (params) => {
  return await request.post('Account/ResetPwd', params)
}
// 获取档案库
export const getBaseData = async (params) => {
  return await request.post('ItemList/GetItemList', params)
}
// 获取项目和粉丝量
export const getUserProAndFans = async (params) => {
  return await request.post(`Account/GetUserProAndFans?byUserId=${params}`)
}
/**
 * 档案库详情
 */
  // 点赞
export const setthumbsUp = async (params) => {
    return await request.post('CollectionOrLike/Like', params)
  }
export const getComments = async (params) => {
  return await request.post('Comments/GetComments', params)
}
// 收藏
export const setCollection = async (params) => {
  return await request.post('CollectionOrLike/Collection', params)
}
// 关注
export const setFollow = async (params) => {
  return await request.post('CollectionOrLike/Follow', params)
}
// 评论
export const setComments = async (params) => {
  return await request.post('Comments/PublishComments', params)
}
// 发布说说 说说指的是（图文，视频，问答）
export const releaseStatement = async (params) => {
  return await request.post('Publish/ReleaseTalk', params)
}

// 数据上传
export const uploadFile = async (params, uploadType, md5= '') => {
  return await request.postFile(`Upload/DataUpload?uploadType=${ uploadType }&md5=${md5}`, params)
}

// 获取问答标签
export const getQALabel = async data => {
  return await request.post(`Publish/GetQALabel`, data)
}
// 获取问答标签搜索
export const getQADataBy = async data => {
  return await request.post(`Talk/GetQADataBy`, data)
}

// 添加问答标签
export const addLabel = async data => {
  return await request.post(`Publish/AddLabel`, data)
}

// 获取所有项目类型
export const getProjectType = async parentId => {
  return await request.post(`Menu/GetDataALLByTypeId?moduleId=${ parentId }`)
}

// 根据类型获取定制服务
export const getCustomizeService = async id => {
  return await request.post(`Menu/GetCustomizeService?TypeId=${ id }`)
}

// 发布项目
export const publishProject = async params => {
  return await request.post(`Publish/ReleaseItem`, params)
}

// 记录用户访问
export const recordFrequency = async params => {
  return await request.post(`ItemDetails/RecordFrequency`, params)
}

// 获取个人或他人部落类型菜单
export const getTypeMeun = async params => {
  return await request.post(`MyTribe/GetTypeMeunBy`, params)
}
// 获取所有个人信息
export const getUserData = async params => {
  return await request.get(`UserInfo/GetUserData`, params)
}
// 修改所有个人信息
export const setUserData = async params => {
  return await request.post(`UserInfo/SetUserData`, params)
}
// 修改标签
export const saveUserExpertise = async params => {
  return await request.post(`UserInfo/SaveUserExpertise`, params)
}
// 删除用户标签
export const delUserExpertise = async params => {
  return await request.post(`UserInfo/DeleteUserExpertiseLabel`, params)
}
// 获取收货地址
export const getAddressData = async params => {
  return await request.get(`UserInfo/GetThisALLUserShippingAddress`, params)
}
// 更新收货地址
export const setAddressData = async params => {
  return await request.post(`UserInfo/SetOrAddUserShippingAddress`, params)
}
// 删除收货地址
export const delAddressData = async params => {
  return await request.post(`UserInfo/DeleteUserShippingAddress`, params)
}

// 获取三级联动数据
export const getProvinceList = async params => {
  return await request.post(`UserInfo/GetProvinceData`, params)
}
// 获取定制服务数据
export const getCustomizeDataByItemId = async params => {
  return await request.post(`ItemDetails/GetCustomizeDataByItemId?itemId=${params}`)
}
// 回复定制服务数据
export const setReplyCustomize = async params => {
  return await request.post(`ItemDetails/ReplyCustomize`, params)
}
// 支付宝接口
export const setAiliPay = async params => {
  return await request.post(`AllPay/AiliPay`, params)
}
// 微信支付接口
export const setWechatPay = async params => {
  return await request.post(`AllPay/WechatPay`, params)
}
// 支付下载接口
export const downloadFile = async params => {
  return await request.post(`AllPay/DownloadFile?itemId=${params}`)
}
// 绑定微信登录
export const bindingByWX = async params => {
  return await request.post(`UserInfo/BindWx?code=${params.code}&state=${params.state}`)
}
// 获取用户信息 【操作权限 / 感情状况】数据接口 操作权限；code 2：感情状况 ,默认是1 ,3 发布展示可看权限
export const GetOperatPrivacy = async params => {
  return await request.post(`UserInfo/GetOperatPrivacy?code=${params}`)
}
// 修改昵称
export const SetUserNickNameData = async params => {
  return await request.post(`UserInfo/SetUserNickNameData?Nickname=${params}`)
}
// 获取个人擅长标签接口
export const GetUserExpertise = async params => {
  return await request.get(`UserInfo/GetUserExpertise`, params)
}
//获取当前用户所有职业信息接口
export const GetThisUserJobInfo = async params => {
  return await request.get(`UserInfo/GetThisUserJobInfo`, params)
}
//获取当前用户所有职业信息接口
export const SetOrAddThisUserJobInfo = async params => {
  return await request.post(`UserInfo/SetOrAddThisUserJobInfo`, params)
}
//修改用户手机号码接口
export const SetChangeMobile = async params => {
  return await request.post(`UserInfo/ChangeMobile`, params)
}
//获取关注或粉丝
export const getFollowOrFans = async params => {
  return await request.post(`MyTribe/GetFollowOrFans`, params)
}

// 获取绑定信息
export const getAccountBindInfo = async () => {
    return await request.get(`UserInfo/GetAccountBindInfo`)
}
// 解绑qq或者微信
export const unBindQQOrWX = async params => {
    return await request.post(`UserInfo/UnBindQQorWx`, params)
}
// 获取表情包
export const getEmoticon = async params => {
  return await request.get(`Other/GetEmoticon`, params)
}
// 获取表情包
export const addUserLabel = async params => {
  return await request.post(`UserInfo/AddLabel`, params)
}

// 获取所有主题接口
export const getALLTheme = async params => {
  return await request.get(`UserInfo/GetALLTheme`, params)
}
// 获取所有主题接口
export const getUserTheme = async params => {
  return await request.get(`UserInfo/GetUserTheme?userId=${params}`)
}
// 设置主题接口
export const setUserTheme = async params => {
  return await request.post(`UserInfo/SetUserTheme?themeId=${params}`)
}
// 删除搜索
export const delQueryData = async params => {
  return await request.post(`Query/QueryDeleteHistory?strQueryIds=${params}`)
}
// 针对项目的操作
export const ItemOperat = async params => {
  return await request.post(`MyTribe/ItemOperat`, params)
}
// 针对项目的操作
export const delComment = async params => {
  return await request.get(`Comments/DeleteComment?commentsId=${params}`, )
}
/***
 * 公司相关
 */
// 获取企业注册公司类型接口
export const getEntType = async params => {
  return await request.get(`Account/GetEntType`)
}
//  企业用户注册接口
export const registerEnterprise = async params => {
  return await request.post(`Account/RegisterEnterprise`, params)
}
// 获取要展示的消息 （1=删除，2=设置为已读）
export const setMessage = async params => {
  return await request.post(`LConnection/SetMessage`, params)
}
// 获取定制详情
export const getCustomizeInfo = async params => {
  return await request.get(`LConnection/GetCustomizeInfo`, params)
}
// 获取项目价格 
export const getItemPrice = async params => {
  return await request.get(`MyTribe/GetItemPrices?itemId=${params}`)
}
// 获取职业类型
export const getCareerData = async params => {
  return await request.get(`UserInfo/GetCareerData`, params)
}
// 获取职业类型
export const getCareerTyepInfo = async params => {
  return await request.get(`UserInfo/GetCareerOrTyepInfo?userId=${params}`)
}
// 设置职业类型
export const setCareerTyepInfo = async params => {
  return await request.post(`UserInfo/SetCareerData?ids=${params}`)
}
// 删除职业类型
export const delareerTyepInfo = async params => {
  return await request.get(`UserInfo/DeleteCareerData/${params}`)
}
//获取资金账户
export const getFundAccount = async params => {
  return await request.post(`Account/FundAccount`, params)
}
//发布导航
export const getDataByTypeId = async params => {
  return await request.post(`Menu/GetDataByTypeId`, params)
}
// 获取推荐 用于建筑圈，视频
export const getRecommend = async (params, pages) => {
  return await request.post(`Other/GetRecommend?typeIds=`+params+'&take='+pages, )
}
// 提交反馈
export const addFeedbackData = async params => {
  return await request.post(`Feedback/AddFeedbackData`, params)
}
// 公司信息
export const getCompanyInfo = async params => {
  return await request.get(`CompanyInfo/GetCompanyInfo`, params)
}
// 搜索用户
export const getQueryData = async params => {
  return await request.get(`CompanyInfo/QueryUserInvite?KeyValue=${params}`)
}
// 邀请用户
export const addInviteUser = async params => {
  return await request.post(`CompanyInfo/InviteUser`, params)
}
// 处理邀请信息
export const handleInviteUser = async params => {
  return await request.post(`CompanyInfo/UserDealInvite`, params)
}