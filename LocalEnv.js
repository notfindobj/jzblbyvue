exports.configUrl = {
    baseUrl: (() => {
        // 后台接口
        if (process.env.NODE_ENV === 'demo') {
        // 测试环境
            return 'http://106.14.139.124:8099/api/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'http://www.api.jzbl.com/api/'
        } else {
        // 本地环境
            return 'http://106.14.139.124:8099/api/'
        }
    })(),
    // 本地接口
    localUrl: (() => {
        // 测试环境
        if (process.env.NODE_ENV === 'demo') {
            return 'http://www.demo.jzbl.com/api/'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式环境
            return 'http://www.jzbl.com/api/'
        } else {
        // 本地环境
            return 'http://127.0.0.1:8889/'
        }
    })(),
    serverPort: (() => {
        // 测试端口
        if (process.env.NODE_ENV === 'demo') {
            return '8089'
        } else if (process.env.NODE_ENV === 'pro') {
        // 正式端口
            return '8889'
        } else {
        // 本地端口
            return '8889'
        }
    })(),
    // 文件路径
    fileBaseUrl: 'http://www.pic.jzbl.com/'
}