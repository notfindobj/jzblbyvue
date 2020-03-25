import request from './index'


// 获取套餐列表
export const getCoinsList = async (params) => {
  return await request.get('AllPay/GetTribalCoinsData', params)
}