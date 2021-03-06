/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: modifies practitioner's specialty state
 * Created: 18 Aug 2018
 * Last modified: 17 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import {
	GET_SPECIALTY_PENDING,
	GET_SPECIALTY_SUCCESS,
	GET_SPECIALTY_ERROR,
	ADD_SPECIALTY_PENDING,
	ADD_SPECIALTY_SUCCESS,
	ADD_SPECIALTY_ERROR,
	DELETE_SPECIALTY_PENDING,
	DELETE_SPECIALTY_SUCCESS,
	DELETE_SPECIALTY_ERROR,
	GET_PRAC_TYPE_SPECIALTY_PENDING,
	GET_PRAC_TYPE_SPECIALTY_SUCCESS,
	GET_PRAC_TYPE_SPECIALTY_ERROR,
} from '../actions/specialty.actions';

const INITIAL_STATE = {
	isGetSpecialtyPending: false,
	isGetSpecialtySuccess: false,
	getSpecialtyError: null,
	specialties: [],
	isAddSpecialtyPending: false,
	isAddSpecialtySuccess: false,
	addSpecialtyError: null,
	isDeleteSpecialtyPending: false,
	isDeleteSpecialtySuccess: false,
	deleteSpecialtyError: null,
	isGetPracTypeSpecialtyPending: false,
	isGetPracTypeSpecialtySuccess: false,
	pracTypeSpecialties: [],
	getPracTypeSpecialtyError: null,
};

export default function qualificationReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_SPECIALTY_PENDING:
			return {
				...state,
				isGetSpecialtyPending: action.isGetSpecialtyPending,
			};
		case GET_SPECIALTY_SUCCESS:
			return {
				...state,
				isGetSpecialtySuccess: action.isGetSpecialtySuccess,
				specialties: action.specialties,
			};
		case GET_SPECIALTY_ERROR:
			return {
				...state,
				getSpecialtyError: action.getSpecialtyError,
			};
		case ADD_SPECIALTY_PENDING:
			return {
				...state,
				isAddSpecialtyPending: action.isAddSpecialtyPending,
			};
		case ADD_SPECIALTY_SUCCESS:
			return {
				...state,
				isAddSpecialtySuccess: action.isAddSpecialtySuccess,
				specialties: action.specialty ? [...state.specialties, action.specialty] : state.specialties,
			};
		case ADD_SPECIALTY_ERROR:
			return {
				...state,
				addSpecialtyError: action.addSpecialtyError,
			};
		case DELETE_SPECIALTY_PENDING:
			return {
				...state,
				isDeleteSpecialtyPending: action.isDeleteSpecialtyPending,
			};
		case DELETE_SPECIALTY_SUCCESS:
			return {
				...state,
				isDeleteSpecialtySuccess: action.isDeleteSpecialtySuccess,
				specialties: state.specialties.filter((elem, idx) => {
					return idx !== action.position;
				}),
			};
		case DELETE_SPECIALTY_ERROR:
			return {
				...state,
				deleteSpecialtyError: action.deleteSpecialtyError,
			};
		case GET_PRAC_TYPE_SPECIALTY_PENDING:
			return {
				...state,
				isGetPracTypeSpecialtyPending: action.isGetPracTypeSpecialtyPending,
			};
		case GET_PRAC_TYPE_SPECIALTY_SUCCESS:
			return {
				...state,
				isGetPracTypeSpecialtySuccess: action.isGetPracTypeSpecialtySuccess,
				pracTypeSpecialties: action.pracTypeSpecialties,
			};
		case GET_PRAC_TYPE_SPECIALTY_ERROR:
			return {
				...state,
				getPracTypeSpecialtyError: action.getPracTypeSpecialtyError,
			};
		default:
			return state;
	}
}
