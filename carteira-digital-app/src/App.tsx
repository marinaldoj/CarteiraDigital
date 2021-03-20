import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/globalStyles';
import Dark from './styles/themes/Dark';
// import Light from './styles/themes/Light';
import Routes from './routes'

function App() {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles/>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
