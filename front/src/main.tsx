import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import authContext from '../authContext';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

const auth = {
  token: '',
  isLogged: false,
};

ReactDOM.render(
  <authContext.Provider value={auth}>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </authContext.Provider>,
  document.getElementById('root')
);
