export default {
  ssr: false,
  components: true,
  target: 'static',
  head: {
    title: 'Elinor',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  css: ['~/assets/scss/app.scss'],
  plugins: [
    "~/plugins/vue-tippy.js",
    "~/plugins/vue-select.js",
    "~/plugins/formDataStringify.js",
    "~/plugins/vue-date-picker.js",
    {
      src: "~/plugins/choices.js",
      mode: "client"
    }
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module'
  ],
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      baseUrl: 'https://my-nuxt-app.com',
      strategy: 'prefix_except_default',
      defaultLocale: 'en',
      fallbackLocale: 'en',
      lazy: true,
      langDir: 'locales/',
      seo: true,
      detectBrowserLanguage: false,
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          file: 'en-US.json'
        }
      ]
    }],
    [
      'vue-scrollto/nuxt',
      // Or if you have custom options...
      ['vue-scrollto/nuxt', {
        duration: 500,
        offset: -70
      }],
    ],
    'nuxt-vue-multiselect'

  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'key',
          type: 'Token'
        },
        user: {
          autoFetch: true,
          property: false
        },
        endpoints: {
          login: {
            url: 'rest-auth/login/',
            method: 'post',
          },
          logout: {
            url: 'rest-auth/logout/',
            method: 'post'
          },
          user: {
            url: 'rest-auth/user/',
            method: 'get'
          },
        },
      },
    },
    redirect: {
      login: '/sign-in',
      logout: '/',
      home: '/'
    }
  },
  axios: {
    baseUrl: 'http://127.0.0.1:8081/'
  },
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'sign-in-verification',
          path: '/sign-in/:verification',
          component: resolve(__dirname, 'pages/sign-in/index.vue')
        }
      )
    }
  },
  build: {}
}
