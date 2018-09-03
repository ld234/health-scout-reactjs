import axios from 'axios';

export const GET_ALLERGIES_PENDING = 'GET_ALLERGIES_PENDING';
export const GET_ALLERGIES_SUCCESS = 'GET_ALLERGIES_SUCCESS';
export const GET_ALLERGIES_ERROR = 'GET_ALLERGIES_ERROR';
export const GET_FAMILY_HISTORY_PENDING = 'GET_FAMILY_HISTORY_PENDING';
export const GET_FAMILY_HISTORY_SUCCESS = 'GET_FAMILY_HISTORY_SUCCESS';
export const GET_FAMILY_HISTORY_ERROR = 'GET_FAMILY_HISTORY_ERROR';
export const GET_MEDICATION_HISTORY_PENDING = 'GET_MEDICATION_HISTORY_PENDING';
export const GET_MEDICATION_HISTORY_SUCCESS = 'GET_MEDICATION_HISTORY_SUCCESS';
export const GET_MEDICATION_HISTORY_ERROR = 'GET_MEDICATION_HISTORY_ERROR';

const ROOT_URL = 'http://localhost:8080/api/clients/profile/medicalDetails';

function setGetAllergiesPending(isGetAllergiesPending) {
	return {
		type: GET_ALLERGIES_PENDING,
		isGetAllergiesPending: isGetAllergiesPending,
	};
}

function setGetAllergiesSuccess(isGetAllergiesSuccess, allergies) {
	return {
		type: GET_ALLERGIES_SUCCESS,
		isGetAllergiesSuccess: isGetAllergiesSuccess,
		allergies,
	};
}

function setGetAllergiesError(getAllergiesError) {
	return {
		type: GET_ALLERGIES_ERROR,
		getAllergiesError: getAllergiesError,
	};
}

export function getAllergies(patientUsername) {
	return dispatch => {
		dispatch(setGetAllergiesPending(true));
		dispatch(setGetAllergiesSuccess(false));
		dispatch(setGetAllergiesError(null));

		axios
			.get(`${ROOT_URL}/allergies`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
				params: {
					patientUsername,
				},
			})
			.then(res => {
				dispatch(setGetAllergiesPending(false));
				dispatch(setGetAllergiesSuccess(true, res.data.message));
			})
			.catch(err => {
				dispatch(setGetAllergiesPending(false));
				dispatch(setGetAllergiesSuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetAllergiesError(err.response.data.message));
			});
	};
}

function setGetFamilyHistoryPending(isGetFamilyHistoryPending) {
	return {
		type: GET_FAMILY_HISTORY_PENDING,
		isGetFamilyHistoryPending: isGetFamilyHistoryPending,
	};
}

function setGetFamilyHistorySuccess(isGetFamilyHistorySuccess, familyHistory) {
	return {
		type: GET_FAMILY_HISTORY_SUCCESS,
		isGetFamilyHistorySuccess: isGetFamilyHistorySuccess,
		familyHistory,
	};
}

function setGetFamilyHistoryError(getFamilyHistoryError) {
	return {
		type: GET_FAMILY_HISTORY_ERROR,
		getFamilyHistoryError: getFamilyHistoryError,
	};
}

export function getFamilyHistory(patientUsername) {
	return dispatch => {
		dispatch(setGetFamilyHistoryPending(true));
		dispatch(setGetFamilyHistorySuccess(false));
		dispatch(setGetFamilyHistoryError(null));

		axios
			.get(`${ROOT_URL}/familyHistory`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
				params: {
					patientUsername,
				},
			})
			.then(res => {
				dispatch(setGetFamilyHistoryPending(false));
				dispatch(setGetFamilyHistorySuccess(true, res.data.message));
			})
			.catch(err => {
				dispatch(setGetFamilyHistoryPending(false));
				dispatch(setGetFamilyHistorySuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetFamilyHistoryError(err.response.data.message));
			});
	};
}

function setGetMedicationHistoryPending(isGetMedicationHistoryPending) {
	return {
		type: GET_MEDICATION_HISTORY_PENDING,
		isGetMedicationHistoryPending: isGetMedicationHistoryPending,
	};
}

function setGetMedicationHistorySuccess(isGetMedicationHistorySuccess, medicationHistory) {
	return {
		type: GET_MEDICATION_HISTORY_SUCCESS,
		isGetMedicationHistorySuccess: isGetMedicationHistorySuccess,
		medicationHistory,
	};
}

function setGetMedicationHistoryError(getMedicationHistoryError) {
	return {
		type: GET_MEDICATION_HISTORY_ERROR,
		getMedicationHistoryError: getMedicationHistoryError,
	};
}

export function getMedicationHistory(patientUsername) {
	return dispatch => {
		dispatch(setGetMedicationHistoryPending(true));
		dispatch(setGetMedicationHistorySuccess(false));
		dispatch(setGetMedicationHistoryError(null));

		axios
			.get(`${ROOT_URL}/medicationHistory`, {
				headers: {
					'x-access-token': localStorage.getItem('localToken'),
				},
				params: {
					patientUsername,
				},
			})
			.then(res => {
				dispatch(setGetMedicationHistoryPending(false));
				dispatch(setGetMedicationHistorySuccess(true, res.data.message));
			})
			.catch(err => {
				dispatch(setGetMedicationHistoryPending(false));
				dispatch(setGetMedicationHistorySuccess(false, null));
				if (err.response && err.response.data) dispatch(setGetMedicationHistoryError(err.response.data.message));
			});
	};
}
