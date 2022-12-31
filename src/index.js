import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from './Redux/reducers'; 
  
const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} > <App /> </Provider>
  </React.StrictMode>
);
 