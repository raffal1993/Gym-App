interface Colors {
  bgDark?: string;
  primaryLight?: string;
}

export declare module '@mui/material/styles' {
  interface Theme {
    colors: Colors;
  }
  interface ThemeOptions {
    colors?: Colors;
  }
}
