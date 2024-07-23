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
  },
};
