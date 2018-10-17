/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Returning new authentication state
 * Created: 12 Jul 2018
 * Last modified: 6 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	VERIFY_EMAIL_REQUEST,
	VERIFY_EMAIL_SUCCESS,
	VERIFY_EMAIL_ERROR,
	LOGOUT,
} from '../actions/auth.actions';
const user = localStorage.getItem('localToken');
const INITIAL_STATE = user
	? {
			isLoginPending: false,
			isLoginSuccess: true,
			user,
			loginError: null,
			isVerifyEmailSuccess: true,
			isVerifyEmailPending: false,
			verifyEmailError: null,
	  }
	: {
			isLoginSuccess: false,
			isLoginPending: false,
			loginError: null,
			user: null,
			isVerifyEmailSuccess: false,
			isVerifyEmailPending: false,
			verifyEmailError: null,
	  };

export default function authentication(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoginPending: action.isLoginPending,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoginSuccess: action.isLoginSuccess,
				user: action.user ? action.user : state.user,
			};
		case LOGIN_ERROR:
			return {
				...state,
				loginError: action.loginError,
			};
		case LOGOUT:
			return {
				isLoginSuccess: false,
				isLoginPending: false,
				loginError: null,
				user: null,
			};
		case VERIFY_EMAIL_REQUEST:
			return {
				...state,
				isVerifyEmailPending: action.isVerifyEmailPending,
			};
		case VERIFY_EMAIL_SUCCESS:
			return {
				...state,
				isVerifyEmailSuccess: action.isVerifyEmailSuccess,
			};
		case VERIFY_EMAIL_ERROR:
			return {
				...state,
				verifyEmailError: action.verifyEmailError,
			};
		default:
			return state;
	}
}
