import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import Navbar from './components/Recyclable/Header/Navbar';
import LoginForm from './components/User/LoginForm';
import SignupForm from './containers/SignupForm/SignupForm'
import App from './components/app';

import persistedReducer from './reducers';
//import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(reduxThunk,reduxLogger)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<div>
						<Navbar/>
						<Switch>
							<Route exact path="/" component={App}/>
							<Route path="/login" component={LoginForm} />
							<Route path="/register" component={SignupForm} />
						</Switch>
					</div>
				</BrowserRouter>
		</PersistGate>
	</Provider>
  , document.querySelector('.container'));
