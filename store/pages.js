export const state = () => ({
    list: [
        {
            path: '/',
            config: {
                display: {
                    sidebar: false,
                    auth: null,
                    header: 'home'
                }
            },
            title: 'pages.home.meta.title',
            slug: 'pages.home.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-home-gray.svg'),
                white: require('~/assets/img/ico-home-white.svg'),
                turqy: require('~/assets/img/ico-home-turqy.svg')
            },
            seo: {
                title: 'pages.home.meta.seo.title',
                description: 'pages.home.meta.seo.description',
                keywords: 'pages.home.meta.seo.keywords',
                og_image: 'pages.home.meta.seo.og_image',
            }
        },
        {
            path: '/assessments',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.assessments.meta.title',
            slug: 'pages.assessments.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-assessments-gray.svg'),
                white: require('~/assets/img/ico-assessments-white.svg'),
                turqy: require('~/assets/img/ico-assessments-turqy.svg')
            },
            seo: {
                title: 'pages.assessments.meta,seo.title',
                description: 'pages.assessments.meta.seo.description',
                keywords: 'pages.assessments.meta.seo.keywords',
                og_image: 'pages.assessments.meta.seo.og_image',
            }
        },
        {
            path: '/documentation',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.documentation.home.meta.title',
            slug: 'pages.documentation.home.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-documentation-gray.svg'),
                white: require('~/assets/img/ico-documentation-white.svg'),
                turqy: require('~/assets/img/ico-documentation-turqy.svg')
            },
            seo: {
                title: 'pages.documentation.meta,seo.title',
                description: 'pages.documentation.meta.seo.description',
                keywords: 'pages.documentation.meta.seo.keywords',
                og_image: 'pages.documentation.meta.seo.og_image',
            }
        }
    ],
});
