import React from 'react';

import './index.css';
import App from './App';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


