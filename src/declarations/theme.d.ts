interface Colors {
  bgDark: string;
  primaryLight: string;
  error: string;
  white: string;
  primary: string;
  purple: string;
  darkGrey: string;
  whiteLight: string;
  burlyWood: string;
}

interface Fonts {
  montserrat: string;
  sarpanch: string;
  roboto: string;
}

export declare module '@mui/material/styles' {
  interface Theme {
    colors: Colors;
    fonts: Fonts;
  }
  interface ThemeOptions {
    colors?: Colors;
    fonts?: Fonts;
  }

  interface BreakpointOverrides {
    xxs: true;
    xl: false;
  }
}
