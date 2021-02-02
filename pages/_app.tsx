import  {ThemeProvider} from 'styled-components';
import '../styles/globals.css'

 const theme = {
    primary: '#0056A5',
    primaryLight:'#2185D0',

  }
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} >
      <Component {...pageProps} />
    </ThemeProvider>
  ) 
}

export default MyApp
