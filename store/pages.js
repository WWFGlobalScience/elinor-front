export const state = () => ({
  list: [
    {
      path: '/',
      config: {
        display: {
          sidebar: false,
          auth: null,
          header: 'home',
        },
      },
      title: 'pages.home.meta.title',
      slug: 'pages.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-home-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-home-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-home-turqy.svg'),
      },
      seo: {
        title: 'pages.home.meta.seo.title',
        description: 'pages.home.meta.seo.description',
        keywords: 'pages.home.meta.seo.keywords',
        og_image: 'pages.home.meta.seo.og_image',
      },
    },
    {
      path: '/assessments',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.assessments.meta.title',
      offlineTitle: 'pages.assessments.meta.offlineTitle',
      slug: 'pages.assessments.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-assessments-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-assessments-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-assessments-turqy.svg'),
      },
      seo: {
        title: 'pages.assessments.meta.seo.title',
        description: 'pages.assessments.meta.seo.description',
        keywords: 'pages.assessments.meta.seo.keywords',
        og_image: 'pages.assessments.meta.seo.og_image',
      },
      children: [
        {
          path: '/methodology',
          config: {
            display: {
              sidebar: true,
              auth: null,
              header: 'page',
            },
          },
          title: 'pages.methodologyPage.home.meta.title',
          slug: 'pages.methodologyPage.home.meta.slug',
          icons: {
            gray: require('~/assets/img/nav-icons/ico-methodology-gray.svg'),
            white: require('~/assets/img/nav-icons/ico-methodology-white.svg'),
            turqy: require('~/assets/img/nav-icons/ico-methodology-turqy.svg'),
          },
          seo: {
            title: 'pages.methodologyPage.home.meta.seo.title',
            description: 'pages.methodologyPage.home.meta.seo.description',
            keywords: 'pages.methodologyPage.home.meta.seo.keywords',
            og_image: 'pages.methodologyPage.home.meta.seo.og_image',
          },
        },
        {
          path: '/collaboration',
          config: {
            display: {
              sidebar: true,
              auth: null,
              header: 'page',
            },
          },
          title: 'pages.collaboration.home.meta.title',
          slug: 'pages.collaboration.home.meta.slug',
          icons: {
            gray: require('~/assets/img/nav-icons/ico-collaboration-gray.svg'),
            white: require('~/assets/img/nav-icons/ico-collaboration-white.svg'),
            turqy: require('~/assets/img/nav-icons/ico-collaboration-turqy.svg'),
          },
          seo: {
            title: 'pages.collaboration.meta.seo.title',
            description: 'pages.collaboration.meta.seo.description',
            keywords: 'pages.collaboration.meta.seo.keywords',
            og_image: 'pages.collaboration.meta.seo.og_image',
          },
        },
      ],
    },
    {
      path: '/background',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.about.meta.title',
      slug: 'pages.about.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-background-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-background-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-background-turqy.svg'),
      },
      seo: {
        title: 'pages.about.meta.seo.title',
        description: 'pages.about.meta.seo.description',
        keywords: 'pages.about.meta.seo.keywords',
        og_image: 'pages.about.meta.seo.og_image',
      },
    },
    {
      path: '/map',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.map.home.meta.title',
      slug: 'pages.map.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-map-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-map-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-map-turqy.svg'),
      },
      seo: {
        title: 'pages.map.meta.seo.title',
        description: 'pages.map.meta.seo.description',
        keywords: 'pages.map.meta.seo.keywords',
        og_image: 'pages.map.meta.seo.og_image',
      },
    },
    {
      path: '/news',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.news.home.meta.title',
      slug: 'pages.news.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-news-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-news-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-news-turqy.svg'),
      },
      seo: {
        title: 'pages.news.meta.seo.title',
        description: 'pages.news.meta.seo.description',
        keywords: 'pages.news.meta.seo.keywords',
        og_image: 'pages.news.meta.seo.og_image',
      },
    },
    {
      path: '/documentation',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.documentation.home.meta.title',
      slug: 'pages.documentation.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-documentation-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-documentation-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-documentation-turqy.svg'),
      },
      seo: {
        title: 'pages.documentation.meta.seo.title',
        description: 'pages.documentation.meta.seo.description',
        keywords: 'pages.documentation.meta.seo.keywords',
        og_image: 'pages.documentation.meta.seo.og_image',
      },
    },
    {
      path: '/faq',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.faqs.home.meta.title',
      slug: 'pages.faqs.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-faq-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-faq-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-faq-turqy.svg'),
      },
      seo: {
        title: 'pages.faqs.meta.seo.title',
        description: 'pages.faqs.meta.seo.description',
        keywords: 'pages.faqs.meta.seo.keywords',
        og_image: 'pages.faqs.meta.seo.og_image',
      },
    },
    {
      path: '/contact',
      config: {
        display: {
          sidebar: true,
          auth: null,
          header: 'page',
        },
      },
      title: 'pages.contact.home.meta.title',
      slug: 'pages.contact.home.meta.slug',
      icons: {
        gray: require('~/assets/img/nav-icons/ico-contact-gray.svg'),
        white: require('~/assets/img/nav-icons/ico-contact-white.svg'),
        turqy: require('~/assets/img/nav-icons/ico-contact-turqy.svg'),
      },
      seo: {
        title: 'pages.contact.meta.seo.title',
        description: 'pages.contact.meta.seo.description',
        keywords: 'pages.contact.meta.seo.keywords',
        og_image: 'pages.contact.meta.seo.og_image',
      },
    },
  ],
});
