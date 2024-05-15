const options = require("./config"); //options from config.js

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: "class",
  theme: {
    colors: {
      "primary": "#6A8BFF",
      "primary-light": "#f1f4ff",
      "blue-gray": "#455A64",
      "light-gray": "#F0F2F4",
      "dark-gray": "#00000080",
      "dark": "#151F2B",
      "dark-light": "#00000099",
      "danger": "#FE4845",
      "success": "#39CD3F",
      yellow: "#FFCA7C",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "480px",
      sm: "600px",
      md: "900px",
      lg: "1023px",
      xl: "1200px",
      "2xl": "1440px",
    },
    container: {
      // TODO: Check container width and maybe set it like that
      screens: {
        xl: '100%',
        // "2xl": "1440px",
      },
    },
  },
  plugins: plugins,
};
