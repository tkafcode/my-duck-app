module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neumorphic-bg': '#e0e0e0',
        'neumorphic-shadow': '#ffffff',
        'neumorphic-dark': '#b0b0b0',
      },
      boxShadow: {
        neumorphic: '8px 8px 15px #b0b0b0, -8px -8px 15px #ffffff',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      backgroundPosition: {
        'center-50': 'center 50%',
        'center-75': 'center 75%',
      },
    },
  },
  plugins: [
    // Parallax background utility
    function ({ addUtilities }) {
      addUtilities({
        '.parallax-bg': {
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      });
    },
    // Scroll-snap utilities
    function ({ addUtilities }) {
      addUtilities({
        '.snap-y': { scrollSnapType: 'y mandatory' },
        '.snap-x': { scrollSnapType: 'x mandatory' },
        '.snap-both': { scrollSnapType: 'both mandatory' },
        '.snap-start': { scrollSnapAlign: 'start' },
        '.snap-center': { scrollSnapAlign: 'center' },
        '.snap-end': { scrollSnapAlign: 'end' },
      });
    },
    function({ addUtilities }) {
        addUtilities({
            '.animate-init-hidden': {
                opacity: '0',
                transform: 'translateY(20px)',
            },
        })
    },
  ],
};
