import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
	key: 'root',
	storage,
	blacklist: ['authentication']
}

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['loginError']
}


const rootReducer = combineReducers({
	authentication:  persistReducer(authPersistConfig, authReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
