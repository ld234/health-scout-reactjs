import { GET_DOCUMENT_PENDING, GET_DOCUMENT_SUCCESS, GET_DOCUMENT_ERROR, 
    ADD_DOCUMENT_PENDING, ADD_DOCUMENT_SUCCESS, ADD_DOCUMENT_ERROR, 
    EDIT_DOCUMENT_PENDING, EDIT_DOCUMENT_SUCCESS, EDIT_DOCUMENT_ERROR,
	DELETE_DOCUMENT_PENDING, DELETE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_ERROR,} from '../actions/document.action';

const INITIAL_STATE = {
    isGetDocumentPending: false,
    isGetDocumentSuccess: false,
    getDocumentError: null,
    documents: [],
    isAddDocumentPending: false,
    isAddDocumentSuccess: false,
    addDocumentError: null,
    isEditDocumentPending: false,
    isEditDocumentSuccess: false,
    editDocumentError: null,
	isEditDocumentPending: false,
    isEditDocumentSuccess: false,
    editDocumentError: null,
	isDeleteDocumentPending: false,
    isDeleteDocumentSuccess: false,
    deleteDocumentError: null,
};

export default function documentReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DOCUMENT_PENDING:
            return{
                ...state,
                isGetDocumentPending: action.isGetDocumentPending
                
            }
        case GET_DOCUMENT_SUCCESS:
            return{
                ...state
            }
        case GET_DOCUMENT_ERROR:
            return{
                ...state
            }
        case ADD_DOCUMENT_PENDING:
            return{
                ...state,
                isAddDocumentPending: action.isAddDocumentPending
            }
        case ADD_DOCUMENT_SUCCESS:
            return{
                isAddDocumentSuccess: action.isAddDocumentSuccess,
                documents: action.document 
            }
        case ADD_DOCUMENT_ERROR:
            return{
                ...state,
                isAddDocumentError: action.isAddDocumentError
            }
        case EDIT_DOCUMENT_PENDING:
            return{
                ...state
            }
        case EDIT_DOCUMENT_SUCCESS:
            return{
                ...state
            }
        case EDIT_DOCUMENT_ERROR:
            return{
                ...state
            }
        case DELETE_DOCUMENT_PENDING:
            return{
                ...state
            }
        case DELETE_DOCUMENT_SUCCESS:
            return{
                ...state
            }
        case DELETE_DOCUMENT_ERROR:
            return{
                ...state
            }
        default:
            return state;
    
    }
}