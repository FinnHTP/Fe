/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBg: "#101014",
        customHeaderBg: "#121216",
        customFooterBg: "#202020",
        customInputBg1: "#303034",
        customTypeEdition: "#868080",
        customTextPriceGame: "#E0E0E1",
        customTextDiscount: "#979799",
        customCouponBg: "#26BBFF",
        customBgBtnCarousel: "#101014",
        customBgBtnCarouselActive: "#404044",
        customBgBrowse: "#343437",
        customBgDealsOfWeek: "#292AEC",
        customBgFreeGames: "#202024",
        customTextFreeGames: "#B1B1B3",
        customBgFreeGames2: "#5BB8F9",
        customTextSales: "#ACACAD",
        customLoginBg:"rgb(24,27,32)",
      },
      fontSize: {
        sxl: "1.2rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
        },
        customLoginBg: "rgb(38,36,36)",
      },
    },
  },
  plugins: [],
};
