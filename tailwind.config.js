
const config= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "background":"#113C55",
      "foreground":"#7CB4B8",
      "text":{
        "normal": "#F7F7F7",
        "secondary": "#A3A3A3",
        "darken": "#113C55",
      },
      "button":{
        "normal": "#70F8BA",
        "hover": "F9C80E",
      },
      "glow":{
        "type1": "#70F8BA",
        "type2": "#F9C80E",
        "type3": "#F86624",
      }

  },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      rubik: ['Rubik', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      Ubuntu: ["Ubuntu", 'sans-serif'],
    },
    extend: {
    }
  }
};
export default config;
