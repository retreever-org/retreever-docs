import type { Config } from 'tailwindcss'

const surface = {
  50: 'rgb(var(--surface-50) / <alpha-value>)',
  100: 'rgb(var(--surface-100) / <alpha-value>)',
  200: 'rgb(var(--surface-200) / <alpha-value>)',
  300: 'rgb(var(--surface-300) / <alpha-value>)',
  400: 'rgb(var(--surface-400) / <alpha-value>)',
  500: 'rgb(var(--surface-500) / <alpha-value>)',
  600: 'rgb(var(--surface-600) / <alpha-value>)',
  700: 'rgb(var(--surface-700) / <alpha-value>)',
  800: 'rgb(var(--surface-800) / <alpha-value>)',
  900: 'rgb(var(--surface-900) / <alpha-value>)',
  950: 'rgb(var(--surface-950) / <alpha-value>)',
  panel: 'rgb(var(--surface-panel) / <alpha-value>)',
};

const primary = {
  50: 'rgb(var(--primary-50) / <alpha-value>)',
  100: 'rgb(var(--primary-100) / <alpha-value>)',
  200: 'rgb(var(--primary-200) / <alpha-value>)',
  300: 'rgb(var(--primary-300) / <alpha-value>)',
  400: 'rgb(var(--primary-400) / <alpha-value>)',
  500: 'rgb(var(--primary-500) / <alpha-value>)',
  600: 'rgb(var(--primary-600) / <alpha-value>)',
  700: 'rgb(var(--primary-700) / <alpha-value>)',
  800: 'rgb(var(--primary-800) / <alpha-value>)',
  900: 'rgb(var(--primary-900) / <alpha-value>)',
};

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: surface[700],
        sidebar: surface.panel,
        navbar: surface.panel,
        surface,
        primary,

        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        textPrimary: 'rgb(var(--foreground) / <alpha-value>)',
        textParagraph: 'rgb(var(--text-paragraph) / <alpha-value>)',
        textSecondary: primary[500],
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',

        borderSubtle: surface[500],

        accent: primary[500],
        accentHover: primary[400],

        success: '#10B981',
        successBg: 'rgba(16,185,129,0.1)',
        error: '#EF4444',
        errorBg: 'rgba(239,68,68,0.1)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

