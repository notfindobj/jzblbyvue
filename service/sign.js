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