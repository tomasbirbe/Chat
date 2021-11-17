import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import authContext from '../authContext';

const auth = {
  token: '',
  isLogged: false,
};

ReactDOM.render(
  <authContext.Provider value={auth}>
    <Router>
      <App />
    </Router>
  </authContext.Provider>,
  document.getElementById('root')
);
