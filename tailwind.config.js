/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // This tells Tailwind to scan your Vue files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
