import { overallActions } from '../actions/overallActions'
import { overallGetters } from '../getters/overallGetters'
import { overallMutation } from '../mutations/overallMutation'
export const overas = {
    state: {
        showSign: false, // 打开模态框状态
        isItLoggedIn: '', // 打开模态框状态
        auth: null, // 登录状态，
        searchNav: 0,
        queryBaseData: {},  // 档案库导航
        wxRegister: {}, // 微信注册时的信息,
        sessionStorage: {}, // 存储的数据
        dingzhi: {},// 存储定制信息
        pinglun: {},// 存储评论信息
        inviter: {},// 存储邀请信息
    },
    actions: overallActions,
    getters: overallGetters,
    mutations: overallMutation
}
