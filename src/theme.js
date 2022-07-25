import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#255cac",
        light: "#6189de",
        dark: "#00337c",
        contrastText: "#fff",
      },
      secondary: {
        main: "#e04551",
        light: "#ff797d",
        dark: "#a80029",
        contrastText: "#000",
      },
    },
  })
);
