import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Router from '../../router';
import Header from '../header';

import { Container } from './styles';

import ToastContainer from '../toast/ToastContainer';

function App() {
  // console.log('Renderizou!');

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
