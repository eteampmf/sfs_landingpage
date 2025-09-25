/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        primary: "#52ABCC",     // bleu clair - CTA, liens
        secondary: "#495A6E",   // bleu-gris - headers, encadrés
        accent: "#1D252C",      // foncé - textes, footer
        neutral: "#48596D",     // gris bleuté - textes secondaires
        background: "#FFFFFF",  // blanc - fonds principaux
        lightbg: "#F6F8FA",     // gris très clair - alternance sections
      }
    },
  },
  plugins: [],
}