import fetch from 'node-fetch';
import * as fs from 'fs';
import webpack from 'webpack';

export default async () => {
    const locales = [];
    const langDir = 'locales/';
    const response = await fetch(
        'https://api.elinordata.org/v2/activelanguages/',
    );
    const apiLocales = await response.json();

    apiLocales.results.forEach((locale) => {
        if (locale.active) {
            let file = `${locale.code}/translations.json`;
            if (!fs.existsSync(langDir + file)) {
                file = 'en/translations.json';
            }

            locales.push({
                code: locale.code,
                name: locale.name,
                file,
            });
        }
    });

    return {
        ignore: ['**/*._*'],
        ssr: false,
        loading: false,
        components: true,
        target: 'static',
        head: {
            title: 'Elinor',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { hid: 'description', name: 'description', content: '' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            script: [
                {
                    src: '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-image/v0.0.4/leaflet-image.js',
                },
            ],
        },
        css: ['~/assets/scss/app.scss'],
        plugins: [
            '~/plugins/vue-tippy.js',
            '~/plugins/vue-select.js',
            '~/plugins/formDataStringify.js',
            '~/plugins/vue-date-picker.js',
            '~/plugins/scoreColors.js',
            {
                src: '~/plugins/choices.js',
                mode: 'client',
            },
            { src: '~/plugins/vuex-persist', ssr: false },
            '~/plugins/axios.js',
        ],
        buildModules: [
            '@nuxtjs/tailwindcss',
            '@nuxtjs/composition-api/module',
            '@nuxtjs/pwa',
            [
                '@nuxtjs/moment',
                {
                    defaultLocale: 'en-gb',
                    locales: ['en-gb', 'es'],
                },
            ],
        ],
        modules: [
            '@nuxtjs/auth-next',
            '@nuxtjs/axios',
            [
                'nuxt-i18n',
                {
                    strategy: 'no_prefix',
                    defaultLocale: 'en',
                    fallbackLocale: 'en',
                    lazy: true,
                    langDir: 'locales/',
                    seo: true,
                    detectBrowserLanguage: {
                        alwaysRedirect: true,
                    },
                    locales,
                },
            ],
            'vue-scrollto/nuxt',
            'nuxt-vue-multiselect',
            '@nuxtjs/google-gtag',
            '@nuxtjs/recaptcha',
            '@nuxtjs/toast',
        ],
        auth: {
            strategies: {
                local: {
                    token: {
                        property: 'key',
                        type: 'Token',
                        maxAge: 31536000,
                    },
                    user: {
                        autoFetch: true,
                        property: false,
                    },
                    endpoints: {
                        login: {
                            url: 'rest-auth/login/',
                            method: 'post',
                        },
                        logout: {
                            url: 'rest-auth/logout/',
                            method: 'post',
                        },
                        user: {
                            url: 'rest-auth/user/',
                            method: 'get',
                        },
                    },
                },
            },
            redirect: {
                login: '/assessments',
                logout: '/',
                home: '/assessments',
            },
        },
        axios: {
            // baseUrl: 'http://localhost:8082/',
            // baseUrl: 'https://dev-api.elinordata.org/',
            proxyHeaders: false,
            credentials: false,
            baseUrl: 'https://api.elinordata.org/',
        },
        router: {
            middleware: ['auth', 'onload'],
            extendRoutes(routes, resolve) {
                routes.push({
                    name: 'sign-in-verification',
                    path: '/status/:status',
                    component: resolve(__dirname, 'pages/index.vue'),
                });
            },
        },
        build: {
            extend(config, ctx) {
                if (ctx.isDev) {
                    config.devtool = ctx.isClient
                        ? 'source-map'
                        : 'inline-source-map';
                }

                if (ctx.isClient) {
                    config.output.filename = 'app.js';
                    config.output.chunkFilename = '[id].js';
                    config.optimization.splitChunks.cacheGroups.default = false;
                    config.optimization.runtimeChunk = false;
                }
            },
            plugins: [
                new webpack.optimize.LimitChunkCountPlugin({
                    maxChunks: 1,
                }),
            ],
        },
        'google-gtag': {
            id: 'G-51J4H4V6HK',
            config: {
                anonymize_ip: false,
                send_page_view: false,
            },
            debug: false,
            disableAutoPageTrack: false,
        },
        publicRuntimeConfig: {
            recaptcha: {
                siteKey: '6LezqLQgAAAAAPYyaUpHoZfIIMCLyQhqs_4dSfUj',
                version: 3,
            },
        },
        vue: {
            config: {
                devtools: true,
                configureWebpack: {
                    externals: {
                        canvg: 'canvg',
                        html2canvas: 'html2canvas',
                        dompurify: 'dompurify',
                    },
                },
            },
        },
        pwa: {
            icon: {},
            manifest: {
                name: 'Elinor',
            },
            workbox: {
                //offline: true,
                enabled: true,
                // dev: process.env.NODE_ENV === 'development',
                // cachingExtensions: '@/plugins/workbox-sync.js', // Opcional, si necesitas manejar sincronización offline
                // cacheAssets: true,
                offlineStrategy: 'CacheFirst',
            },
        },
        toast: {
            theme: 'bubble',
            position: 'bottom-right',
            duration: 7000,
        },
    };
};
