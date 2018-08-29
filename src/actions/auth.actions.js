import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

const ROOT_URL = 'http://localhost:8080/api/auth';

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
				console.log('data', res.data.user);
				window.localStorage.localToken = res.data.token;
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(true, res.data.user));
			})
			.catch(err => {
				dispatch(setLoginPending(false));
				cb();
				dispatch(setLoginSuccess(false, null));
				if (err.response.data) dispatch(setLoginError(err.response.data.message));
			});
	};
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('localToken');
		dispatch(setLoginPending(false));
		dispatch(setLoginSuccess(false, null));
		dispatch(setLoginError(null));
	};
}

export function checkAuth() {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/checkAuth`)
			.then(() => {
				dispatch(setLoginSuccess(true));
			})
			.catch(() => logout());
	};
}
