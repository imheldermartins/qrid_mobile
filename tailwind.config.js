/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fcfcea",
          100: "#f6f8c9",
          200: "#f3f395",
          300: "#eae54d",
          400: "#e4d72b",
          500: "#d4bf1e",
          600: "#b79717",
          700: "#926f16",
          800: "#79581a",
          900: "#68491b",
          950: "#3c270c",
        },
        light: {
          100: "#F7F7F7",
          200: "#F0F0F0",
          300: "#D7D7D7",
          400: "#D0D0D0",
          500: "#C7C7C7",
          600: "#C0C0C0",
          700: "#B7B7B7",
          800: "#B0B0B0",
          900: "#A7A7A7",
        },
        dark: {
          100: "#606060",
          200: "#575757",
          300: "#505050",
          400: "#474747",
          500: "#404040",
          600: "#373737",
          700: "#303030",
          800: "#272727",
          900: "#202020",
        },
      },
    },
  },
  plugins: [],
};
