import {
	GET_EXCHANGEDOCUMENTS_PENDING,
	GET_EXCHANGEDOCUMENTS_ERROR,
	GET_EXCHANGEDOCUMENTS_SUCCESS,
	GET_NEWRECEIVEDDOCUMENTS_PENDING,
	GET_NEWRECEIVEDDOCUMENTS_ERROR,
	GET_NEWRECEIVEDDOCUMENTS_SUCCESS,
	GET_OLDRECEIVEDDOCUMENTS_PENDING,
	GET_OLDRECEIVEDDOCUMENTS_ERROR,
	GET_OLDRECEIVEDDOCUMENTS_SUCCESS,
	SEND_EXCHANGEDOCUMENTS_PENDING,
	SEND_EXCHANGEDOCUMENTS_ERROR,
	SEND_EXCHANGEDOCUMENTS_SUCCESS,
} from '../actions/documentExchange.actions';

const INITIAL_STATE = {
	isGetExchangeDocumentsPending: false,
	isGetExchangeDocumentsSuccess: false,
	isGetExchangeDocumentsError: false,
	isGetNewReceivedDocumentsSuccess: false,
	isGetNewReceivedDocumentsPending: false,
	isGetNewReceivedDocumentsError: false,
	isGetOldReceivedDocumentsPending: false,
	isGetOldReceivedDocumentsSuccess: false,
	isGetOldReceivedDocumentsError: false,
	isSendExchangeDocumentsPending: false,
	isSendExchangeDocumentsSuccess: false,
	isSendExchangeDocumentsError: false,
	exchangeDocuments: [],
	seenDocuments: [],
	unseenDocuments: [],
};

export default (state = INITIAL_STATE, action) => {
	console.log('[reducer]:', state);
	switch (action.type) {
		case GET_EXCHANGEDOCUMENTS_PENDING:
			return {
				...state,
				isGetExchangeDocumentsPending: action.isGetExchangeDocumentsPending,
			};
		case GET_EXCHANGEDOCUMENTS_ERROR:
			return {
				...state,
				isGetExchangeDocumentsError: action.isGetExchangeDocumentsError,
			};
		case GET_EXCHANGEDOCUMENTS_SUCCESS:
			return {
				...state,
				isGetExchangeDocumentsSuccess: action.isGetExchangeDocumentsSuccess,
				exchangeDocuments: action.exchangeDocuments,
			};
		case GET_NEWRECEIVEDDOCUMENTS_PENDING:
			return {
				...state,
				isGetNewReceivedDocumentsPending: action.isGetNewReceivedDocumentsPending,
			};
		case GET_NEWRECEIVEDDOCUMENTS_ERROR:
			return {
				...state,
				isGetNewReceivedDocumentsError: action.isGetNewReceivedDocumentsError,
			};
		case GET_NEWRECEIVEDDOCUMENTS_SUCCESS:
			return {
				...state,
				isGetNewReceivedDocumentsSuccess: action.isGetNewReceivedDocumentsSuccess,
				unseenDocuments: action.unseenDocuments,
			};
		case GET_OLDRECEIVEDDOCUMENTS_PENDING:
			return {
				...state,
				isGetOldReceivedDocumentsPending: action.isGetOldReceivedDocumentsPending,
			};
		case GET_OLDRECEIVEDDOCUMENTS_ERROR:
			return {
				...state,
				isGetOldReceivedDocumentsError: action.isGetOldReceivedDocumentsError,
			};
		case GET_OLDRECEIVEDDOCUMENTS_SUCCESS:
			return {
				...state,
				isGetOldReceivedDocumentsSuccess: action.isGetOldReceivedDocumentsSuccess,
				seenDocuments: action.seenDocuments,
			};
		case SEND_EXCHANGEDOCUMENTS_PENDING:
			return {
				...state,
				isSendExchangeDocumentsPending: action.isSendExchangeDocumentsPending,
			};
		case SEND_EXCHANGEDOCUMENTS_ERROR:
			return {
				...state,
				isSendExchangeDocumentsError: action.isSendExchangeDocumentsError,
			};
		case SEND_EXCHANGEDOCUMENTS_SUCCESS:
			return {
				...state,
				isSendExchangeDocumentsSuccess: action.isSendExchangeDocumentsSuccess,
			};
		default:
			return state;
	}
};