import axios from 'axios';
export const GET_EXCHANGEDOCUMENTS_PENDING = 'GET_EXCHANGEDOCUMENTS_PENDING';
export const GET_EXCHANGEDOCUMENTS_ERROR = 'GET_EXCHANGEDOCUMENTS_ERROR';
export const GET_EXCHANGEDOCUMENTS_SUCCESS = 'GET_EXCHANGEDOCUMENTS_SUCCESS';
export const GET_NEWRECEIVEDDOCUMENTS_PENDING = 'GET_NEWRECEIVEDDOCUMENTS_PENDING';
export const GET_NEWRECEIVEDDOCUMENTS_ERROR = 'GET_NEWRECEIVEDDOCUMENTS_ERROR';
export const GET_NEWRECEIVEDDOCUMENTS_SUCCESS = 'GET_NEWRECEIVEDDOCUMENTS_SUCCESS';
export const GET_OLDRECEIVEDDOCUMENTS_PENDING = 'GET_OLDRECEIVEDDOCUMENTS_PENDING';
export const GET_OLDRECEIVEDDOCUMENTS_ERROR = 'GET_OLDRECEIVEDDOCUMENTS_ERROR';
export const GET_OLDRECEIVEDDOCUMENTS_SUCCESS = 'GET_OLDRECEIVEDDOCUMENTS_SUCCESS';
export const SEND_EXCHANGEDOCUMENTS_PENDING = 'SEND_EXCHANGEDOCUMENTS_PENDING';
export const SEND_EXCHANGEDOCUMENTS_ERROR = 'SEND_EXCHANGEDOCUMENTS_ERROR';
export const SEND_EXCHANGEDOCUMENTS_SUCCESS = 'SEND_EXCHANGEDOCUMENTS_SUCCESS';

const ROOT_URL = 'http://localhost:8080/sapi/clients/profile/exchangeDocument';

function setGetExchangeDocumentsPending(isGetExchangeDocumentsPending) {
	return {
		type: GET_EXCHANGEDOCUMENTS_PENDING,
		isGetExchangeDocumentsPending: isGetExchangeDocumentsPending,
	};
}
function setGetExchangeDocumentsSuccess(isGetExchangeDocumentsSuccess, d) {
	console.log('[action success]:', d);
	return {
		type: GET_EXCHANGEDOCUMENTS_SUCCESS,
		isGetExchangeDocumentsSuccess: isGetExchangeDocumentsSuccess,
		exchangeDocuments: d,
	};
}
function setGetExchangeDocumentsError(isGetExchangeDocumentsError) {
	return {
		type: GET_EXCHANGEDOCUMENTS_ERROR,
		isGetExchangeDocumentsError: isGetExchangeDocumentsError,
	};
}
export function getDocuments(username) {
	return dispatch => {
		dispatch(setGetExchangeDocumentsPending(true));
		dispatch(setGetExchangeDocumentsSuccess(false));
		dispatch(setGetExchangeDocumentsError(null));

		axios
			.get(`${ROOT_URL}?patientUsername=` + username, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('success!', res);
				dispatch(setGetExchangeDocumentsPending(false));
				dispatch(setGetExchangeDocumentsSuccess(true, res.data));
			})
			.catch(err => {
				console.log('error!', err);
				dispatch(setGetExchangeDocumentsPending(false));
				dispatch(setGetExchangeDocumentsSuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetExchangeDocumentsError(err.response.data.message));
			});
	};
}

function setSendExchangeDocumentsPending(isSendExchangeDocumentsPending) {
	return {
		type: SEND_EXCHANGEDOCUMENTS_PENDING,
		isSendExchangeDocumentsPending: isSendExchangeDocumentsPending,
	};
}
function setSendExchangeDocumentsSuccess(isSendExchangeDocumentsSuccess) {
	return {
		type: SEND_EXCHANGEDOCUMENTS_SUCCESS,
		isSendExchangeDocumentsSuccess: isSendExchangeDocumentsSuccess,
	};
}
function setSendExchangeDocumentsError(isSendExchangeDocumentsError) {
	return {
		type: SEND_EXCHANGEDOCUMENTS_ERROR,
		isSendExchangeDocumentsError: isSendExchangeDocumentsError,
	};
}

