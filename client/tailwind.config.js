import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#F3F6FF",
        secondary: "#4477CE",
        accent: "#3B0B75",
      },
    },
  },
  plugins: [forms({ strategy: "class" })],
};
