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
            title: 'pages.home.title',
            slug: '',
            icons: {
                gray: require('~/assets/img/ico-home-gray.svg'),
                white: require('~/assets/img/ico-home-white.svg'),
                turqy: require('~/assets/img/ico-home-turqy.svg')
            },
            seo: {
                title: 'pages.home.seo.title',
                description: 'pages.home.seo.description',
                keywords: 'pages.home.seo.keywords',
                og_image: 'pages.home.seo.og_image',
            }
        },
        /*{
            path: '/insights',
            config: {
                display: {
                    sidebar: true,
                    auth: true,
                    header: 'page'
                }
            },
            title: 'pages.insights.title',
            slug: 'pages.insights.slug',
            icons: {
                gray: require('~/assets/img/ico-home-gray.svg'),
                white: require('~/assets/img/ico-home-white.svg'),
                turqy: require('~/assets/img/ico-home-turqy.svg')
            },
            seo: {
                title: 'pages.insights.seo.title',
                description: 'pages.insights.seo.description',
                keywords: 'pages.insights.seo.keywords',
                og_image: 'pages.insights.seo.og_image',
            }
        },*/
        {
            path: '/assessments',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.assessments.title',
            slug: 'pages.assessments.slug',
            icons: {
                gray: require('~/assets/img/ico-assessments-gray.svg'),
                white: require('~/assets/img/ico-assessments-white.svg'),
                turqy: require('~/assets/img/ico-assessments-turqy.svg')
            },
            seo: {
                title: 'pages.assessments.seo.title',
                description: 'pages.assessments.seo.description',
                keywords: 'pages.assessments.seo.keywords',
                og_image: 'pages.assessments.seo.og_image',
            }
        },
        /*
            path: '/map',
            config: {
                display: {
                    sidebar: true,
                    auth: false,
                    header: 'page'
                }
            },
            title: 'pages.map.title',
            slug: 'pages.map.slug',
            icons: {
                gray: require('~/assets/img/ico-map-gray.svg'),
                white: require('~/assets/img/ico-map-white.svg'),
                turqy: require('~/assets/img/ico-map-turqy.svg')
            },
            seo: {
                title: 'pages.map.seo.title',
                description: 'pages.map.seo.description',
                keywords: 'pages.map.seo.keywords',
                og_image: 'pages.map.seo.og_image',
            }
        },*/
        {
            path: '/managed-areas',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.managed-areas.title',
            slug: 'pages.managed-areas.slug',
            icons: {
                gray: require('~/assets/img/ico-managed-areas-gray.svg'),
                white: require('~/assets/img/ico-managed-areas-white.svg'),
                turqy: require('~/assets/img/ico-managed-areas-turqy.svg')
            },
            seo: {
                title: 'pages.managed-areas.seo.title',
                description: 'pages.managed-areas.seo.description',
                keywords: 'pages.managed-areas.seo.keywords',
                og_image: 'pages.managed-areas.seo.og_image',
            }
        },
        {
            path: '/users-and-access',
            config: {
                display: {
                    sidebar: true,
                    auth: true,
                    header: 'page'
                }
            },
            title: 'pages.users-access.title',
            slug: 'pages.users-access.slug',
            icons: {
                gray: require('~/assets/img/ico-users-access-gray.svg'),
                white: require('~/assets/img/ico-users-access-white.svg'),
                turqy: require('~/assets/img/ico-users-access-turqy.svg')
            },
            seo: {
                title: 'pages.users-access.seo.title',
                description: 'pages.users-access.seo.description',
                keywords: 'pages.users-access.seo.keywords',
                og_image: 'pages.users-access.seo.og_image',
            }
        },
        {
            path: '/help-and-guides',
            config: {
                display: {
                    sidebar: true,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.help-guides.title',
            slug: 'pages.help-guides.slug',
            icons: {
                gray: false
            },
            seo: {
                title: 'pages.help-guides.seo.title',
                description: 'pages.help-guides.seo.description',
                keywords: 'pages.help-guides.seo.keywords',
                og_image: 'pages.help-guides.seo.og_image',
            }
        },
        {
            path: '/faq',
            config: {
                display: {
                    sidebar: false,
                    auth: null,
                    header: 'page'
                }
            },
            title: 'pages.faq.title',
            slug: 'pages.faq.slug',
            icons: {
                gray: false
            },
            seo: {
                title: 'pages.faq.seo.title',
                description: 'pages.faq.seo.description',
                keywords: 'pages.faq.seo.keywords',
                og_image: 'pages.faq.seo.og_image',
            }
        },
        {
            path: '/methodology',
            config: {
                display: {
                    sidebar: false,
                    header: 'page'
                }
            },
            title: 'pages.methodology.title',
            slug: 'pages.methodology.slug',
            icons: {
                gray: false
            },
            seo: {
                title: 'pages.methodology.seo.title',
                description: 'pages.methodology.seo.description',
                keywords: 'pages.methodology.seo.keywords',
                og_image: 'pages.methodology.seo.og_image',
            }
        }
    ],
});
