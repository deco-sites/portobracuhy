import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      slab: ["Roboto Slab", "serif"],
      icomoon: ["icomoon", "Roboto", "sans-serif"],
    },
    extend: {
      animation: {
        "pulse-back": "pulse-back 1.5s infinite",
      },
      keyframes: {
        "pulse-back": {
          "0%": {
            transform: "scale(0.9)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.9)",
          },
        },
      },
    },
  },
};
