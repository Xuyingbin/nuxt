const pkg = require('./package');
const webpack = require('webpack');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '主题风向标 - 主题投资，选股利器！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '主题风向标,以最及时的资讯为驱动,形成投资主题,挖掘龙头股票集合,结合资金面和主力动向,帮助投资者精确把握投资机会' },
      { hid: 'keywords', name: 'keywords', content: '主题风向标,ztfxb.com,主题投资,资讯,股票,板块,题材,产业链,主题库' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      
    ],
    

  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#d3bc8a' },

  /*
  ** Global CSS  
  */
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'font-awesome/css/font-awesome.min.css',
    '~/assets/css/index.css'
  ],
  build:{
    vendor: ['axios', 'echarts', 'jquery', 'bootstrap', 'font-awesomes', '~/assets/js/robots'],
    // publicPath: './'
    
    // plugins: [
    //   new webpack.ProvidePlugin({  
    //     '$': 'jquery'
        
    //   })
    // ],
    // loaders: [
    //   // {test: require.resolve('jquery'), loader: 'expose?$'}
    //   {
    //     test: require.resolve('jquery'),
    //     use: [
    //       {loader: 'expose-loader',options: '$'},
    //       {loader: 'expose-loader',options: 'jQuery'}
    //     ]
    //   }
    // ]
  },
  generate: {
    // routes: function () {
    //   return axios.get('http://39.107.14.227/stockDetails')
    //   .then((res) => {
    //     return res.data.map((user) => {
    //       return '/users/' + user.id
    //     })
    //   })      
    // }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    
    { src: '~/plugins/vue-echarts', ssr: 'false' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'http://39.107.14.227/',
      pathRewrite: { '^/api': '' }
    }
  },

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    middleware: ['router-guard']
  },

  

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    
    extend(config, ctx) {
      
    }
  }
}
