import request from './dataStorage'

export const setDemo = async (name, params) => {
    return await request.post(`session/${name}`, params)
}