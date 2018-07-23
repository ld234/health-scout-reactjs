import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import persistedReducer from './reducers';
//import routes from './routes';

import App from './components/app';

//import 'font-awesome/css/font-awesome.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/mdbreact/dist/css/mdb.css';
// import '../node_modules/popper.js/dist/popper.min';
// import '../node_modules/tether/dist/js/tether';
// import '../node_modules/jquery/dist/jquery.slim.min';
// import '../node_modules/bootstrap/dist/js/bootstrap.min';

const createStoreWithMiddleware = applyMiddleware(reduxThunk,reduxLogger)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
  , document.querySelector('.app-container'));