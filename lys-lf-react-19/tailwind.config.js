module.exports = {
  theme: {
    extend: {
      fontFamily: {
        noticia: ["var(--font-noticia)", "'Noticia Text'", "serif"],
        raleway: ["var(--font-raleway)", "'Raleway'", "sans-serif"],
        opensans: ["var(--font-opensans)", "'Open Sans'", "sans-serif"],
      },
      colors: {
        lys: {
          gray: {
            light: "#f2f2f2",
            DEFAULT: "#bcbcbc",
            medium: "#cecece",
            dark: "#606060",
          },
          black: "#222222",
        },
      },
      fontSize: {
        // Design tokens for repeated sizes
        "section-title": "1.55em",
        "section-subtitle": "1.25em",
      },
      maxWidth: {
        content: "42em",
      },
      letterSpacing: {
        section: "0.05em",
      },
    },
  },
};
