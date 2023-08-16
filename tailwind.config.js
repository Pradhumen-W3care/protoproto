const colors = require("tailwindcss/colors")
module.exports = {
  purge: {
    content: ["./src/**/*.js"],
    options: {
      safelist: [/swiper/, "antialiased"],
    },
  },
  theme: {
    fontFamily: {
      proto1: ["Proto1"],
      proto2: ["Proto2"],
      proto3: ["Proto3"],
      proto4: ["Proto4"],
      proto5: ["Proto5"],
      proto6: ["Proto6"],
      proto7: ["Proto7"],
      proto8: ["Proto8"],
      display: ["Graebenbach"],
      body: ["Graebenbach"],
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        grey: "#aaa",
        coolGray: colors.coolGray,
        blackOpacity: "rgba(0, 0, 0, 0.3)",
      },
      spacing: {
        "10-5": "2.625rem",
        "2-2": "2.2rem",
        "9": "9px",
        "20": "20px",
        "28": "28px",
        "63": "63px",
        "75": "75px",
        "175": "175px",
        "200": "200px",
        "256": "256px",
        "300": "300px",
        "400": "400px",
        "704": "704px",
        "5-pers": "5%",
        "height-16": "calc(100vh - 4rem)",
        "1440": "1440px",
      },
      screens: {
        "2xl-new": "1800px",
        "2xl": "1792px",
        xl: "1440px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
      },
      fontSize: {
        "1.5xl": "1.375rem",
        "2.5xl": "1.75rem",
        "7xl": "4.5rem",
        "8.3xl": "6.3rem",
      },
      lineHeight: {
        'inherit': 'inherit',
        '1.8': '1.8rem',
        '2.2': '2.2rem',
      },
      zIndex: {
        '-1': '-1',
        '100': '100',
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}