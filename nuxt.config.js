const ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const webpack = require('webpack');
const {configUrl} = require('./LocalEnv');
console.log('configUrl', configUrl.serverPort)
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js' },
      { src: 'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.js' },
      { src: 'https://static.runoob.com/assets/qrcode/qrcode.min.js' },
    ],
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
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    { src: '@/assets/commom.less', lang: 'less' }
  ],
  // 插件
  plugins: [
    { src: '~plugins/my-theme/index', ssr: true },
    { src: "~plugins/vue-swiper.js", ssr: false },
    // { src: "~plugins/jquery.lazyload.min.js", ssr: false },
    { src: '~/plugins/vue-quill-editor', ssr: false },
    { src: '~/plugins/commom.js', ssr: true } // 全局组件、方法
  ],
  server: {
    port: configUrl.serverPort, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    baseUrl: configUrl.baseUrl,
    fileBaseUrl: configUrl.fileBaseUrl,
  },
  proxyTable: [
      '/api',
      {
        target: 'http://106.14.139.124:8099/', // api主机
        // withCredentials: true,
        // changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FF3C00' },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : { ie: '11' }
        return [
          [ require.resolve('@nuxt/babel-preset-app'), { targets } ]
        ]
      }
    },
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
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name][chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name][chunkhash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[name][contenthash].css'
    },
    vendor: ['iview', 'axios'],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
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
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", 'css!less')
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
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
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     '$': 'jQuery'
    //   })
    // ]
  }
}

