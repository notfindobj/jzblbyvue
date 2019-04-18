import request from '~/service'

export const serverRequest ={
    // 获取首页导航信息
    async getMenu ({ commit, state }, params) {
        return await request.get('Menu/GetMenuAll')
    },
    // 获取首页信息
    async getHomeData ({ commit, state }, params) {
        return await request.get('Home/GetIndexAllData')
    },
    // 获取资源库
    async getBaseData ({ commit, state }, params) {
        return await request.post('ItemList/GetItemList', params)
    },
    // 获取资源库详情
    async getBaseDataDetails ({ commit, state }, params) {
        return await request.post('ItemDetails/Details', params)
    }
}