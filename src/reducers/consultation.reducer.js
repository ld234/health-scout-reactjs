import {
	ADD_CONSULTATION_PENDING,
	ADD_CONSULTATION_SUCCESS,
	ADD_CONSULTATION_ERROR,
	GET_CONSULTATIONS_PENDING,
	GET_CONSULTATIONS_SUCCESS,
	GET_CONSULTATIONS_ERROR,
	EDIT_CONSULTATION_PENDING,
	EDIT_CONSULTATION_SUCCESS,
	EDIT_CONSULTATION_ERROR,
} from '../actions/consultation.actions';

const INITIAL_STATE = {
	isAddConsultationSuccess: false,
	isAddConsultationPending: false,
	addConsultationError: null,
	isGetConsultationsSuccess: false,
	isGetConsultationsPending: false,
	getConsultationsError: null,
	consultations: [],
	isEditConsultationsSuccess: false,
	isEditConsultationsPending: false,
	editConsultationsError: null,
	justEditIndex: -1,
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
		case EDIT_CONSULTATION_PENDING:
			return {
				...state,
				isEditConsultationPending: action.isEditConsultationPending,
			};
		case EDIT_CONSULTATION_SUCCESS:
			let newConsList = state.consultations.slice();
			let newCons = {};
			console.log('new cons', action.newConsultation);
			if (action.newConsultation)
				newCons = {
					...state.consultations[action.idx],
					summary: action.newConsultation.summary
						? action.newConsultation.summary
						: state.consultations[action.idx].summary,
					date: action.newConsultation.consultDate,
					intervention: action.newConsultation.intervention
						? action.newConsultation.intervention
						: state.consultations[action.idx].intervention,
					title: action.newConsultation.title ? action.newConsultation.title : state.consultations[action.idx].title,
				};
			if (action.newConsultation) newConsList[action.idx] = newCons;
			console.log('newConsList', newConsList);
			return {
				...state,
				isEditConsultationSuccess: action.isEditConsultationSuccess,
				consultations: action.newConsultation
					? newConsList.sort((a, b) => {
							return b.date.localeCompare(a.date);
					  })
					: state.consultations,
				justEditIndex: action.newConsultation ? action.idx : state.justEditIndex,
			};
		case EDIT_CONSULTATION_ERROR:
			return {
				...state,
				editConsultationError: action.editConsultationError,
			};
		default:
			return state;
	}
};
