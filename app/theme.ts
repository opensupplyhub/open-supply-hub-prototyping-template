import { createTheme } from "@mui/material/styles";

/**
 * Open Supply Hub — CTA yellow, accent purple, neutrals (see app UI / brand).
 * Components using `color="primary"` / `secondary` pick these up automatically.
 */
export const brandColors = {
  primary: "#FFD24D",
  primaryLight: "#FFEB7A",
  primaryDark: "#D4A43A",
  secondary: "#7B1FA2",
  secondaryLight: "#9C4DB8",
  secondaryDark: "#4A0072",
} as const;

export const appTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
      disabled: "#9E9E9E",
    },
    primary: {
      main: brandColors.primary,
      light: brandColors.primaryLight,
      dark: brandColors.primaryDark,
      contrastText: "#000000",
    },
    secondary: {
      main: brandColors.secondary,
      light: brandColors.secondaryLight,
      dark: brandColors.secondaryDark,
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D32F2F",
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});
