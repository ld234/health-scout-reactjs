/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Getting medical history info
 * Created: 28 Aug 2018
 * Last modified: 23 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import {
	GET_ALLERGIES_PENDING,
	GET_ALLERGIES_SUCCESS,
	GET_ALLERGIES_ERROR,
	GET_FAMILY_HISTORY_PENDING,
	GET_FAMILY_HISTORY_SUCCESS,
	GET_FAMILY_HISTORY_ERROR,
	GET_MEDICATION_HISTORY_PENDING,
	GET_MEDICATION_HISTORY_SUCCESS,
	GET_MEDICATION_HISTORY_ERROR,
} from '../actions/medical.history.actions';

const INITIAL_STATE = {
	isGetAllergiesSuccess: false,
	isGetAllergiesPending: false,
	getAllergiesError: null,
	isGetFamilyHistorySuccess: false,
	isGetFamilyHistoryPending: false,
	getFamilyHistoryError: null,
	isGetMedicationHistorySuccess: false,
	isGetMedicationHistoryPending: false,
	getMedicationHistoryError: null,
	allergies: [],
	familyHistory: [],
	medicationHistory: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALLERGIES_PENDING:
			return {
				...state,
				isGetAllergiesPending: action.isGetAllergiesPending,
			};
		case GET_ALLERGIES_SUCCESS:
			return {
				...state,
				isGetAllergiesSuccess: action.isGetAllergiesSuccess,
				allergies: action.allergies,
			};
		case GET_ALLERGIES_ERROR:
			return {
				...state,
				getAllergiesError: action.getAllergiesError,
			};
		case GET_FAMILY_HISTORY_PENDING:
			return {
				...state,
				isGetFamilyHistoryPending: action.isGetFamilyHistoryPending,
			};
		case GET_FAMILY_HISTORY_SUCCESS:
			return {
				...state,
				isGetFamilyHistorySuccess: action.isGetFamilyHistorySuccess,
				familyHistory: action.familyHistory,
			};
		case GET_FAMILY_HISTORY_ERROR:
			return {
				...state,
				getNewNewClientsError: action.getNewNewClientsError,
			};
		case GET_MEDICATION_HISTORY_PENDING:
			return {
				...state,
				isGetMedicationHistoryPending: action.isGetMedicationHistoryPending,
			};
		case GET_MEDICATION_HISTORY_SUCCESS:
			return {
				...state,
				isGetMedicationHistorySuccess: action.isGetMedicationHistorySuccess,
				medicationHistory: action.medicationHistory,
			};
		case GET_MEDICATION_HISTORY_ERROR:
			return {
				...state,
				getMedicationHistoryError: action.getMedicationHistoryError,
			};
		default:
			return state;
	}
};
