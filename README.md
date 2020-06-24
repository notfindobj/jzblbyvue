# tribe

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

wangeditor 修改了源码，4564 行 onchangeTimeout = 200 || 3;   wangeditor.min.js 同步修改

/components # 公共组件
/layouts # 公共布局文件
/LocalAPI # 本地代理API
/middleware # 中间件 
/pages # 页面
/pages/components # 页面组件
/plugins # 公共插件
/plugins/untils # 公共方法
/plugins/my-theme # 主题颜色
/service # axios、接口 封装
/store  #store 模块化封装
/store/actions  #服务端接口封装
nuxt.config   #nuxt.config 全局配置
server   #本地代理服务