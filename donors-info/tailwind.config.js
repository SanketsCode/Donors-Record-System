/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      maxWidth: {
        sm: "350px",
      },
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      sm: "300px",
      md: "600px",
      lg: "1440px",
      xl: "1280px",
      "2xl": "1536px",
      tablet: "1050px",
    },
    extend: {
      colors: {
        dominant: "#FFF",
        complement: "#e0e7ff",
        ascent: "#4338ca",
        "ascent-dark": "#312e81",
      },
    },
  },
  plugins: [],
};
