import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customColor1?: Palette['primary'];
  }
  interface PaletteOptions {
    customColor1?: PaletteOptions['primary'];
  }
}
