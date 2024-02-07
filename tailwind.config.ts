import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'darkBg':'#3c3c3c',
        'lightBg':'#eff0f2',
        'primary':'#f28c33',
        'secondary':'#283fc3',
      },
      spacing:{
        'default':'40px',
        'defaultMobile':'20px'
      },
    },
  },
  plugins: [],
};
export default config;
