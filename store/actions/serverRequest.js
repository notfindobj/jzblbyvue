import request from '~/service'

export const serverRequest ={
    async getMenu ({ commit, state }, params) {
        return await request.get('Menu/GetMenuAll')
    },
    async getHomeData ({ commit, state }, params) {
        return await request.get('Home/GetIndexAllData')
    }
}