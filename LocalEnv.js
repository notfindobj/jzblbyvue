exports.configUrl = {
    baseUrl: (() => {
        // 后台接口
        if (process.env.NODE_ENV === 'demo') {
        // 测试环境
            return 'https://www.api.jzbl.com/api/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'https://www.api.jzbl.com/api/'
        } else {
        // 本地环境
            // return 'http://192.168.10.15:8066/api/'
             return 'https://www.api.jzbl.com/api/'
        }
    })(),
    // 本地接口
    localUrl: (() => {
        // 测试环境
        if (process.env.NODE_ENV === 'demo') {
            return 'https://www.jzbl.com/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'https://www.jzbl.com/'
        } else {
        // 本地环境 
            // return 'http://192.168.10.14:8555'
             return 'https://www.jzbl.com/'
            // return 'http://192.168.10.07:8889'
        }
    })(),
    serverPort: (() => {
        // 测试端口
        if (process.env.NODE_ENV === 'demo') {
            return '8889'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式端口
            return '8889'
        } else {
        // 本地端口 
            return '8889'
        }
    })(),
    // 文件路径
    fileBaseUrl: (() => {
        return 'https://www.pic.jzbl.com/'
        // return 'http://192.168.10.15:8066/'
    })(),
    imgBaseUrl: (() => {
        return 'https://www.pic1.jzbl.com/'
        // return 'http://192.168.10.15:8066/'
    })(),
    /**
        h5详情页
        http://www.m.jzbl.com/#/builddetail?sid=eaa09eec-b7c1-43f7-b932-6a58410bbece&type=1

        query参数说明: 
        sid: 说说或者项目id
        type: 1 说说 、2 项目 
    */
    h5BaseUrl: (()=> {
        return 'http://www.m.jzbl.com/#'
    })()
}