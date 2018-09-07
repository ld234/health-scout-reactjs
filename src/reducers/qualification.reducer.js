import {
	GET_QUALIFICATION_PENDING,
	GET_QUALIFICATION_SUCCESS,
	GET_QUALIFICATION_ERROR,
	ADD_QUALIFICATION_PENDING,
	ADD_QUALIFICATION_SUCCESS,
	ADD_QUALIFICATION_ERROR,
	EDIT_QUALIFICATION_PENDING,
	EDIT_QUALIFICATION_SUCCESS,
	EDIT_QUALIFICATION_ERROR,
	DELETE_QUALIFICATION_PENDING,
	DELETE_QUALIFICATION_SUCCESS,
	DELETE_QUALIFICATION_ERROR,
} from '../actions/qualification.actions';

const INITIAL_STATE = {
	isGetQualificationPending: false,
	isGetQualificationSuccess: false,
	getQualificationError: null,
	qualifications: [],
	isAddQualificationPending: false,
	isAddQualificationSuccess: false,
	addQualificationError: null,
	isEditQualificationPending: false,
	isEditQualificationSuccess: false,
	editQualificationError: null,
	isEditQualificationPending: false,
	isEditQualificationSuccess: false,
	editQualificationError: null,
	isDeleteQualificationPending: false,
	isDeleteQualificationSuccess: false,
	deleteQualificationError: null,
	justEditIndex: -1,
};

export default function qualificationReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_QUALIFICATION_PENDING:
			return {
				...state,
				isGetQualificationPending: action.isGetQualificationPending,
			};
		case GET_QUALIFICATION_SUCCESS:
			return {
				...state,
				isGetQualificationSuccess: action.isGetQualificationSuccess,
				qualifications: action.qualifications,
			};
		case GET_QUALIFICATION_ERROR:
			return {
				...state,
				getQualificationError: action.getQualificationError,
			};
		case ADD_QUALIFICATION_PENDING:
			return {
				...state,
				isAddQualificationPending: action.isAddQualificationPending,
			};
		case ADD_QUALIFICATION_SUCCESS:
			return {
				...state,
				isAddQualificationSuccess: action.isAddQualificationSuccess,
				qualifications: action.qualification
					? [...state.qualifications, action.qualification].sort((a, b) => {
							return b.graduateYear - a.graduateYear;
					  })
					: state.qualifications,
			};
		case ADD_QUALIFICATION_ERROR:
			return {
				...state,
				addQualificationError: action.addQualificationError,
			};
		case EDIT_QUALIFICATION_PENDING:
			return {
				...state,
				isEditQualificationPending: action.isAddQualificationPending,
			};
		case EDIT_QUALIFICATION_SUCCESS:
			let newQualificationList = state.qualifications.slice();
			if (action.newQualification)
				newQualificationList[action.newQualification.position] = action.newQualification.qualification;
			return {
				...state,
				isEditQualificationSuccess: action.isEditQualificationSuccess,
				qualifications: action.newQualification
					? newQualificationList.sort((a, b) => {
							return b.graduateYear - a.graduateYear;
					  })
					: state.qualifications,
				justEditIndex: action.newQualification ? action.newQualification.position : state.justEditIndex,
			};
		case EDIT_QUALIFICATION_ERROR:
			return {
				...state,
				editQualificationError: action.editQualificationError,
			};
		case DELETE_QUALIFICATION_PENDING:
			return {
				...state,
				isEditQualificationPending: action.isDeleteQualificationPending,
			};
		case DELETE_QUALIFICATION_SUCCESS:
			return {
				...state,
				isDeleteQualificationSuccess: action.isDeleteQualificationSuccess,
				qualifications: state.qualifications.filter((elem, idx) => {
					return idx !== action.position;
				}),
			};
		case DELETE_QUALIFICATION_ERROR:
			return {
				...state,
				deleteQualificationError: action.deleteQualificationError,
			};
		default:
			return state;
	}
}
