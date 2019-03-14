import axios from 'axios'

export const serverRequest = {
   async getMenu ({ commit, state }, param) {
    let {data} = await axios.get('http://www.api.jzbl.com/api/Menu/GetAll')
    return data
    }
}