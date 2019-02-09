const ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
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
    'iview/dist/styles/iview.css',
    '~assets/font-face/iconfont.css',
    'swiper/dist/css/swiper.css',
    {src:'@/assets/commom.scss',lang: 'scss'}
  ],
  // 插件
  plugins: [
    { src: '~plugins/iview', ssr: true },
    { src: "~plugins/vue-swiper.js", ssr: false },
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/commom.js', ssr: true } // 全局组件、方法
  ],
  axios: {
    debug: process.env._ENV == "production" ? false : true,
    //设置不同环境的请求地址
    baseURL: process.env._ENV == "production" ? "http://localhost:3000/api" : "http://localhost:3000/api",
    withCredentials: true,
  },
  // 解决跨域
  axios: {
      prefix: '/api/',
      proxy: true // Can be also an object with default options
  },
  proxy:  [
      [
        '/api', 
        { 
          target: 'https://www.apiopen.top/', // api主机
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
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
    vendor:['iview'],
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
      }
      vendor:['iview']   //防止iview被打包多次
    },
    loaders:[
      {
        test:/\.scss$/,
        loader: ExtractTextPlugin.extract("style", 'css!sass')
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
    }
  }
}

