import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#030710',
        sidebar: '#030710',
        surface: '#131419',
        panel: '#1A1C22',
        borderSubtle: '#23252E',

        textPrimary: '#E5E7EB',
        textParagraph: '#bdc0c9',
        textSecondary: '#4da3ff',
        textMuted: '#6B7280',

        accent: '#3B82F6',
        accentHover: '#60A5FA',

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