export function sendDocuments(arrForms, successCb) {
	console.log('[Action.js]:', arrForms);
	return dispatch => {
		dispatch(setSendExchangeDocumentsPending(true));
		dispatch(setSendExchangeDocumentsSuccess(false));
		dispatch(setSendExchangeDocumentsError(null));
		const promises = arrForms.map(form => {
			return axios.post(`${ROOT_URL}`, form, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			});
		});
		Promise.all(promises)
			.then(res => {
				console.log('success!', res);
				dispatch(setSendExchangeDocumentsPending(false));
				dispatch(setSendExchangeDocumentsSuccess(true));
				dispatch(setSendExchangeDocumentsError(null));
				successCb();
			})
			.catch(err => {
				console.log('error!', err);
				dispatch(setSendExchangeDocumentsPending(false));
				dispatch(setSendExchangeDocumentsSuccess(false));
				if (err.response && err.response.data) dispatch(setSendExchangeDocumentsError(err.response.data.message));
			});
	};
}

function setGetNewReceivedDocumentPending(isGetNewReceivedDocumentPending) {
	return {
		type: GET_NEWRECEIVEDDOCUMENTS_PENDING,
		isGetNewReceivedDocumentPending: isGetNewReceivedDocumentPending,
	};
}
function setGetNewReceivedDocumentSuccess(isGetNewReceivedDocumentSuccess, d) {
	return {
		type: GET_NEWRECEIVEDDOCUMENTS_SUCCESS,
		isGetNewReceivedDocumentSuccess: isGetNewReceivedDocumentSuccess,
		unseenDocuments: d,
	};
}
function setGetNewReceivedDocumentError(isGetNewReceivedDocumentError) {
	return {
		type: GET_NEWRECEIVEDDOCUMENTS_ERROR,
		isGetNewReceivedDocumentError: isGetNewReceivedDocumentError,
	};
}
export function getNewRecievedDocuments(patientUsername) {
	return dispatch => {
		dispatch(setGetNewReceivedDocumentPending(true));
		dispatch(setGetNewReceivedDocumentSuccess(false));
		dispatch(setGetNewReceivedDocumentError(null));
		axios
			.get(`${ROOT_URL}/newReceivedDocuments?patientUsername=` + patientUsername, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('[NEW RECEIVED DOC] success! ', res);
				dispatch(setGetNewReceivedDocumentPending(false));
				dispatch(setGetNewReceivedDocumentError(null));
				dispatch(setGetNewReceivedDocumentSuccess(true, res.data));
			})
			.catch(err => {
				console.log('error!', err);
				dispatch(setGetNewReceivedDocumentPending(false));
				dispatch(setGetNewReceivedDocumentSuccess(false));
				if (err.response && err.response.data) dispatch(setGetNewReceivedDocumentError(err.response.data.message));
			});
	};
}

function setGetOldReceivedDocumentPending(isGetOldReceivedDocumentPending) {
	return {
		type: GET_OLDRECEIVEDDOCUMENTS_PENDING,
		isGetOldReceivedDocumentPending: isGetOldReceivedDocumentPending,
	};
}
function setGetOldReceivedDocumentSuccess(isGetOldReceivedDocumentSuccess, d) {
	return {
		type: GET_OLDRECEIVEDDOCUMENTS_SUCCESS,
		isGetOldReceivedDocumentSuccess: isGetOldReceivedDocumentSuccess,
		seenDocuments: d,
	};
}
function setGetOldReceivedDocumentError(isGetOldReceivedDocumentError) {
	return {
		type: GET_OLDRECEIVEDDOCUMENTS_ERROR,
		isGetOldReceivedDocumentError: isGetOldReceivedDocumentError,
	};
}
export function getOldRecievedDocuments(patientUsername) {
	return dispatch => {
		dispatch(setGetOldReceivedDocumentPending(true));
		dispatch(setGetOldReceivedDocumentSuccess(false));
		dispatch(setGetOldReceivedDocumentError(null));
		axios
			.get(`${ROOT_URL}/oldReceivedDocuments?patientUsername=` + patientUsername, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				console.log('[OLD RECIEVED DOC] success! ', res);
				dispatch(setGetOldReceivedDocumentPending(false));
				dispatch(setGetOldReceivedDocumentError(null));
				dispatch(setGetOldReceivedDocumentSuccess(true, res.data));
			})
			.catch(err => {
				console.log('error!', err);
				dispatch(setGetOldReceivedDocumentPending(false));
				dispatch(setGetOldReceivedDocumentSuccess(false));
				if (err.response && err.response.data) dispatch(setGetOldReceivedDocumentError(err.response.data.message));
			});
	};
}