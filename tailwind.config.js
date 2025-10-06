/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        frame: "#232C36",          // dark frame
        "glass-clear": "#89C0D9",  // light transparent
        "glass-frosted": "#556478",// frosted grey-blue
        "neutral-light": "#F9FAFB",// light neutral background
        "accent-teal": "#2DD4BF",  // accent color
      }
    },
  },
  plugins: [],
}