import axios from 'axios';
export const GET_QUALIFICATION_SUCCESS = 'GET_QUALIFICATION_SUCCESS';
export const GET_QUALIFICATION_PENDING = 'GET_QUALIFICATION_PENDING';
export const GET_QUALIFICATION_ERROR = 'GET_QUALIFICATION_ERROR';
export const ADD_QUALIFICATION_SUCCESS = 'ADD_QUALIFICATION_SUCCESS';
export const ADD_QUALIFICATION_PENDING = 'ADD_QUALIFICATION_PENDING';
export const ADD_QUALIFICATION_ERROR = 'ADD_QUALIFICATION_ERROR';
export const EDIT_QUALIFICATION_SUCCESS = 'EDIT_QUALIFICATION_SUCCESS';
export const EDIT_QUALIFICATION_PENDING = 'EDIT_QUALIFICATION_PENDING';
export const EDIT_QUALIFICATION_ERROR = 'EDIT_QUALIFICATION_ERROR';
export const DELETE_QUALIFICATION_SUCCESS = 'DELETE_QUALIFICATION_SUCCESS';
export const DELETE_QUALIFICATION_PENDING = 'DELETE_QUALIFICATION_PENDING';
export const DELETE_QUALIFICATION_ERROR = 'DELETE_QUALIFICATION_ERROR';

const ROOT_URL = 'https://localhost:8080/api/qualification';

function setGetQualificationPending(isGetQualificationPending) {
	return {
		type: GET_QUALIFICATION_PENDING,
		isGetQualificationPending: isGetQualificationPending,
	};
}

function setGetQualificationSuccess(isGetQualificationSuccess, q) {
	return {
		type: GET_QUALIFICATION_SUCCESS,
		isGetQualificationSuccess: isGetQualificationSuccess,
		qualifications: q,
	};
}

function setGetQualificationError(getQualificationError) {
	return {
		type: GET_QUALIFICATION_ERROR,
		getQualificationError: getQualificationError,
	};
}

export function getQualifications() {
	return dispatch => {
		dispatch(setGetQualificationPending(true));
		dispatch(setGetQualificationSuccess(false));
		dispatch(setGetQualificationError(null));

		axios
			.get(`${ROOT_URL}`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('data', res.data);
				dispatch(setGetQualificationPending(false));
				dispatch(setGetQualificationSuccess(true, res.data));
			})
			.catch(err => {
				dispatch(setGetQualificationPending(false));
				dispatch(setGetQualificationSuccess(false, null));
				dispatch(setGetQualificationError(err.response));
			});
	};
}

function setAddQualificationPending(isAddQualificationPending) {
	return {
		type: ADD_QUALIFICATION_PENDING,
		isAddQualificationPending: isAddQualificationPending,
	};
}

function setAddQualificationSuccess(isAddQualificationSuccess, response) {
	return {
		type: ADD_QUALIFICATION_SUCCESS,
		isAddQualificationSuccess: isAddQualificationSuccess,
		qualification: response,
	};
}

function setAddQualificationError(addQualificationError) {
	return {
		type: ADD_QUALIFICATION_ERROR,
		addQualificationError: addQualificationError,
	};
}

export function addQualification(newQualification, successCb) {
	console.log('new qualification', newQualification);
	return dispatch => {
		dispatch(setAddQualificationPending(true));
		dispatch(setAddQualificationSuccess(false));
		dispatch(setAddQualificationError(null));

		axios
			.post(`${ROOT_URL}`, newQualification, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('new qualification data', res.data);
				dispatch(setAddQualificationPending(false));
				dispatch(setAddQualificationSuccess(true, res.data));
				successCb();
			})
			.catch(err => {
				dispatch(setAddQualificationPending(false));
				dispatch(setAddQualificationSuccess(false, null));
				dispatch(setAddQualificationError(err.response));
			});
	};
}

function setEditQualificationPending(isEditQualificationPending) {
	return {
		type: EDIT_QUALIFICATION_PENDING,
		isEditQualificationPending: isEditQualificationPending,
	};
}

function setEditQualificationSuccess(isEditQualificationSuccess, newQualification) {
	return {
		type: EDIT_QUALIFICATION_SUCCESS,
		isEditQualificationSuccess: isEditQualificationSuccess,
		newQualification: newQualification,
	};
}

function setEditQualificationError(editQualificationError) {
	return {
		type: EDIT_QUALIFICATION_ERROR,
		editQualificationError: editQualificationError,
	};
}

export function editQualification(oldQualification, newQualification, successCb) {
	console.log('new qualification', newQualification);
	return dispatch => {
		dispatch(setEditQualificationPending(true));
		dispatch(setEditQualificationSuccess(false));
		dispatch(setEditQualificationError(null));

		axios
			.put(
				`${ROOT_URL}`,
				{ ...newQualification, ...oldQualification },
				{
					headers: {
						'x-access-token': localStorage.getItem('localToken'),
					},
				}
			)
			.then(res => {
				console.log('new qualification data', res.data);
				dispatch(setEditQualificationPending(false));
				dispatch(setEditQualificationSuccess(true, res.data));
				successCb();
			})
			.catch(err => {
				dispatch(setEditQualificationPending(false));
				dispatch(setEditQualificationSuccess(false, null));
				dispatch(setEditQualificationError(err.response.data.message));
			});
	};
}

function setDeleteQualificationPending(isDeleteQualificationPending) {
	return {
		type: DELETE_QUALIFICATION_PENDING,
		isDeleteQualificationPending: isDeleteQualificationPending,
	};
}

function setDeleteQualificationSuccess(isDeleteQualificationSuccess, oldQualification, pos) {
	return {
		type: DELETE_QUALIFICATION_SUCCESS,
		isDeleteQualificationSuccess: isDeleteQualificationSuccess,
		oldQualification: oldQualification,
		position: pos,
	};
}

function setDeleteQualificationError(deleteQualificationError) {
	return {
		type: DELETE_QUALIFICATION_ERROR,
		deleteQualificationError: deleteQualificationError,
	};
}

export function deleteQualification(deletedQualification, position, successCb) {
	console.log('qualification to be deleted', deletedQualification);
	return dispatch => {
		dispatch(setDeleteQualificationPending(true));
		dispatch(setDeleteQualificationSuccess(false));
		dispatch(setDeleteQualificationError(null));
		let { degree, institution, graduateYear } = deletedQualification;
		console.log('fired once');
		axios
			.delete(`${ROOT_URL}`, {
				params: { degree, institution, graduateYear },
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('data from res', res.data);
				dispatch(setDeleteQualificationPending(false));
				dispatch(setDeleteQualificationSuccess(true, res.data, position));
				successCb();
			})
			.catch(err => {
				console.log('err', err);
				dispatch(setDeleteQualificationPending(false));
				dispatch(setDeleteQualificationSuccess(false, null));
				if (err.response && err.response.data.message) dispatch(setDeleteQualificationError(err.response.data.message));
			});
	};
}
