import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducer from './state/reducers.js';

let store = createStore(reducer);

// import store from "./redux/store";


ReactDOM.render(
	<Provider store={store} >
    	<Home />
    </Provider>,
    document.getElementById('root'));