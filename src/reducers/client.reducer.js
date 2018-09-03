import {
	GET_CLIENTS_PENDING,
	GET_CLIENTS_SUCCESS,
	GET_CLIENTS_ERROR,
	GET_NEW_CLIENTS_PENDING,
	GET_NEW_CLIENTS_SUCCESS,
	GET_NEW_CLIENTS_ERROR,
	ACCEPT_CLIENT_PENDING,
	ACCEPT_CLIENT_SUCCESS,
	ACCEPT_CLIENT_ERROR,
	CHOOSE_CLIENT_PENDING,
	CHOOSE_CLIENT_SUCCESS,
} from '../actions/client.view.actions';

const INITIAL_STATE = {
	isGetClientsSuccess: false,
	isGetClientsPending: false,
	getClientsError: null,
	isGetNewClientsSuccess: false,
	isGetNewClientsPending: false,
	getNewClientsError: null,
	clients: [],
	newClients: [],
	isChooseClientPending: false,
	currentClient: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_CLIENTS_PENDING:
			return {
				...state,
				isGetClientsPending: action.isGetClientsPending,
			};
		case GET_CLIENTS_SUCCESS:
			return {
				...state,
				isGetClientsSuccess: action.isGetClientsSuccess,
				clients: action.clients,
			};
		case GET_CLIENTS_ERROR:
			return {
				...state,
				getClientsError: action.getClientsError,
			};
		case GET_NEW_CLIENTS_PENDING:
			return {
				...state,
				isGetNewClientsPending: action.isGetNewClientsPending,
			};
		case GET_NEW_CLIENTS_SUCCESS:
			return {
				...state,
				isGetNewClientsSuccess: action.isGetNewClientsSuccess,
				newClients: action.newClients,
			};
		case GET_NEW_CLIENTS_ERROR:
			return {
				...state,
				getNewNewClientsError: action.getNewNewClientsError,
			};
		case ACCEPT_CLIENT_PENDING:
			return {
				...state,
				isAcceptClientPending: action.isAcceptClientPending,
			};
		case ACCEPT_CLIENT_SUCCESS:
			return {
				...state,
				isAcceptClientSuccess: action.isAcceptClientSuccess,
				newClients:
					action.idx !== null
						? [].concat(state.newClients.slice(0, action.idx)).concat(state.newClients.slice(action.idx + 1))
						: state.newClients,
			};
		case ACCEPT_CLIENT_ERROR:
			return {
				...state,
				acceptClientError: action.isAcceptClientError,
			};
		case CHOOSE_CLIENT_PENDING:
			return {
				...state,
				isChooseClientPending: action.isChooseClientPending,
			};
		case CHOOSE_CLIENT_SUCCESS:
			return {
				...state,
				currentClient: state.clients[action.currentClientIndex],
			};
		default:
			return state;
	}
};
