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
            path: '/collaboration',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.collaboration.home.meta.title',
            slug: 'pages.collaboration.home.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-documentation-gray.svg'),
                white: require('~/assets/img/ico-documentation-white.svg'),
                turqy: require('~/assets/img/ico-documentation-turqy.svg')
            },
            seo: {
                title: 'pages.collaboration.meta,seo.title',
                description: 'pages.collaboration.meta.seo.description',
                keywords: 'pages.collaboration.meta.seo.keywords',
                og_image: 'pages.collaboration.meta.seo.og_image',
            }
        },
        {
            path: '/news',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.news.home.meta.title',
            slug: 'pages.news.home.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-news-gray.svg'),
                white: require('~/assets/img/ico-news-white.svg'),
                turqy: require('~/assets/img/ico-news-turqy.svg')
            },
            seo: {
                title: 'pages.news.meta,seo.title',
                description: 'pages.news.meta.seo.description',
                keywords: 'pages.news.meta.seo.keywords',
                og_image: 'pages.news.meta.seo.og_image',
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
        },
        {
            path: '/contact',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.contact.home.meta.title',
            slug: 'pages.contact.home.meta.slug',
            icons: {
                gray: require('~/assets/img/ico-documentation-gray.svg'),
                white: require('~/assets/img/ico-documentation-white.svg'),
                turqy: require('~/assets/img/ico-documentation-turqy.svg')
            },
            seo: {
                title: 'pages.contact.meta,seo.title',
                description: 'pages.contact.meta.seo.description',
                keywords: 'pages.contact.meta.seo.keywords',
                og_image: 'pages.contact.meta.seo.og_image',
            }
        },
    ],
});
