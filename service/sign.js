import request from './index'

// 微信支付
export const WXSETMEAL = async (params) => {
  return await request.post('AllPay/WXTribalCoinsTopUp', params)
}
// 支付宝支付
export const ZFBSETMEAL = async (params) => {
  return await request.post('AllPay/TribalCoinsTopUp', params)
}
// 获取订单支付状态
export const getOrderStatr = async (params) => {
  return await request.get('AllPay/GetOrderStatus', params)
}
// 积分抽奖
export const getLottery = async (params) => {
  return await request.get('UserIntegral/IntegralLottery', params)
}
// 获取中奖者
export const getWiner = async (params) => {
  return await request.get('UserIntegral/WinerInfo', params)
}
// 获取奖品
export const getPrizeInfo = async (params) => {
  return await request.get('UserIntegral/PrizeInfo', params)
}
// 获取说明列表
export const getSysList = async (params) => {
  return await request.get('Common/GetSysExpArticleList', params)
}
// 获取说明列表
export const ExChange = async (params) => {
  return await request.post('AllPay/IntegralExchange', params)
}
// 获取聊天列表
export const getChatUserList = async (params) => {
  return await request.get(`chat/DialogueRoomList?quickQuery=${params ? params : ""}`)
}
// 创建聊天房间
export const addChatUserList = async (params) => {
  return await request.post(`chat/AddDialogueRoom?toUserId=${params}`)
}
// 创建聊天记录
export const getChatHistory = async (params) => {
  return await request.get(`chat/ToUserHistoryMsg?roomId=${params}`)
}
// 创建商品列表   
export const getSaleList = async (params) => {
  return await request.get('ItemList/GetItemSaleList', params)
}
// 创建商品列表   
export const buyGood = async (params) => {
  return await request.post('AllPay/BoughtItem', params)
}
// 创建商品列表   
export const getGoodStart = async (params) => {
  return await request.get('AllPay/GetBoughtItemInfo', params)
}
// 设置聊天人关系  
export const setShip = async (opID, opType) => {
  return await request.post(`chat/ChatOperation?opId=${opID}&opType=${opType}`)
}
// 设置聊天人关系  
export const getRoom = async (params) => {
  return await request.get(`chat/DialogueRoom?RoomId=${params}`)
}
// 获取新建群组用户，删除群组用户，添加群组用户 ALTER USER 
export const getGroupUser = async (params) => {
  return await request.get(`chat/GetGroupUsers`, params)
}
// 获取新建群组用户，删除群组用户，添加群组用户
export const CreateGroup = async (params) => {
  return await request.post(`chat/CreateGroupRoom`, params)
}
// 获取群组信息
export const getGroupInfo = async (params) => {
  return await request.get(`chat/GetGroupInfo?roomId=${params}`)
}
// 删除成员
export const delGroupUser = async (userId, roomId) => {
  return await request.post(`Chat/RemovGroupUser?userIds=${userId}&roomId=${roomId}`)
}
// 添加成员 分享群组
export const addGroupUser = async (userId, roomId, type) => {
  return await request.post(`Chat/AddGroupUser?userIds=${userId}&roomId=${roomId}&enterWay=${type}`)
}
// 分享群组