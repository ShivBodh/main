
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-alegreya)', 'serif'],
        headline: ['var(--font-alegreya)', 'serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--accent)/0.15), hsl(var(--primary)/0.05), hsl(var(--secondary)/0.15))',
      },
      colors: {
        'feature-blue': '#007BFF',
        'feature-pink': '#FF007F',
        'feature-green': '#7FFF00',
        'feature-orange': '#FFA500',
        'feature-purple': '#8A2BE2',
        'feature-cyan': '#00FFFF',
        'feature-yellow': '#FFD700',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          background: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'page-flip-out': {
          'from': { opacity: '1', transform: 'translateX(0) rotateY(0deg)' },
          'to': { opacity: '0', transform: 'translateX(-50%) rotateY(90deg)' },
        },
        'page-flip-in': {
          'from': { opacity: '0', transform: 'translateX(50%) rotateY(-90deg)' },
          'to': { opacity: '1', transform: 'translateX(0) rotateY(0deg)' },
        },
        'breath': {
            '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
            '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'autoscroll': {
          'to': { transform: 'translateX(calc(-50% - 1rem))' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'path-draw': {
          to: { width: '180px', opacity: '1' }
        },
        'symbol-appear': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '70%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'page-flip-out': 'page-flip-out 0.3s ease-in-out forwards',
        'page-flip-in': 'page-flip-in 0.3s ease-in-out forwards',
        'breath': 'breath 4s ease-in-out infinite',
        'autoscroll': 'autoscroll 60s linear infinite',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), 
    require('@tailwindcss/typography'), 
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
