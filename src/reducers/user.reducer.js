import { GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR } from '../actions/user.actions';
const INITIAL_STATE = {
	isGetUserPending: false,
	isGetUserSuccess: false,
	getUserError: null,
	user: null,
};

export default function getUserDetails(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_USER_PENDING:
			return {
				...state,
				isGetUserPending: action.isGetUserPending,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				isGetUserSuccess: action.isGetUserSuccess,
				user: action.user,
			};
		case GET_USER_ERROR:
			return {
				...state,
				getUserError: action.getUserError,
			};
		default:
			return state;
	}
}
