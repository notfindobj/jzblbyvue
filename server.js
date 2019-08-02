const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = require('express')()
const session = require('express-session');
const axios = require('axios')
const qs = require('qs')

// Body parser，用来封装 req.body
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

axios.defaults.withCredentials = true;
//  session 存储数据
 
app.use(session({
  secret: 'demo_test',
  name: 'mydemo',                         //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {  maxAge: 30 * 60 * 1000 },    //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
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
  } catch (error) {
    response.Msg = '存储失败'
    response.Code= 400
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
app.use('/user/setUserInfo', function(req, res) {
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
  consola.log(response.Data);
  return res.json(response);
})

// 通过手机号码登录 POST /api/
app.post('/front/mobileLogin', function (req, res) {
  let config = {
    url: `http://www.api.jzbl.com/api/Account/CheckLogin`,
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
app.post('/front/wxLogin', function(req, res) {
  let config = {
    url: `http://www.api.jzbl.com/api/Account/wx`,
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
app.post('/front/qqLogin', function(req, res) {
  let config = {
    url: `http://www.api.jzbl.com/api/Account/qq`,
    withCredentials: true,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
const isProd =  process.env.NODE_ENV === 'production';
async function start() {
  const nuxt = new Nuxt(config);
  if (!isProd) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  app.use(nuxt.render);
  app.listen(8889);
  consola.ready({
    message: `Server listening on http://127.0.0.1:8889`,
    badge: true
  })
}
start();
