const {nextui} = require("@nextui-org/react");
const config= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "bgbackground":"#113C55",
      "bgforeground":"#7CB4B8",
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
  },
  plugins: [nextui()],
};
export default config;
