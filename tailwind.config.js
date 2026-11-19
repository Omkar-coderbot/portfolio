/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Dark Mode: Spatial Telemetry
        obsidian: '#0B0F19',
        charcoal: '#111827',
        hairline: '#1E293B',
        // Light Mode: Technical Blueprint
        alabaster: '#FAF9F6',
        ink: '#0F172A',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
