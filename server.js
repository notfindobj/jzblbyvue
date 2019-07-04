const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = require('express')()
const axios = require('axios')
const qs = require('qs')
// Body parser，用来封装 req.body
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
axios.defaults.withCredentials = true;
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