import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/globalStyles';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard'
import Dark from './styles/themes/Dark'
import Light from './styles/themes/Light'

function App() {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles/>
        <Layout>
            <Dashboard />
        </Layout>
    </ThemeProvider>
  );
}

export default App;
