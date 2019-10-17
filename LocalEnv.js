exports.configUrl = {
    baseUrl: (() => {
        // 后台接口
        if (process.env.NODE_ENV === 'demo') {
        // 测试环境
            return 'http://www.api.jzbl.com/api/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'http://www.api.jzbl.com/api/'
        } else {
        // 本地环境
            // return 'http://192.168.10.13:8066/api/'
            return 'http://106.14.139.124:8099/api/'
            // return 'http://www.api.jzbl.com/api/'
        }
    })(),
    // 本地接口
    localUrl: (() => {
        // 测试环境
        if (process.env.NODE_ENV === 'demo') {
            return 'http://www.jzbl.com/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'http://www.jzbl.com/'
        } else {
        // 本地环境
            // return 'http://192.168.10.14:8555'
            // return 'http://www.jzbl.com/'
            return 'http://192.168.10.7:8555'
        }
    })(),
    serverPort: (() => {
        // 测试端口
        if (process.env.NODE_ENV === 'demo') {
            return '8555'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式端口
            return '8555'
        } else {
        // 本地端口
            return '8555'
        }
    })(),
    // 文件路径
    fileBaseUrl: 'http://www.pic.jzbl.com/'
}