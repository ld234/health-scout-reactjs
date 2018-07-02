import {LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_ERROR,LOGOUT} from '../actions/auth.actions';
let user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = user ? { isLoginPending: false, isLoginSuccess: true, user, loginError: null } : {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  user: null
};

export default function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state,
        isLoginPending: action.isLoginPending
      };
    case LOGIN_SUCCESS:
      return { ...state,
        isLoginSuccess: action.isLoginSuccess,
		user: action.user
      };
    case LOGIN_ERROR:
      return {...state,
        loginError: action.loginError
      };
    case LOGOUT:
      return {
				isLoginSuccess: false,
				isLoginPending: false,
				loginError: null,
				user: null
			  };
    default:
      return state;
  }
}