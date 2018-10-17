/** * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Actions setting the current client view
 * Created: 19 Aug 2018
 * Last modified: 3 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * */

import axios from 'axios';

export const GET_CLIENTS_PENDING = 'GET_CLIENTS_PENDING';
export const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS';
export const GET_CLIENTS_ERROR = 'GET_CLIENTS_ERROR';
export const GET_NEW_CLIENTS_PENDING = 'GET_NEW_CLIENTS_PENDING';
export const GET_NEW_CLIENTS_SUCCESS = 'GET_NEW_CLIENTS_SUCCESS';
export const GET_NEW_CLIENTS_ERROR = 'GET_NEW_CLIENTS_ERROR';
export const ACCEPT_CLIENT_PENDING = 'ACCEPT_CLIENT_PENDING';
export const ACCEPT_CLIENT_SUCCESS = 'ACCEPT_CLIENT_SUCCESS';
export const ACCEPT_CLIENT_ERROR = 'ACCEPT_CLIENT_ERROR';
export const CHOOSE_CLIENT_SUCCESS = 'CHOOSE_CLIENT';
export const CHOOSE_CLIENT_PENDING = 'CHOOSE_CLIENT_PENDING';

const ROOT_URL = 'https://localhost:8080/api/clients';

function setGetClientsPending(isGetClientsPending) {
	return {
		type: GET_CLIENTS_PENDING,
		isGetClientsPending: isGetClientsPending,
	};
}

function setGetClientsSuccess(isGetClientsSuccess, clients) {
	return {
		type: GET_CLIENTS_SUCCESS,
		isGetClientsSuccess: isGetClientsSuccess,
		clients,
	};
}

function setGetClientsError(getClientsError) {
	return {
		type: GET_CLIENTS_ERROR,
		getClientsError: getClientsError,
	};
}

// @Dan: Get list of connected patients
export function getClients() {
	return dispatch => {
		dispatch(setGetClientsPending(true));
		dispatch(setGetClientsSuccess(false));
		dispatch(setGetClientsError(null));

		axios
			.get(`${ROOT_URL}/`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setGetClientsPending(false));
				dispatch(setGetClientsSuccess(true, res.data));
			})
			.catch(err => {
				dispatch(setGetClientsPending(false));
				dispatch(setGetClientsSuccess(false, null));
				if (err.response.data) dispatch(setGetClientsError(err.response.data.message));
			});
	};
}

function setGetNewClientsPending(isGetNewClientsPending) {
	return {
		type: GET_NEW_CLIENTS_PENDING,
		isGetNewClientsPending: isGetNewClientsPending,
	};
}

function setGetNewClientsSuccess(isGetNewClientsSuccess, newClients) {
	return {
		type: GET_NEW_CLIENTS_SUCCESS,
		isGetNewClientsSuccess: isGetNewClientsSuccess,
		newClients,
	};
}

function setGetNewClientsError(getNewClientsError) {
	return {
		type: GET_NEW_CLIENTS_ERROR,
		getNewClientsError: getNewClientsError,
	};
}

// @Dan: Get list of new clients requesting to connect
export function getNewClients() {
	return dispatch => {
		dispatch(setGetNewClientsPending(true));
		dispatch(setGetNewClientsSuccess(false));
		dispatch(setGetNewClientsError(null));

		axios
			.get(`${ROOT_URL}/new`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setGetNewClientsPending(false));
				dispatch(setGetNewClientsSuccess(true, res.data));
			})
			.catch(err => {
				dispatch(setGetNewClientsPending(false));
				dispatch(setGetNewClientsSuccess(false, null));
				if (err.response.data) dispatch(setGetNewClientsError(err.response.data.message));
			});
	};
}

function setAcceptClientPending(isAcceptClientPending) {
	return {
		type: ACCEPT_CLIENT_PENDING,
		isAcceptClientPending: isAcceptClientPending,
	};
}

function setAcceptClientSuccess(isAcceptClientSuccess, idx) {
	return {
		type: ACCEPT_CLIENT_SUCCESS,
		isAcceptClientSuccess: isAcceptClientSuccess,
		idx,
	};
}

function setAcceptClientError(getClientsError) {
	return {
		type: ACCEPT_CLIENT_ERROR,
		getClientsError: getClientsError,
	};
}

// @Dan: Accept a new connection if there are enough connection on the account
export function acceptConnection(newPatient, idx, cb) {
	return dispatch => {
		dispatch(setAcceptClientPending(true));
		dispatch(setAcceptClientSuccess(false, null));
		dispatch(setAcceptClientError(null));

		axios
			.put(
				`${ROOT_URL}/clickNew`,
				{},
				{
					headers: {
						'x-access-token': localStorage.getItem('localToken'),
					},
					params: {
						patientUsername: newPatient,
					},
				}
			)
			.then(() => {
				dispatch(setAcceptClientPending(false));
				dispatch(setAcceptClientSuccess(true, idx));
				cb();
			})
			.catch(err => {
				dispatch(setAcceptClientPending(false));
				dispatch(setAcceptClientSuccess(false, null));
				if (err.response.data) dispatch(setAcceptClientError(err.response.data.message));
			});
	};
}

function setChooseClientPending(isChooseClientPending) {
	return {
		type: CHOOSE_CLIENT_PENDING,
		isChooseClientPending,
	};
}

function setCurrentClient(idx) {
	return {
		type: CHOOSE_CLIENT_SUCCESS,
		currentClientIndex: idx,
	};
}

// @Dan: Save the chosen client to the state
export function chooseClient(idx) {
	return dispatch => {
		dispatch(setChooseClientPending(true));
		dispatch(setCurrentClient(idx));
		dispatch(setChooseClientPending(false));
	};
}
