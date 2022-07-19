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
            '3xl': { 'max': '1680px' },
            '2xl': { 'max': '1366px' },
            'xl': { 'max': '1280px' },
            'lg': { 'max': '1024px' },
            'md': { 'max': '768px' },
            'sm': { 'max': '640px' },
            'xs': { 'max': '375px' },
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
                    DEFAULT: '#43A0BD',
                    lighter: '#EDF4F6',
                    middle:  '#BDDADE',
                    darker: '#3A90AB',
                    border: '#43A0BD',
                },
                yellowy:{
                    DEFAULT:'#F2994A',
                    lighter:'#EABA5C'
                },
                grayy: {
                    DEFAULT: '#585858',
                    lighter: '#9E9E9E',
                    border: '#E5E5E5',
                    badge: 'rgba(0, 0, 0, .02)'
                },
                redy: {
                    DEFAULT: '#F37871',
                    lighter:'#EA5C65'
                },
                bluy:{
                    DEFAULT:'#5CD0EA'
                }
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif']
            },
            height:{
                '2px':'2px'
            },
            width: {
                '3xl': '1680px',
                '2xl': '1366px',
                'xl': '1280px',
                'lg': '1024px',
                'md': '768px',
                'sm': '640px',
                'xs': '375px',
                '2px': '2px',
                '90' : '90vw'
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
            maxHeight:{
                '75screen' : '75vh'
            },
            fontSize: {
                'small': '0.625rem',
                'medium': '1.375rem',
                'huge':'2.5rem',
            },
            borderRadius:{
                'huge': '1.25rem'
            }
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
                '.center-h': {
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
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
                '.border-radius--btn-small': {
                    borderRadius: '12px'
                },
                '.border-radius--card': {
                    borderRadius: '12px'
                },
            }
            addUtilities(customUtilities)
        })
    ],
}
