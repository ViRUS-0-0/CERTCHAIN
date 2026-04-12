export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAF9",
        secondary: "#D6D3D1",
        cta: "#CA8A04",
        background: "#0C0A09",
        surface: "rgba(28, 25, 23, 0.7)", 
        border: "rgba(255, 255, 255, 0.1)",
        subtext: "#A8A29E",
      },
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
        heading: ['"Orbitron"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
    },
  },
  plugins: [],
}

