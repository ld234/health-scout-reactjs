import axios from 'axios';
import { logout } from './auth.actions';
export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

const ROOT_URL = 'https://localhost:8080/api/user';

function setGetUserPending(isGetUserPending) {
	return {
		type: GET_USER_PENDING,
		isGetUserPending: isGetUserPending,
	};
}

function setGetUserSuccess(isGetUserSuccess, user) {
	return {
		type: GET_USER_SUCCESS,
		isGetUserSuccess: isGetUserSuccess,
		user: user,
	};
}

function setGetUserError(getUserError) {
	return {
		type: GET_USER_ERROR,
		getUserError: getUserError,
	};
}

export function getUserDetails(cb) {
	return dispatch => {
		dispatch(setGetUserPending(true));
		dispatch(setGetUserSuccess(false));
		dispatch(setGetUserError(null));

		axios
			.get(ROOT_URL, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
			})
			.then(res => {
				dispatch(setGetUserPending(false));
				dispatch(setGetUserSuccess(true, res.data));
				if (cb) cb(res.data.pracType);
			})
			.catch(err => {
				dispatch(setGetUserPending(false));
				dispatch(setGetUserSuccess(false, null));
				if (err.response && err.response.data.message) dispatch(setGetUserError(err.response.data.message));
				dispatch(logout());
			});
	};
}
