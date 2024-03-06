
const config= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      rubik: ['Rubik', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary": '#EFEDFF',
        "secondary":"#8186F1",
        "accent1": "#F9F7FF",
        "accent2": "#D2CFF3"
      },
    }
  }
};
export default config;
