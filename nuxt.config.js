const ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const webpack=require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '建筑部落',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '建筑部落' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
     
    ]
  },
  // 插件依赖
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  // 公共CSS
  css: [
    '~assets/font-face/iconfont.css',
    'swiper/dist/css/swiper.css',
    {src:'@/assets/commom.less',lang: 'less'}
  ],
  // 插件
  plugins: [
    { src: '~plugins/my-theme/index', ssr: true },
    { src: "~plugins/vue-swiper.js", ssr: false },
    { src: "~plugins/v-viewer.js", ssr: true }, // 看图插件
    { src: '~/plugins/commom.js', ssr: true } // 全局组件、方法
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://www.api.jzbl.com/api/',
    withCredentials: true,
    locURL: '127.0.0.1:8889'
  },
  // 解决跨域
  axios: {
    debug: process.env._ENV == "production" ? false : true,
    //设置不同环境的请求地址
    baseURL: process.env._ENV == "production" ? "http://www.api.jzbl.com/api/" : "http://www.jzbl.com/api/",
    withCredentials: true,
  },
  proxy:  [
      [
        '/api', 
        { 
          target: 'http://www.api.jzbl.com/api/', // api主机
          withCredentials: true,
          changeOrigin: true,
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FF3C00' },
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: { allChunks: true },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    vendor:['iview', 'axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.resolve.extensions.push('.less')
      }
      vendor:['iview']   //防止iview被打包多次
    },
    loaders:[
      {
        test:/\.less$/,
        loader: ExtractTextPlugin.extract("style", 'css!less')
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KB
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ]
  }
}

