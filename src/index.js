/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Root component
 * Created: 4 Sep 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import HttpsRedirect from 'react-https-redirect';

import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import persistedReducer from './reducers';

import App from './components/app';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/mdbreact/dist/css/mdb.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxLogger)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<HttpsRedirect>
				<App />
			</HttpsRedirect>
		</PersistGate>
	</Provider>,
	document.querySelector('.app-container')
);
