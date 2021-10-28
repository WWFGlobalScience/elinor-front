export default {
    ssr: false,
    loading: false,
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
        '@nuxtjs/composition-api/module',
        ['@nuxtjs/moment', {
            defaultLocale: 'en-gb',
            locales: ['en-gb', 'es']
        }]
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
        'nuxt-vue-multiselect',
        '@nuxtjs/google-gtag'
    ],
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'key',
                    type: 'Token',
                    maxAge: 31536000
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
            login: '/assessments',
            logout: '/',
            home: '/assessments'
        }
    },
    /*axios: {
        baseUrl: 'https://elinor-dev.eba-3jiy2caq.us-east-1.elasticbeanstalk.com/'
    },*/
    axios: {
        baseUrl: 'https://dev-api.elinordata.org/'
    },
    router: {
        middleware: ['auth'],
        extendRoutes(routes, resolve) {
            routes.push(
                {
                    name: 'sign-in-verification',
                    path: '/status/:status',
                    component: resolve(__dirname, 'pages/index.vue')
                }
            )
        }
    },
    build: {},
    'google-gtag': {
        id: 'G-51J4H4V6HK',
        config: {
            anonymize_ip: false,
            send_page_view: false
        },
        debug: false,
        disableAutoPageTrack: false
    }
}
