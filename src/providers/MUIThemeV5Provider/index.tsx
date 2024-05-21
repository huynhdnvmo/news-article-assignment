import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import type { GlobalStylesProps } from "@mui/material/GlobalStyles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import type { ThemeProviderProps } from "@mui/system";

const globalStyleMaker: Required<GlobalStylesProps>["styles"] = () => ({
  // TODO global styles go here
});

const defaultTheme = createTheme({
  // TODO theme options go here
});

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, "theme">;

export default function MUIThemeV5Provider({
  children,
  ...otherProps
}: Partial<Omit<ThemeProviderProps, "theme">>) {
  return (
    <ThemeProvider {...otherProps} theme={defaultTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyleMaker} />
      {children}
    </ThemeProvider>
  );
}
