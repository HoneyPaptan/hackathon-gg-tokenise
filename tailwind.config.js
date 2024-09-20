/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-reg': ['sans-reg'],
        'sans-md': ['sans-md'],
        'sans-sb': ['sans-sb'],
        'cool': ['cool'],
      },
    },
  },
  plugins: [],
}
