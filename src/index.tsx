// NOTES
///////////////////////////////////////////////////////////////////
// Base import order is:
// 1. React
// 2. components & util
// 3. assets
// 4. types
// 5. styles

// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React
// 2. components & util
// 3. styles

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import "./assets/styles/global.sass";

// import * as serviceWorker from './serviceWorker';


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
