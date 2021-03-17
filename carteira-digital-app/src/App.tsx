import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/globalStyles';
import Layout from './components/Layout';
import Dark from './styles/themes/Dark'
import Light from './styles/themes/Light'

function App() {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles/>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
