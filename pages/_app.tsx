import { ThemeProvider } from "styled-components";
import styled from 'styled-components';
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/scroll.css";
import { ToastContainer } from "react-toastify";
const theme = {
  primary: "#0056A5",
  primaryLight: "#2185D0",
  darkLight: "#363636",
  dark: "#1B1C1D",
  greyText: "#797979",
  danger: "#D10101",
  dangerDark: "#A50000",
  success: "#00C65B",
  successDark: "#00A54C",
  warningDark: "#D3E500",
  warning: "#E2F500",
};

const StyledToast = styled(ToastContainer)`
  font-size:16px;
  min-width:350px;
  

`;
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <StyledToast  />
    </ThemeProvider>
  );
}

export default MyApp;
