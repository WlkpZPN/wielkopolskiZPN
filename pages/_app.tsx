import  {ThemeProvider} from 'styled-components';
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
 const theme = {
    primary: '#0056A5',
    primaryLight:'#2185D0',

  }
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} >
      <Component {...pageProps} />
      <ToastContainer/>
    </ThemeProvider>
  ) 
}

export default MyApp
