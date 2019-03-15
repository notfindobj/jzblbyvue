import request from '~/service'

export const serverRequest ={
    async getMenu ({ commit, state }, params) {
        return await request.get('Menu/GetMenuAll')
    }
}