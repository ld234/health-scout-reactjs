import {
	GET_DOCUMENT_PENDING,
	GET_DOCUMENT_SUCCESS,
	GET_DOCUMENT_ERROR,
	ADD_DOCUMENT_PENDING,
	ADD_DOCUMENT_SUCCESS,
	ADD_DOCUMENT_ERROR,
	EDIT_DOCUMENT_PENDING,
	EDIT_DOCUMENT_SUCCESS,
	EDIT_DOCUMENT_ERROR,
	DELETE_DOCUMENT_PENDING,
	DELETE_DOCUMENT_SUCCESS,
	DELETE_DOCUMENT_ERROR,
} from '../actions/document.action';

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
	isDeleteDocumentPending: false,
	isDeleteDocumentSuccess: false,
	deleteDocumentError: null,
	justEditIndex: -1,
};

export default function documentReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_DOCUMENT_PENDING:
			return {
				...state,
				isGetDocumentPending: action.isGetDocumentPending,
			};
		case GET_DOCUMENT_SUCCESS:
			return {
				...state,
				isGetDocumentSuccess: action.isGetDocumentSuccess,
				documents: action.documents,
			};
		case GET_DOCUMENT_ERROR:
			return {
				...state,
				getDocumentError: action.getDocumentError,
			};
		case ADD_DOCUMENT_PENDING:
			return {
				...state,
				isAddDocumentPending: action.isAddDocumentPending,
			};
		case ADD_DOCUMENT_SUCCESS:
			console.log('in reducer action.documents', action.documents);
			return {
				...state,
				isAddDocumentSuccess: action.isAddDocumentSuccess,
				documents: action.documents ? [...state.documents, action.documents] : state.documents,
			};
		case ADD_DOCUMENT_ERROR:
			return {
				...state,
				isAddDocumentError: action.isAddDocumentError,
			};
		case EDIT_DOCUMENT_PENDING:
			return {
				...state,
				isEditDocumentPending: action.isAddDocumentPending,
			};
		case EDIT_DOCUMENT_SUCCESS:
			let newDocumentList = [...state.documents];
			if (action.newDocument)
				newDocumentList[action.position] = {
					...newDocumentList[action.position],
					title: action.newDocument.newTitle,
					description: action.newDocument.description,
					file: action.newDocument.file,
				};

			console.log('[list reducer]', newDocumentList);

			return {
				...state,
				isEditDocumentSuccess: action.isEditDocumentSuccess,
				documents: newDocumentList,
				// justEditIndex: action.newDocument ? action.newDocument.position : state.justEditIndex
			};
		case EDIT_DOCUMENT_ERROR:
			return {
				...state,
				editDocumentError: action.editDocumentError,
			};
		case DELETE_DOCUMENT_PENDING:
			return {
				...state,
				isEditDocumentPending: action.isDeleteDocumentPending,
			};
		case DELETE_DOCUMENT_SUCCESS:
			return {
				...state,
				isDeleteDocumentSuccess: action.isDeleteDocumentSuccess,
				documents: state.documents.filter((elem, idx) => {
					return idx !== action.position;
				}),
			};
		case DELETE_DOCUMENT_ERROR:
			return {
				...state,
				deleteDocumentError: action.deleteDocumentError,
			};
		default:
			return state;
	}
}
