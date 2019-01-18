import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, store } from './components/App';
import * as serviceWorker from './serviceWorker';
//import store from './store/index';
import { Provider } from "react-redux";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
