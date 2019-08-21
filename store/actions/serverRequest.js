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
  // 获取资源库
  async getBaseData({ commit, state }, params) {
    return await request.post('ItemList/GetItemList', params)
  },
  // 获取资源库详情
  async getBaseDataDetails({ commit, state }, params) {
    return await request.post('ItemDetails/Details', params)
  },
  // 获取建筑圈说说
  async getTalk({ commit, state }, params) {
    return await request.post('Talk/GetTalk', params)
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
    return await request.post(`MyTribe/GetMyOrOtherData`, params)
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
  }
}
