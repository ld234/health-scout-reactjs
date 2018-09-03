import {
	ADD_CONSULTATION_PENDING,
	ADD_CONSULTATION_SUCCESS,
	ADD_CONSULTATION_ERROR,
	GET_CONSULTATIONS_PENDING,
	GET_CONSULTATIONS_SUCCESS,
	GET_CONSULTATIONS_ERROR,
} from '../actions/consultation.actions';

const INITIAL_STATE = {
	isAddConsultationSuccess: false,
	isAddConsultationPending: false,
	addConsultationError: null,
	isGetConsultationsSuccess: false,
	isGetConsultationsPending: false,
	getConsultationsError: null,
	consultations: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_CONSULTATION_PENDING:
			return {
				...state,
				isAddConsultationPending: action.isAddConsultationPending,
			};
		case ADD_CONSULTATION_SUCCESS:
			console.log('action', action.isAddConsultationSuccess);
			return {
				...state,
				isAddConsultationSuccess: action.isAddConsultationSuccess,
			};
		case ADD_CONSULTATION_ERROR:
			return {
				...state,
				addConsultationError: action.addConsultationError,
			};
		case GET_CONSULTATIONS_PENDING:
			return {
				...state,
				isGetConsultationsPending: action.isGetConsultationsPending,
			};
		case GET_CONSULTATIONS_SUCCESS:
			return {
				...state,
				isGetConsultationsSuccess: action.isGetConsultationsSuccess,
				consultations: action.consultations,
			};
		case GET_CONSULTATIONS_ERROR:
			return {
				...state,
				getNewNewClientsError: action.getNewNewClientsError,
			};
		default:
			return state;
	}
};
