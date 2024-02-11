/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        screens: {
            'x-sm': '380px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontSize: {
                '10xl': '10rem',
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                'primary': '#FF4000',
                'primaryDark': '#FF0000',
                'secondary': '#000080',
                'secondaryDark': '#000042'
            },
            boxShadow: {
                'around': '0px 0px 5px 1px rgb(0, 0, 0, 0.5)'
            }
        },
    },
    darkMode: 'class',
    // My custom classes
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.btn': {

                },
                '.btn-primary': {
                    backgroundColor: theme('colors.primary'),

                    '&:hover': {
                        backgroundColor: theme('colors.primaryDark')
                    },
                },
                '.btn-secondary': {
                    backgroundColor: theme('colors.secondary'),

                    '&:hover': {
                        backgroundColor: theme('colors.secondaryDark'),
                    },
                },
                '.def-icon': {

                }
            })
        }),
    ],
}