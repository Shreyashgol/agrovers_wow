/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Light Mode (Default) - Agricultural Green Theme
        agrovers: {
          bg: {
            primary: '#F9FAFB',      // Light gray background
            secondary: '#F3F4F6',    // Slightly darker gray
            tertiary: '#E5E7EB',     // Border gray
            elevated: '#FFFFFF',     // White cards
          },
          accent: {
            primary: '#059669',      // Green-600
            secondary: '#10B981',    // Emerald-500
            teal: '#14B8A6',        // Teal-500
            warning: '#F59E0B',     // Amber-500
            error: '#EF4444',       // Red-500
          },
          text: {
            primary: '#111827',      // Gray-900
            secondary: '#4B5563',    // Gray-600
            muted: '#6B7280',       // Gray-500
          },
          border: {
            subtle: '#E5E7EB',      // Gray-200
            accent: '#10B981',      // Emerald-500
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

