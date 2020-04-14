import request from '~/service'

export const serverRequest = {
  // 获取首页导航信息
  async getMenu({ commit, state }, params) {
    return await request.get('Menu/GetMenuAll')
  },
  // 获取首页信息
  async getHomeData({ commit, state }, params) {
    return await request.get('Home/GetIndexAllData')
  },
  // 获取档案库
  async getBaseData({ commit, state }, params) {
    return await request.post('ItemList/GetItemList', params)
  },
  // 获取档案库详情
  async getBaseDataDetails({ commit, state }, params) {
    return await request.post('ItemDetails/Details', params)
  },
  // 获取建筑圈说说
  async getTalk({ commit, state }, params) {
    let takeUrl = `Talk/GetTalk?talkId=${params.id}`
    return await request.post(takeUrl, params.queryData)
  },
  // 获取建筑圈详情评论
  async getGetComments({ commit, state }, params) {
    return await request.post('Comments/GetComments', params)
  },
  // 获取推荐内容
  async getRecommendContent({ commit, state }, params) {
    return await request.post('Talk/GetRecommendContent', params)
  },
  // 获取关注数据
  async getAttentionList({ commit, state }, params) {
    return await request.post(`Talk/GetFollowigMoving`, params)
  },

  // 获取问答页面左侧搜索标签
  async getQASearchTag() {
    return await request.get(`Talk/GetQALabel`)
  },

  // 获取问答页面推荐数据和轮播图
  async getQARecomment() {
    return await request.get(`Talk/GetRecommendQA`)
  },

  // 获取问答列表
  async getQAData({ commit }, params) {
    return await request.post(`Talk/GetQADataBy`, params)
  },
  // 获取问答详情
  async getQADetail({ commit }, id) {
    return await request.post(`Talk/GetQADetails?sId=${id}`)
  },

  // 获取部落基本信息
  async getTribeInfo({commit}, userId) {
    return await request.post(`MyTribe/GetUserInfo`, {
      UserId: userId
    })
  },
  // 获取关注信息
  async getFollowigMoving({commit}, params) {
    return await request.get(`Talk/GetFollowigMoving`, params)
  },
  // 获取所有个人部落或者他人部落数据
  async getSelfOrOthertribeInfo({commit}, params) {
    return await request.post(`MyTribe/GetMyOrOtherDatas`, params)
  },
  // 获取所有个人信息
  async getUserData({commit}, params) {
    return await request.get(`UserInfo/GetUserData`, params)
  },
  // 获取收货地址
  async getAddressData({commit}, params) {
    return await request.get(`UserInfo/GetThisALLUserShippingAddress`, params)
  },
  /** 
 * 搜索页改版
 * 
*/
// 获取搜索页导航
  async getSearchNav({commit}, params) {
    return await request.post(`ItemList/GetItemListMeunData`, params)
  },
// 获取搜索页导航
  async getItemList({commit}, params) {
    return await request.post(`ItemList/GetItemListData`, params)
  },
  // 获取友情连接
  async getFriendLinks({commit}, params) {
    return await request.get(`Other/GetFriendLinks`, params)
  },
  // 获取历史记录
  async getQueryHistory({commit}, params) {
    return await request.post(`Query/QueryHistory`, params)
  },
  // 获取要展示的搜索的按钮
  async getQueryBtnData({commit}, params) {
    return await request.post(`Query/QueryBtnData`, params)
  },
  // 获取要展示的搜索的按钮
  async getQueryData({commit}, params) {
    return await request.post(`Query/QueryData`, params)
  },
  // 个人部落访问记录
  async TribeVisiting({commit}, params) {
    return await request.post(`MyTribe/TribeVisiting`, params)
  },
  // 获取要展示的消息
  async getNews({commit}, params) {
    return await request.get(`LConnection/GetAppMessage`, params)
  },
  // 获取系统说明文档菜单
  async getSysExpMenu({commit}, params) {
    return await request.get(`Common/GetSysExpMenu`, params)
  },
  // 获取系统说明文档
  async getSysExp({commit}, params) {
    return await request.get(`Common/GetSysExpDetail?itemDetailId=${params}`)
  },
  //发布导航
  async geOwnItemList({commit}, params) {
    return await request.post(`ItemList/GetOwnItemList`, params)
  },
  // 判断是不是公司
  async isMyTribe({commit}, params) {
    return await request.post(`MyTribe/IsEnt?userId=${params}`)
  },
  // 首页获取推荐
  async getRec({commit}, params) {
    return await request.post(`Other/GetRecommend?typeIds=${params.ids}&take=${params.pages}`)
  },
  // 订单类型
  async getOrderType({commit}, params) {
    return await request.post(`OrderReceiving/GetReceivingList`, params)
  },
  // 订单列表
  async getOrderList({commit}, params) {
    return await request.post(`OrderReceiving/GetOrderReceiving`, params)
  },
  // 订单详情
  async getOrderDel({commit}, params) {
    return await request.get(`OrderReceiving/GetReceivingDetail`, params)
  },
   // 获取套餐列表
  async getCoinsList({commit}, params) {
    return await request.get(`AllPay/GetTribalCoinsData`, params)
  },
  // 获取奖品
  async getPrizeInfo({commit}, params) {
    return await request.get(`UserIntegral/PrizeInfo`, params)
  },
  // 获取其他菜单
  async getSysMenu({commit}, params) {
    return await request.get(`Common/GetSysExpTypeMenu`, params)
  },
  // 获取详情
  async getMenuDetail({commit}, params) {
    return await request.get(`Common/GetSysExpDetail`, params)
  },
  // 获取兑换积分列表
  async getItemEx({commit}, params) {
    return await request.get(`UserIntegral/GetItemExchangeList`, params)
  },
  // 获取用户积分
  async getIUserIntegral({commit}, params) {
    return await request.get(`UserIntegral/GetUserIntegral`, params)
  },
   // 获取用户积分
  async getSaleDetails({commit}, params) {
    return await request.get(`ItemList/GetItemSaleDetail`, params)
  },
}
