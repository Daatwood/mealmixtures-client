import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash.throttle';

import './index.css';
import App from './components/App';
import reducers from './reducers';
import { saveState, loadState } from './utils/localStorage';

import registerServiceWorker from './registerServiceWorker';
const store = createStore(reducers, loadState(), applyMiddleware(reduxThunk));

// We'll subscribe to state changes, saving the store's state to the browser's
// local storage. We'll throttle this to prevent excessive work.
store.subscribe(
	throttle( () => saveState(store.getState()), 1000)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
