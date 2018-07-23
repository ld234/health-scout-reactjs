import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import qualificationReducer from './qualification.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
	key: 'root',
	storage,
	blacklist: ['authentication','userDetails','qualifications']
}

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['loginError']
}

const userPersistConfig = {
	key: 'user',
	storage: storage,
	blacklist: ['getUserError']
}

const qualificationPersistConfig = {
	key: 'qualification',
	storage: storage,
	blacklist: ['getQualificationError','addQualificationError','addQualificationSuccess','addQualificationPending']
}

const rootReducer = combineReducers({
	authentication: persistReducer(authPersistConfig, authReducer),
	userDetails: persistReducer(userPersistConfig, userReducer),
	qualifications: persistReducer(qualificationPersistConfig,qualificationReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
