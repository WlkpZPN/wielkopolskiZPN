import { ThemeProvider } from "styled-components";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const theme = {
  primary: "#0056A5",
  primaryLight: "#2185D0",
  darkLight: "#363636",
  dark: "#1B1C1D",
  greyText: "#797979",
  danger: "#D10101",
  dangerDark: "#A50000",
  success: "#05A750",
  successDark: "#00A54C",
};
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
