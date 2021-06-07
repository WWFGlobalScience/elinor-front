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
        extend: {
            colors: {
                turqy: {
                    DEFAULT: '#359E98',
                    lighter: '#EDF6F6'
                },
                grayy: {
                    DEFAULT: '#585858',
                    lighter: '#9E9E9E',
                    border: '#E5E5E5',
                }
            },
            fontFamily: {
                'montserrat': [ 'Montserrat', 'sans-serif' ]
            }
        },
    },
    variants: {
        extend: {

        },
    },
    plugins: [

    ],
}
