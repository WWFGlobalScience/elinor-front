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
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: ['~/assets/scss/app.scss'],
    plugins: [
        "~/plugins/vue-tippy.js"
    ],
    components: true,
    buildModules: [
        '@nuxtjs/tailwindcss',
    ],    
    modules: [
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
        }]
    ],
    axios: {},
    build: {
    }
}
