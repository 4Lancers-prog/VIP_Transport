/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* --- Light surfaces (white) --- */
        canvas: '#FFFFFF', // white page background
        cream: '#F8F5EC', // warm off-white for alternating bands
        panel: '#FBF8EF', // card / panel surface (warm light)
        line: '#E8E1CF', // hairline borders on light surfaces

        /* --- Text --- */
        ink: '#1A1711', // primary near-black text
        graphite: '#6F685A', // muted secondary text

        /* --- Deep bands (hero + footer stay dark) --- */
        night: '#14120C',
        charcoal: '#1B1810',
        warm: '#F7F3E9', // near-white text on dark bands
        steel: '#A79F8C', // muted text on dark bands

        /* --- Brand: GOLD --- */
        brand: {
          DEFAULT: '#C19A33', // gold — fills, rules, 3D accent
          light: '#DDBB55', // highlight / hover
          deep: '#8A6A12', // dark gold — accent text on white (readable)
          dim: '#6B520E', // darker gold for subtle strokes
        },
      },
      fontFamily: {
        display: ['"Archivo"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        shell: '1440px',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: '1' },
          '45%': { opacity: '0.72' },
          '55%': { opacity: '0.9' },
        },
        scrolldot: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        /* Infinite horizontal logo marquee — moves exactly one track width,
           so with a duplicated track the loop is perfectly seamless. */
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowpulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(57,255,20,0.0)' },
          '50%': { boxShadow: '0 0 24px 2px rgba(57,255,20,0.45)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-6%,0) scale(1.12)' },
        },
        gridpan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '64px 64px' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        glowpulse: 'glowpulse 2.8s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        gridpan: 'gridpan 6s linear infinite',
        sheen: 'sheen 1.1s cubic-bezier(0.16,1,0.3,1)',
        flicker: 'flicker 4s ease-in-out infinite',
        scrolldot: 'scrolldot 1.8s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 36s) linear infinite',
      },
    },
  },
  plugins: [],
};
