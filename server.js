const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = require('express')()
// const timeout = require('connect-timeout')
const session = require('express-session');
const axios = require('axios')
const qs = require('qs')

const BaseUrl = process.env.NODE_ENV === 'production' ? 'http://www.api.jzbl.com/api/' : 'http://106.14.139.124:8099/api/';
// Body parser，用来封装 req.body
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ 
    parameterLimit: 100000,
    limit: 1024 * 1024 * 10
})); //根据需求更改limit大小
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: 1024 * 1024 * 10 
}));  //据需求更改limit大小
app.use(cookieParser());
axios.defaults.withCredentials = true;




//  session 存储数据
app.use(session({
    secret: 'demo_test',
    name: 'mydemo',                         //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 3600 * 1000 * 24},    //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
    resave: false,                         // 每次请求都重新设置session cookie
    saveUninitialized: true
}))
// 存储数据
app.post('/session/:name', function (req, res) {
    let response = {
        Success: true,
        Data: {},
        Msg: '存储成功',
        Code: 200
    }
    try {
        response.Msg = '存储成功'
        req.session[req.params.name] = req.body
        response.Data =  req.session
    } catch (error) {
        response.Msg = '存储失败'
        response.Code = 400
        return res.json(response)
    }
    return res.json(response)
})
// 更改头像和昵称
/**
 * name: 昵称
 * headIcon: 用户头像
 *
 */
app.use('/user/setUserInfo', function (req, res) {
    let response = {
        Success: true,
        Data: {},
        Msg: '存储成功',
        Code: 200
    }
    let user = req.cookies.adminToken;
    if (req.body.name) {
        user.NickName = req.body.name
    }
    if (req.body.headIcon) {
        user.HeadIcon = req.body.headIcon
    }
    response.Data = user;
    return res.json(response);
})

// 通过手机号码登录 POST /api/
app.post('/front/mobileLogin', function (req, res) {
    let config = {
        url: `${BaseUrl}Account/CheckLogin`,
        withCredentials: true,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(req.body)
    }
    axios(config).then(data => {
        const token = data.data.Data;
        if (token) {
            res.cookie('adminToken', token, {
                maxAge: 60000 * 60 * 30
            })
        }
        return res.json(data.data)
    }, err => {
        return res.json(err)
    })
});

// 微信登录
app.post('/front/wxLogin', function (req, res) {
    let config = {
        url: `${BaseUrl}Account/wx`,
        withCredentials: true,
        method: 'get',
        params: req.body
    }
    axios(config).then(data => {
        if (data.data.Data.token) {
            const token = data.data.Data;
            if (token) {
                res.cookie('adminToken', token, {
                    maxAge: 60000 * 60 * 30
                })
            }
        }
        return res.json(data.data)
    }, err => {
        return res.json(err)
    })
});


// QQ登录
app.post('/front/qqLogin', function (req, res) {
    let config = {
        url: `${BaseUrl}Account/qq`,
        withCredentials: true,
        method: 'get',
        headers: req.body.Authorization ? {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer " + req.body.Authorization
        } : {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: req.body
    }
    axios(config).then(data => {
        if (data.data.Data.token) {
            const token = data.data.Data;
            if (token) {
                res.cookie('adminToken', token, {
                    maxAge: 60000 * 60 * 30
                })
            }
        }
        return res.json(data.data)
    }, err => {
        return res.json(err)
    })
});

// 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
app.post('/api/logout', function (req, res) {
    delete res.clearCookie('adminToken');
    let response = {
        Success: true,
        Data: {},
        Msg: '退出成功！',
        Code: 200
    }
    res.json(response);
})

// 我们用这些选项初始化 Nuxt.js：
let config = require('./nuxt.config.js');
const isProd = process.env.NODE_ENV === 'production';

async function start() {
    const nuxt = new Nuxt(config);
    if (!isProd) {
        const builder = new Builder(nuxt);
        await builder.build();
    }
    app.use(nuxt.render);
    app.listen(8889);
    consola.ready({
        message: `Server listening on http://127.0.0.1:8889 \n request:${BaseUrl}`,
        badge: true
    })
}

start();
// 
// let data = [
//     {
//         "pK_PackingBillDetail": 0,
//         "pK_PackingBillMain": 106277,
//         "pK_PackageContainer": 13877,
//         "containerName": "0KD1208H",
//         "deviceNum": null,
//         "pK_Inventory": 150,
//         "invCode": "56008171",
//         "invName": "助力器",
//         "quantity": 7,
//         "containerCode": "1712006833",
//         "dock": null,
//         "uniqueCode": null,
//         "pK_Warehouse": null,
//         "scanContentFir": null,
//         "scanContentSec": null,
//         "osTransportId": 2
//     },
//     {
//         "pK_PackingBillDetail": 0,
//         "pK_PackingBillMain": 98392,
//         "pK_PackageContainer": 13583,
//         "containerName": "0KD1208H",
//         "deviceNum": null,
//         "pK_Inventory": 150,
//         "invCode": "56008171",
//         "invName": "助力器",
//         "quantity": 1,
//         "containerCode": "1712006539",
//         "dock": null,
//         "uniqueCode": null,
//         "pK_Warehouse": null,
//         "scanContentFir": null,
//         "scanContentSec": null,
//         "osTransportId": 2
//     }
// ]
// // invCode 零件编号, containerName 料箱型号
// function setData (arr) {
//     let obj = {}, dest = [];
//     if (arr instanceof Array) {
//         arr.forEach((ele, index) => {
//             if (index === 0) {
//                 dest.push(ele)
//             } else {
//                 let isP = true;
//                 dest.forEach((element, index) => {
//                     if (element.invCode === ele.invCode && element.containerName === ele.containerName) {
//                             element.quantity += ele.quantity;
//                         isP = false
//                     };
//                 })
//                 if (isP) {
//                     dest.push(ele);
//                 }
//             }
//         })
//         return dest;
//     }
// }