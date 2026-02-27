/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "../../packages/ui-native/src/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
