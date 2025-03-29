/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Inter_Regular",
          "Inter_Light",
          "Inter_Medium",
          "Inter_SemiBold",
          "Inter_Bold",
          "Inter_ExtraBold",
          "Inter_Black",
        ],
      },
      colors: {
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
