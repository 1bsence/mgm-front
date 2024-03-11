
const config= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary": "#ffffff",
      "secondary": "#000000",
      "common": "#FF5A5F",
      "colorful-accent": "#fca311",
      "chill-accent": "#14213d",
  },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      rubik: ['Rubik', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
          "primary": "#ffffff",
          "secondary": "#000000",
          "common": "#FF5A5F",
          "colorful-accent": "#fca311",
          "chill-accent": "#14213d",
      },
    }
  }
};
export default config;
