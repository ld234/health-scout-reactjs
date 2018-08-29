import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import qualificationReducer from './qualification.reducer';
import documentReducer from './myDocs.reducer';
import specialtyReducer from './specialty.reducer';
import { persistReducer } from 'redux-persist';
import clientReducer from './client.reducer';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
	key: 'root',
	storage,
	blacklist: ['authentication', 'userDetails', 'qualifications', 'specialties', 'clients'],
};

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['loginError'],
};

const userPersistConfig = {
	key: 'user',
	storage: storage,
	blacklist: ['getUserError'],
};

const qualificationPersistConfig = {
	key: 'qualification',
	storage: storage,
	blacklist: [
		'getQualificationError',
		'addQualificationError',
		'isAddQualificationSuccess',
		'isEditQualificationSuccess',
		'editQualificationError',
		'justEditIndex',
	],
};

const specialtyPersistConfig = {
	key: 'specialty',
	storage: storage,
	blacklist: [
		'getSpecialtyError',
		'addSpecialtyError',
		'getPracTypeSpecialtyError',
		'deleteSpecialtyError',
		'isDeleteSpecialtySuccess',
	],
};

const clientsPersistConfig = {
	key: 'clients',
	storage: storage,
	blacklist: ['getClientsError'],
};
const documentPersistConfig ={
	key: 'documents',
	storage: storage,
	blacklist: ['']
}

const rootReducer = combineReducers({
	authentication: persistReducer(authPersistConfig, authReducer),
	userDetails: persistReducer(userPersistConfig, userReducer),
	qualifications: persistReducer(qualificationPersistConfig, qualificationReducer),
	specialties: persistReducer(specialtyPersistConfig, specialtyReducer),
	clients: persistReducer(clientsPersistConfig, clientReducer),
	documents: persistReducer(documentPersistConfig, documentReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
