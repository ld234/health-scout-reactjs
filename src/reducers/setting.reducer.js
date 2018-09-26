import {
	SET_NEWPASSWORD_PENDING,
	SET_NEWPASSWORD_ERROR,
	SET_NEWPASSWORD_SUCCESS,
	GET_BUNDLEPAYMENT_SUCCESS,
	GET_BUNDLEPAYMENT_PENDING,
	GET_BUNDLEPAYMENT_ERROR,
} from '../actions/setting.actions';

const INITIAL_STATE = {
	isSetNewPasswordPending: false,
	isSetNewPasswordError: false,
	isSetNewPasswordSuccess: false,
	isGetBundlePaymentPending: false,
	isGetBundlePaymentSuccess: false,
	isGetBundlePaymentError: false,
};

export default function settingReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_NEWPASSWORD_PENDING:
			return {
				...state,
				isSetNewPasswordPending: action.isSetNewPasswordPending,
			};
		case SET_NEWPASSWORD_ERROR:
			return {
				...state,
				isSetNewPasswordError: action.isSetNewPasswordError,
			};
		case SET_NEWPASSWORD_SUCCESS:
			return {
				...state,
				isSetNewPasswordSuccess: action.isSetNewPasswordSuccess,
			};
		case GET_BUNDLEPAYMENT_SUCCESS:
			return {
				...state,
				isGetBundlePaymentSuccess: action.isGetBundlePaymentSuccess,
			};
		case GET_BUNDLEPAYMENT_PENDING:
			return {
				...state,
				isGetBundlePaymentPending: action.isGetBundlePaymentPending,
			};
		case GET_BUNDLEPAYMENT_ERROR:
			return {
				...state,
				isGetBundlePaymentError: action.isGetBundlePaymentError,
			};
		default:
			return state;
	}
}
