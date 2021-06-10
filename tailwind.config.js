const plugin = require('tailwindcss/plugin')

module.exports = {
    mode: 'jit',
    purge: {
        content: [
            `components/**/*.{vue,js}`,
            `layouts/**/*.vue`,
            `pages/**/*.vue`,
            `plugins/**/*.{js,ts}`,
            `nuxt.config.{js,ts}`
        ]
    },
    darkMode: false,
    theme: {
        screens: {
            '3xl': {'max': '1680px'},
            '2xl': {'max': '1366px'},
            'xl': {'max': '1280px'},
            'lg': {'max': '1024px'},
            'md': {'max': '768px'},
            'sm': {'max': '640px'},
            'xs': {'max': '375px'},
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                turqy: {
                    DEFAULT: '#359E98',
                    lighter: '#EDF6F6',
                    darker: '#2E8D88'
                },
                grayy: {
                    DEFAULT: '#585858',
                    lighter: '#9E9E9E',
                    border: '#E5E5E5',
                    badge: 'rgba(0, 0, 0, .02)'
                },
                redy: {
                    DEFAULT: '#F37871'
                }
            },
            fontFamily: {
                'montserrat': [ 'Montserrat', 'sans-serif' ]
            },
            width: {
                '3xl': '1680px',
                '2xl': '1366px',
                'xl': '1280px',
                'lg': '1024px',
                'md': '768px',
                'sm': '640px',
                'xs': '375px',
            },
            maxWidth: {
                '3xl': '1680px',
                '2xl': '1366px',
                'xl': '1280px',
                'lg': '1024px',
                'md': '768px',
                'sm': '640px',
                'xs': '375px',
            },
        },
    },
    variants: {
        extend: {

        },
    },
    plugins: [
        plugin(function ({ addUtilities, theme }) {
            const customUtilities = {
              '.center-v': {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)'
              },
              '.center-both': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              },
              '.border-radius--50': {
                borderRadius: '50%'
              },
              '.border-radius--40': {
                borderRadius: '40px'
              },
              '.border-radius--20': {
                borderRadius: '20px'
              },
            }
            addUtilities( customUtilities )
        })
    ],
}
  