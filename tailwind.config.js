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
