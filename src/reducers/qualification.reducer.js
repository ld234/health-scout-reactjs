import { GET_QUALIFICATION_PENDING, GET_QUALIFICATION_SUCCESS, GET_QUALIFICATION_ERROR, 
    ADD_QUALIFICATION_PENDING, ADD_QUALIFICATION_SUCCESS, ADD_QUALIFICATION_ERROR, } from '../actions/qualification.actions';

const INITIAL_STATE = {
    isGetQualificationPending: false,
    isGetQualificationSuccess: false,
    getQualificationError: null,
    qualifications: [],
    isAddQualificationPending: false,
    isAddQualificationSuccess: false,
    addQualificationPending: null
};

export default function qualificationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_QUALIFICATION_PENDING:
            return { ...state,
                isGetQualificationPending: action.isGetQualificationPending
            };
        case GET_QUALIFICATION_SUCCESS:
            return { ...state,
                isGetQualificationSuccess: action.isGetQualificationSuccess,
                qualifications: action.qualifications
            };
        case GET_QUALIFICATION_ERROR:
            return { ...state,
                getQualificationError: action.getQualificationError
            };
        case ADD_QUALIFICATION_PENDING:
            return { ...state,
                isAddQualificationPending: action.isAddQualificationPending
            };
        case ADD_QUALIFICATION_SUCCESS:
            return { ...state,
                isAddQualificationSuccess: action.isAddQualificationSuccess,
                qualifications: action.qualification 
                ? [...state.qualifications, action.qualification ] : state.qualifications
            };
        case ADD_QUALIFICATION_ERROR:
            return { ...state,
                addQualificationError: action.addQualificationError
            };
        default:
            return state;
    }
}

