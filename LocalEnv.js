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
        return 'http://www.pic.jzbl.com/'
        // return 'http://192.168.10.15:8066/'
    })()
}