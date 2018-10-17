/** * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Actions setting the authentication redux state
 * Created: 10 Jul 2018
 * Last modified: 12 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * */
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';
export const LOGOUT = 'LOGOUT';

const ROOT_URL = 'https://localhost:8080/api/auth';

// @Dan: Login actionss
function setLoginPending(isLoginPending) {
	return {
		type: LOGIN_REQUEST,
		isLoginPending: isLoginPending,
	};
}

function setLoginSuccess(isLoginSuccess, user) {
	return {
		type: LOGIN_SUCCESS,
		isLoginSuccess: isLoginSuccess,
		user: user,
	};
}

function setLoginError(loginError) {
	return {
		type: LOGIN_ERROR,
		loginError: loginError,
	};
}

export function login(username, password, cb) {
	return dispatch => {
		dispatch(setLoginPending(true));
		dispatch(setLoginSuccess(false));
		dispatch(setLoginError(null));

		axios
			.post(`${ROOT_URL}/login`, {
				username,
				password,
			})
			.then(res => {
				// Add token to local storage
				window.localStorage.localToken = res.data.token;
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(true, res.data.user));
			})
			.catch(err => {
				dispatch(setLoginPending(false));
				cb();
				dispatch(setLoginSuccess(false, null));
				if (err.response && err.response.data) dispatch(setLoginError(err.response.data.message));
			});
	};
}

// @Dan: Remove token, reset login states
export function logout() {
	return dispatch => {
		localStorage.removeItem('localToken');
		dispatch(setLoginPending(false));
		dispatch(setLoginSuccess(false, null));
		dispatch(setLoginError(null));
	};
}

// @Dan: Check if a user is authorised for each Route
export function checkAuth() {
	return dispatch => {
		axios
			.post(
				`${ROOT_URL}/checkAuth`,
				{},
				{
					headers: {
						'x-access-token': localStorage.getItem('localToken'),
					},
				}
			)
			.then(() => {
				dispatch(setLoginSuccess(true));
			})
			.catch(() => {
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(false, null));
				dispatch(setLoginError(null));
			});
	};
}

// @Dan: Email verification actions
function setVerifyEmailPending(isVerifyEmailPending) {
	return {
		type: VERIFY_EMAIL_REQUEST,
		isVerifyEmailPending: isVerifyEmailPending,
	};
}

function setVerifyEmailSuccess(isVerifyEmailSuccess) {
	return {
		type: VERIFY_EMAIL_SUCCESS,
		isVerifyEmailSuccess: isVerifyEmailSuccess,
	};
}

function setVerifyEmailError(verifyEmailError) {
	return {
		type: VERIFY_EMAIL_ERROR,
		verifyEmailError: verifyEmailError,
	};
}

export function verifyEmail(token) {
	return dispatch => {
		dispatch(setVerifyEmailPending(true));
		dispatch(setVerifyEmailSuccess(false));
		dispatch(setVerifyEmailError(null));

		axios
			.put(
				`${ROOT_URL}/verifyEmail`,
				{},
				{
					params: {
						token,
					},
				}
			)
			.then(res => {
				dispatch(setVerifyEmailPending(false));
				dispatch(setVerifyEmailSuccess(true, res.data.user));
			})
			.catch(err => {
				dispatch(setVerifyEmailPending(false));
				dispatch(setVerifyEmailSuccess(false, null));
				if (err.response && err.response.data) dispatch(setVerifyEmailError(err.response.data.message));
			});
	};
}
