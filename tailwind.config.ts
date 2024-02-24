import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#6624FF",
        'primaryDark': "#4116A7",
        'white': "#FFFFFF",
        'whiteDark': "#E3E3E3",
        'secondary': "#01092E",
        'black': "#131313",
        'subtitle': '#B0B0B0',
        'gray': "#D9D9D9",
        'hoveredSidebarItems': '#212121',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'login': '350px minmax(0, 1fr)',
        'dashboard': '300px minmax(0, 1fr)'
      },
      gridTemplateRows: {
        'dashboard': '88px minmax(0, 1fr)'
      },
      borderRadius: {
        'ui': '10px'
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
