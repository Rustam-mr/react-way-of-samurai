import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SamuraiJsApp from './App';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <Provider store={store}>
      <SamuraiJsApp />
    </Provider>
  );
