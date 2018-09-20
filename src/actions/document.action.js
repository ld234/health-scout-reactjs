import axios from 'axios';
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS';
export const GET_DOCUMENT_PENDING = 'GET_DOCUMENT_PENDING';
export const GET_DOCUMENT_ERROR = 'GET_DOCUMENT_ERROR';
export const ADD_DOCUMENT_SUCCESS = 'ADD_DOCUMENT_SUCCESS';
export const ADD_DOCUMENT_PENDING = 'ADD_DOCUMENT_PENDING';
export const ADD_DOCUMENT_ERROR = 'ADD_DOCUMENT_ERROR';
export const EDIT_DOCUMENT_SUCCESS = 'EDIT_DOCUMENT_SUCCESS';
export const EDIT_DOCUMENT_PENDING = 'EDIT_DOCUMENT_PENDING';
export const EDIT_DOCUMENT_ERROR = 'EDIT_DOCUMENT_ERROR';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_PENDING = 'DELETE_DOCUMENT_PENDING';
export const DELETE_DOCUMENT_ERROR = 'DELETE_DOCUMENT_ERROR';

const ROOT_URL = 'http://localhost:8080/sapi/document';

export function addDocument(newDocument, successCb) {
	return dispatch => {
		dispatch(setAddDocumentPending(true));
		dispatch(setAddDocumentSuccess(false));
		dispatch(setAddDocumentError(null));

		axios
			.post(`${ROOT_URL}`, newDocument, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('new document data', res.data);
				dispatch(setAddDocumentPending(false));
				dispatch(setAddDocumentSuccess(true, res.data));
				successCb();
			})
			.catch(err => {
				console.log('failed to new document data', err);

				dispatch(setAddDocumentPending(false));
				dispatch(setAddDocumentSuccess(false, null));
				dispatch(setAddDocumentError(err.response));
			});
	};
}

function setAddDocumentPending(isAddDocumentPending) {
	return {
		type: ADD_DOCUMENT_PENDING,
		isAddDocumentPending: isAddDocumentPending,
	};
}

function setAddDocumentSuccess(isAddDocumentSuccess, response) {
	return {
		type: ADD_DOCUMENT_SUCCESS,
		isAddDocumentSuccess: isAddDocumentSuccess,
		documents: response,
	};
}

function setAddDocumentError(addDocumentError) {
	return {
		type: ADD_DOCUMENT_ERROR,
		addDocumentError: addDocumentError,
	};
}

export function getDocument() {
	return dispatch => {
		dispatch(setGetDocumentPending(true));
		dispatch(setGetDocumentSuccess(false));
		dispatch(setGetDocumentError(null));

		axios
			.get(`${ROOT_URL}`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('data', res.data.documents);
				dispatch(setGetDocumentPending(false));
				dispatch(setGetDocumentSuccess(true, res.data.documents));
			})
			.catch(err => {
				console.log('error', err);

				dispatch(setGetDocumentPending(false));
				dispatch(setGetDocumentSuccess(false, null));
				dispatch(setGetDocumentError(err.response));
			});
	};
}

function setGetDocumentPending(isGetDocumentPending) {
	return {
		type: GET_DOCUMENT_PENDING,
		isGetDocumentPending: isGetDocumentPending,
	};
}

function setGetDocumentSuccess(isGetDocumentSuccess, d) {
	return {
		type: GET_DOCUMENT_SUCCESS,
		isGetDocumentSuccess: isGetDocumentSuccess,
		documents: d,
	};
}

function setGetDocumentError(getDocumentError) {
	return {
		type: GET_DOCUMENT_ERROR,
		getDocumentError: getDocumentError,
	};
}

function setDeleteDocumentPending(isDeleteDocumentPending) {
	return {
		type: DELETE_DOCUMENT_PENDING,
		isDeleteDocumentPending: isDeleteDocumentPending,
	};
}

function setDeleteDocumentSuccess(isDeleteDocumentSuccess, title, pos) {
	return {
		type: DELETE_DOCUMENT_SUCCESS,
		isDeleteDocumentSuccess: isDeleteDocumentSuccess,
		deletedTitle: title,
		position: pos,
	};
}

function setDeleteDocumentError(deleteDocumentError) {
	return {
		type: DELETE_DOCUMENT_ERROR,
		deleteDocumentError: deleteDocumentError,
	};
}

export function deleteDocument(deleteDocumentTitle, position, successCb) {
	console.log('Document title to be deleted', deleteDocumentTitle);
	return dispatch => {
		dispatch(setDeleteDocumentPending(true));
		dispatch(setDeleteDocumentSuccess(false));
		dispatch(setDeleteDocumentError(null));
		console.log('fired once');
		axios
			.delete(`${ROOT_URL}` + '?title=' + deleteDocumentTitle, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('data from res', res.data);
				dispatch(setDeleteDocumentPending(false));
				dispatch(setDeleteDocumentSuccess(true, deleteDocumentTitle, position));
				successCb();
			})
			.catch(err => {
				console.log('err', err);
				dispatch(setDeleteDocumentPending(false));
				dispatch(setDeleteDocumentSuccess(false, null));
				if (err.response && err.response.data.message) dispatch(setDeleteDocumentError(err.response.data.message));
			});
	};
}

function setEditDocumentPending(isEditDocumentPending) {
	return {
		type: EDIT_DOCUMENT_PENDING,
		isEditDocumentPending: isEditDocumentPending,
	};
}

function setEditDocumentSuccess(isEditDocumentSuccess, newDocument, pos) {
	return {
		type: EDIT_DOCUMENT_SUCCESS,
		isEditDocumentSuccess: isEditDocumentSuccess,
		newDocument: newDocument,
		position: pos,
	};
}

function setEditDocumentError(editDocumentError) {
	return {
		type: EDIT_DOCUMENT_ERROR,
		editDocumentError: editDocumentError,
	};
}

export function editDocument(newDocument, pos, successCb) {
	console.log('new document', newDocument);
	return dispatch => {
		dispatch(setEditDocumentPending(true));
		dispatch(setEditDocumentSuccess(false));
		dispatch(setEditDocumentError(null));

		axios
			.put(`${ROOT_URL}`, newDocument, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('new document data', res.data);
				dispatch(setEditDocumentPending(false));
				dispatch(setEditDocumentSuccess(true, res.data, pos));
				successCb();
			})
			.catch(err => {
				console.log('error action document');
				dispatch(setEditDocumentPending(false));
				dispatch(setEditDocumentSuccess(false, null));
				dispatch(setEditDocumentError(err.response.data.message));
			});
	};
}
