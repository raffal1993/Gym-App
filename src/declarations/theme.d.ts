interface Colors {
  bgDark?: string;
  primaryLight?: string;
  error?: string;
}

interface Fonts {
  montserrat: string;
  sarpanch: string;
  gillSans: string;
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
    xl: false;
  }
}
