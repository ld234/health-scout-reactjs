/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Returning consultation state
 * Created: 12 Aug 2018
 * Last modified: 7 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
			let newConsList = state.consultations.slice(); // Get new consultation list object
			let newCons = {};
			let index = -1;
			if (action.newConsultation) {
				// Find index of the editted consultation in the current list of consultation
				index = newConsList.findIndex(
					cons =>
						cons.date === action.oldConsultation.oldConsultDate &&
						cons.pracUsername === action.newConsultation.pracUsername
				);
				// Set new consultation based on the editted content
				newCons = {
					...state.consultations[index],
					summary: action.newConsultation.summary ? action.newConsultation.summary : state.consultations[index].summary,
					date: action.newConsultation.consultDate
						? action.newConsultation.consultDate
						: state.consultations[index].date,
					intervention: action.newConsultation.intervention
						? action.newConsultation.intervention
						: state.consultations[index].intervention,
					title: action.newConsultation.title ? action.newConsultation.title : state.consultations[index].title,
					pracUsername: action.newConsultation.pracUsername
						? action.newConsultation.pracUsername
						: state.consultations[index].pracUsername,
				};
				newConsList[index] = newCons;
			}
			return {
				...state,
				isEditConsultationSuccess: action.isEditConsultationSuccess,
				consultations: action.newConsultation
					? newConsList.sort((a, b) => {
							return b.date.localeCompare(a.date); // Sort by date desc
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
