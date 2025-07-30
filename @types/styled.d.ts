import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    darkLight: string;
    dark: string;
    greyText: string;
    danger: string;
    dangerDark: string;
    success: string;
    successDark: string;
    warningDark: string;
    warning: string;
  }
}
