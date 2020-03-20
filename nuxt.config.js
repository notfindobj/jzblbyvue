const ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {configUrl} = require('./LocalEnv');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '建筑部落',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { "http-equiv": 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: '建筑部落' }
    ],
    link: [
        {rel: 'stylesheet', href: 'https://unpkg.com/swiper@5.2.1/css/swiper.min.css'}
    ],
    script: [
      { src: 'https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js' },
      // { src: 'https://unpkg.com/swiper/js/swiper.min.js' },
      { src: 'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.js' },
      { src: 'https://webapi.amap.com/maps?v=1.4.15&key=32fa7552c02016a5f6eefe2a3e062f87&plugin=AMap.Geocoder,AMap.CitySearch,AMap.Marker,AMap.Autocomplete,AMap.Pixel' },
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
    { src: '@/assets/commom.less', lang: 'less' }
    
  ],
  // 插件
  plugins: [
    { src: '~plugins/my-theme/index', ssr: true },
    { src: '~plugins/vMap', ssr: true },
    { src: "~plugins/iconfont.js", ssr: false },
    { src: '~/plugins/vue-lazyload.js', ssr: false },
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
    localUrl: configUrl.localUrl,
    imgBaseUrl: configUrl.imgBaseUrl,
    h5BaseUrl: configUrl.h5BaseUrl
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
  generate: {
    minify: {
      collapseWhitespace: false
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // 提取css到单独link文件
    extractCSS: { allChunks: true },
    transpile: [/^iview/],
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : { ie: '11' }
        return [
          [ require.resolve('@nuxt/babel-preset-app'), { targets } ]
        ]
      }
    },
    optimization: { // 配置代码压缩规则
      minimizer: [
        // webpack4 使用的压缩插件，用来替代webpack3的 UglifyJsPlugin
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true, // 可选：false,生产移除 console.log
              pure_funcs: ['console.log']
            },
            output: {
              // 是否保留代码注释
              comments: false
            },
            cache: true,
            parallel: true,
            // Must be set to true if using source-maps in production
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        })
      ],
      splitChunks: { // 代码打包分割规则
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          iview: {
            name: 'chunk-ui',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?iview(.*)/
          }
        }
      }
    },
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name][chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name][chunkhash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[name][contenthash].css'
    },
    vendor: ['iview', 'axios', 'video.js', 'Viewer'],
    // 开启打包分析
    // analyze: true,
    // assetFilter: function (assetFilter) {
    //   return assetFilter.endsWith('.js')
    // },
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

