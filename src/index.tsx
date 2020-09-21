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
// 2. Redux
// 3. components & util
// 4. reducers
// 5. styles

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./store/index";

import App from './App';

import "./assets/styles/global.sass";

import { addTableGroup } from "./store/tableGroups/actions";
// import * as serviceWorker from './serviceWorker';

// SETUP
///////////////////////////////////////////////////////////////////

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

ReactDOM.render(
  
  <React.StrictMode>
    {/* {console.log(store.dispatch(addTableGroup()))} */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
