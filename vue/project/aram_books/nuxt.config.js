const webpack = require('webpack')

// export default -> module.export 로 변경
module.exports = {
  mode: 'spa',
  // mode: 'universal',
  srcDir: 'client',
  /*
   ** Headers of the page
   */
  head: {
    title: '아람북스',
    meta: [
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        name: 'viewport',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicons/favicon.ico',
        type: 'image/x-icon',
      },

      // Works in Chrome, Safari, IE
      {
        rel: 'icon',
        href: '/favicons/favicon.ico',
        type: 'image/x-icon',
      },

      // Default Sizes
      {
        rel: 'icon',
        href: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      // {
      //   rel: 'icon',
      //   href: '/favicons/favicon-32x32.png',
      //   sizes: '32x32',
      //   type: 'image/png'
      // },
      // {
      //   rel: 'icon',
      //   href: '/favicons/favicon-96x96.png',
      //   sizes: '96x96',
      //   type: 'image/png'
      // },

      // Apple Devies
      {
        rel: 'apple-touch-icon',
        href: '/favicons/favicon-16x16',
        type: 'image/png',
      },

      // {
      //   rel: 'apple-touch-icon-precomposed',
      //   href: '/favicons/apple-icon-precomposed.png',
      //   type: 'image/png'
      // }
    ],
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.findIndex%2CArray.from%2CArray.prototype.entries%2CObject.entries',
        body: true,
      },
      {
        src:
          'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30ee230f5f25a396d9a530cbd555229e&libraries=services,clusterer',
        body: true,
      },
      {
        src: '/js/jquery-2.2.4.min.js',
        body: true,
      },
      // {
      //   src: '/js/d3.v3.min.js',
      //   body: true,
      // },
      // {
      //   src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js',
      //   body: true
      // }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~assets/css/reset.scss', lang: 'scss' },
    { src: '~assets/css/index.scss', lang: 'scss' },
    { src: '~assets/css/plugin/swiper.css', lang: 'css' }, // VueAwesomeSwiper CSS
  ],
  /*
   ** Style-resources module configuration, 필요한 scss파일에 import해서 사용.
   */
  styleResources: {
    scss: [],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: '~/plugins/vue-fontawesome.js', ssr: true },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/tui-grid', ssr: false },
    { src: '~/plugins/tui-editor', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: false },
    // { src: '~/plugins/google-oauth2', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    // { src: '~/plugins/vue-daum-postcode', ssr: false },
    // { src: '~/plugins/vue-core-video-player.js', ssr: false },
    // { src: '~/plugins/vue-masonry.js', ssr: false }
  ],
  /*
   ** Auth module configuration
   */
  router: {
    middleware: ['auth', 'route-info'],
  },
  auth: {
    redirect: {
      login: false,
      logout: false,
      home: false,
    },
    strategies: {
      local: {
        tokenType: 'Bearer',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'result.userToken',
          },
          logout: false,
          user: false,
        },
      },
    },
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '@nuxtjs/sentry',
    // '@nuxtjs/google-analytics',
    // '@nuxtjs/style-resources',
    // '@nuxtjs/moment',
    // 'nuxt-mq',
    // "nuxt-purgecss"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: process.env.API_URL || 'https://api.arambookclub.com'
    baseURL: process.env.API_URL || 'https://dev-api.arambookclub.com',
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    vendor: ['jspdf'],
    plugins: [new webpack.ProvidePlugin({})],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
      if (ctx.isDev) {
        // eslint-disable-next-line no-param-reassign
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
