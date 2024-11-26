/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			kanit: ['Kanit', 'sans-serif'],
  			poppins: ['Poppins', 'sans-serif']
  		},
  		colors: {
  			primary: {
  				light: '#6D83F2',
  				DEFAULT: '#FFFFFF',
  				dark: '#2E3A91'
  			},
  			secondary: {
  				light: '#fafafa',
  				DEFAULT: '#222222',
  				dark: '#917E2E'
  			},
  			accent: '#FF5733',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		width: {
  			sidebar: '250px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
