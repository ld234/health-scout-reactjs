/** * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Actions setting current client's consultation state
 * Created: 9 Sep 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * */

import axios from 'axios';

export const ADD_CONSULTATION_PENDING = 'ADD_CONSULTATION_PENDING';
export const ADD_CONSULTATION_SUCCESS = 'ADD_CONSULTATION_SUCCESS';
export const ADD_CONSULTATION_ERROR = 'ADD_CONSULTATION_ERROR';
export const GET_CONSULTATIONS_PENDING = 'GET_CONSULTATIONS_PENDING';
export const GET_CONSULTATIONS_SUCCESS = 'GET_CONSULTATIONS_SUCCESS';
export const GET_CONSULTATIONS_ERROR = 'GET_CONSULTATIONS_ERROR';
export const EDIT_CONSULTATION_PENDING = 'EDIT_CONSULTATION_PENDING';
export const EDIT_CONSULTATION_SUCCESS = 'EDIT_CONSULTATION_SUCCESS';
export const EDIT_CONSULTATION_ERROR = 'EDIT_CONSULTATION_ERROR';

const ROOT_URL = 'https://localhost:8080/api/clients/profile/consultation';

// @Dan: Add consultation actions
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
			.post(`${ROOT_URL}`, newConsultation, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setAddConsultationPending(false));
				dispatch(setAddConsultationSuccess(true));
				cb();
			})
			.catch(err => {
				dispatch(setAddConsultationPending(false));
				dispatch(setAddConsultationSuccess(false));
				if (err.response && err.response.data) dispatch(setAddConsultationError(err.response.data.message));
			});
	};
}

// @Dan: Get list of consultations for a client
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

export function setGetConsultationsError(getConsultationsError) {
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
			.get(`${ROOT_URL}`, {
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
				dispatch(setGetConsultationsPending(false));
				dispatch(setGetConsultationsSuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetConsultationsError(err.response.data.message));
			});
	};
}

// @Dan: Edit consultation actions
function setEditConsultationPending(isEditConsultationPending) {
	return {
		type: EDIT_CONSULTATION_PENDING,
		isEditConsultationPending: isEditConsultationPending,
	};
}

function setEditConsultationSuccess(isEditConsultationSuccess, newConsultation, idx, oldConsultation) {
	return {
		type: EDIT_CONSULTATION_SUCCESS,
		newConsultation,
		isEditConsultationSuccess: isEditConsultationSuccess,
		idx,
		oldConsultation,
	};
}

export function setEditConsultationError(editConsultationError) {
	return {
		type: EDIT_CONSULTATION_ERROR,
		editConsultationError: editConsultationError,
	};
}

export function editConsultation(newConsultation, idx, cb) {
	return dispatch => {
		dispatch(setEditConsultationPending(true));
		dispatch(setEditConsultationSuccess(false, null));
		dispatch(setEditConsultationError(null));

		axios
			.put(`${ROOT_URL}`, newConsultation, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setEditConsultationPending(false));
				dispatch(setEditConsultationSuccess(true, res.data.consultation, idx, newConsultation));
				cb();
			})
			.catch(err => {
				dispatch(setEditConsultationPending(false));
				dispatch(setEditConsultationSuccess(false, null));
				if (err.response.data) dispatch(setEditConsultationError(err.response.data.message));
			});
	};
}
