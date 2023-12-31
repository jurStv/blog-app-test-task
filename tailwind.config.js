/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
    purge: {
      enabled: process.env.NODE_ENV === 'production',
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class',
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography')
    ],
}

