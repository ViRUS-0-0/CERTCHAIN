export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#18181B",
        secondary: "#3F3F46",
        cta: "#2563EB",
        background: "#FAFAFA",
        surface: "rgba(255, 255, 255, 0.65)", // Glass surface
        border: "rgba(228, 228, 231, 0.4)",  // Glass border
        subtext: "#71717A",
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      }
    },
  },
  plugins: [],
}
