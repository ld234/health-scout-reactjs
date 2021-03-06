/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Actions responsible for the settings of practitioner's account
 * Created: 3 August 2018
 * Last modified: 23 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import axios from 'axios';
export const SET_NEWPASSWORD_PENDING = 'SET_NEWPASSWORD_PENDING';
export const SET_NEWPASSWORD_ERROR = 'SET_NEWPASSWORD_ERROR';
export const SET_NEWPASSWORD_SUCCESS = 'SET_NEWPASSWORD_SUCCESS';
export const GET_BUNDLEPAYMENT_SUCCESS = 'GET_BUNDLEPAYMENT_SUCCESS';
export const GET_BUNDLEPAYMENT_PENDING = 'GET_BUNDLEPAYMENT_PENDING';
export const GET_BUNDLEPAYMENT_ERROR = 'GET_BUNDLEPAYMENT_ERROR';

const ROOT_PASSWORD_URL = 'https://localhost:8080/api/user/changePassword';
const ROOT_CHARGE_URL = 'https://localhost:8080/api/charge/';

function setNewPasswordPending(isSetNewPasswordPending) {
	return {
		type: SET_NEWPASSWORD_PENDING,
		isSetNewPasswordPending: isSetNewPasswordPending,
	};
}

function setNewPasswordError(isSetNewPasswordError) {
	return {
		type: SET_NEWPASSWORD_ERROR,
		isSetNewPasswordError: isSetNewPasswordError,
	};
}

function setNewPasswordSuccess(isSetNewPasswordSuccess) {
	return {
		type: SET_NEWPASSWORD_SUCCESS,
		isSetNewPasswordSuccess: isSetNewPasswordSuccess,
	};
}

export function setNewPassword(data) {
	return dispatch => {
		dispatch(setNewPasswordPending(true));
		dispatch(setNewPasswordSuccess(false));
		dispatch(setNewPasswordError(null));

		axios
			.put(`${ROOT_PASSWORD_URL}`, data, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setNewPasswordPending(false));
				dispatch(setNewPasswordSuccess(true));
				setTimeout(() => dispatch(setNewPasswordSuccess(false)), 2000);
			})
			.catch(err => {
				dispatch(setNewPasswordPending(false));
				dispatch(setNewPasswordSuccess(false, null));
				if (err.response && err.response.data) dispatch(setNewPasswordError(err.response.data.message));
			});
	};
}

function setGetBundlePaymentPending(isGetBundlePaymentPending) {
	return {
		type: GET_BUNDLEPAYMENT_PENDING,
		isGetBundlePaymentPending: isGetBundlePaymentPending,
	};
}

function setGetBundlePaymentError(isGetBundlePaymentError) {
	return {
		type: GET_BUNDLEPAYMENT_ERROR,
		isGetBundlePaymentError: isGetBundlePaymentError,
	};
}

function setGetBundlePaymentSuccess(isGetBundlePaymentSuccess) {
	return {
		type: GET_BUNDLEPAYMENT_SUCCESS,
		isGetBundlePaymentSuccess: isGetBundlePaymentSuccess,
	};
}

export function getBundlePayment(data) {
	return dispatch => {
		dispatch(setGetBundlePaymentPending(true));
		dispatch(setGetBundlePaymentSuccess(false));
		dispatch(setGetBundlePaymentError(null));

		axios
			.put(`${ROOT_CHARGE_URL}`, data, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setGetBundlePaymentPending(false));
				dispatch(setGetBundlePaymentSuccess(true));
			})
			.catch(err => {
				dispatch(setGetBundlePaymentPending(false));
				dispatch(setGetBundlePaymentSuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetBundlePaymentError(err.response.data.message));
			});
	};
}

export function resetPayment() {
	return dispatch => {
		dispatch(setGetBundlePaymentPending(false));
		dispatch(setGetBundlePaymentSuccess(false));
		dispatch(setGetBundlePaymentError(null));
	};
}
