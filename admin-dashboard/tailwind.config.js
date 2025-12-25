/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // Simple monochrome scale overrides if needed, but defaults are usually good.
        // Defining 'accent' for that pop of color.
        accent: {
          light: '#fb923c', // orange-400
          DEFAULT: '#f97316', // orange-500
          dark: '#ea580c',   // orange-600
        },
        // Re-mapping primary to neutral for a cleaner look, or keeping it distinct.
        // Let's make 'primary' basically grayscale with a hint of blue-gray for UI elements
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  darkMode: 'media' // Changed to 'media' for system preference, or keep 'class' if manually toggling. User asked for "reactive ui that changes color based on system theme", so 'media' is automatic, but 'class' allows manual override + system (if set up). standard 'media' is safest for "system theme".
}
