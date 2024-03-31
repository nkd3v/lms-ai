import { CssBaseline, ThemeProvider } from '@mui/material';
import { useLocation, useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from "./theme/DefaultColors";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { BehaviorProvider } from './contexts/BehaviorContext';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  useEffect(() => {
    console.log('helloapp')
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken)
      console.log(jwtDecode(jwtToken))
    console.log(window.location.pathname);
  }, [])

  return (
    <BehaviorProvider> {/* Wrap with the custom context provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </BehaviorProvider>
  );
}

export default App;
