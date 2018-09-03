import axios from 'axios';

export const ADD_CONSULTATION_PENDING = 'ADD_CONSULTATION_PENDING';
export const ADD_CONSULTATION_SUCCESS = 'ADD_CONSULTATION_SUCCESS';
export const ADD_CONSULTATION_ERROR = 'ADD_CONSULTATION_ERROR';
export const GET_CONSULTATIONS_PENDING = 'GET_CONSULTATIONS_PENDING';
export const GET_CONSULTATIONS_SUCCESS = 'GET_CONSULTATIONS_SUCCESS';
export const GET_CONSULTATIONS_ERROR = 'GET_CONSULTATIONS_ERROR';
const ACCEPT_CLIENT_PENDING = 'ACCEPT_CLIENT_PENDING';
const ACCEPT_CLIENT_SUCCESS = 'ACCEPT_CLIENT_SUCCESS';
const ACCEPT_CLIENT_ERROR = 'ACCEPT_CLIENT_ERROR';
const CHOOSE_CLIENT = 'CHOOSE_CLIENT';

const ROOT_URL = 'http://localhost:8080/api/clients/profile';

function setAddConsultationPending(isAddConsultationPending) {
	return {
		type: ADD_CONSULTATION_PENDING,
		isAddConsultationPending: isAddConsultationPending,
	};
}

export function setAddConsultationSuccess(isAddConsultationSuccess) {
	return {
		type: ADD_CONSULTATION_SUCCESS,
		isAddConsultationSuccess: isAddConsultationSuccess,
	};
}

export function setAddConsultationError(addConsultationError) {
	return {
		type: ADD_CONSULTATION_ERROR,
		addConsultationError: addConsultationError,
	};
}

export function addConsultation(newConsultation, cb) {
	return dispatch => {
		dispatch(setAddConsultationPending(true));
		dispatch(setAddConsultationSuccess(false));
		dispatch(setAddConsultationError(null));

		axios
			.post(`${ROOT_URL}/consultation`, newConsultation, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('res', res);
				dispatch(setAddConsultationPending(false));
				dispatch(setAddConsultationSuccess(true));
				cb();
			})
			.catch(err => {
				console.log('client err', err);
				dispatch(setAddConsultationPending(false));
				dispatch(setAddConsultationSuccess(false));
				if (err.response && err.response.data) dispatch(setAddConsultationError(err.response.data.message));
			});
	};
}

function setGetConsultationsPending(isGetConsultationsPending) {
	return {
		type: GET_CONSULTATIONS_PENDING,
		isGetConsultationsPending: isGetConsultationsPending,
	};
}

function setGetConsultationsSuccess(isGetConsultationsSuccess, consultations) {
	return {
		type: GET_CONSULTATIONS_SUCCESS,
		isGetConsultationsSuccess: isGetConsultationsSuccess,
		consultations,
	};
}

function setGetConsultationsError(getConsultationsError) {
	return {
		type: GET_CONSULTATIONS_ERROR,
		getConsultationsError: getConsultationsError,
	};
}

export function getConsultations(patientUsername, cb) {
	return dispatch => {
		dispatch(setGetConsultationsPending(true));
		dispatch(setGetConsultationsSuccess(false, null));
		dispatch(setGetConsultationsError(null));

		axios
			.get(`${ROOT_URL}/consultation`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
				params: {
					patientUsername,
				},
			})
			.then(res => {
				dispatch(setGetConsultationsPending(false));
				dispatch(setGetConsultationsSuccess(true, res.data));
				if (cb) cb();
			})
			.catch(err => {
				console.log('consultation fail');
				dispatch(setGetConsultationsPending(false));
				dispatch(setGetConsultationsSuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetConsultationsError(err.response.data.message));
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

function setAcceptClientError(addConsultationError) {
	return {
		type: ACCEPT_CLIENT_ERROR,
		addConsultationError: addConsultationError,
	};
}

function acceptConnection(newPatient, idx, cb) {
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
				console.log('err', err);
				dispatch(setAcceptClientPending(false));
				dispatch(setAcceptClientSuccess(false, null));
				if (err.response.data) dispatch(setAcceptClientError(err.response.data.message));
			});
	};
}

function setCurrentClient(idx) {
	return {
		type: CHOOSE_CLIENT,
		currentClientIndex: idx,
	};
}

function chooseClient(idx) {
	return dispatch => {
		dispatch(setCurrentClient(idx));
	};
}
