/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Returning new document exchange state
 * Created: 28 Aug 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
	SET_SEENEXCHANGEDOCUMENT_PENDING,
	SET_SEENEXCHANGEDOCUMENT_ERROR,
	SET_SEENEXCHANGEDOCUMENT_SUCCESS,
	DOWNLOAD_EXCHANGEDOCUMENT_PENDING,
	DOWNLOAD_EXCHANGEDOCUMENT_ERROR,
	DOWNLOAD_EXCHANGEDOCUMENT_SUCCESS,
	SET_PDF_CONTENT,
	SET_CURRENT_INDEX,
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
	isSetSeenExchangeDocumentSuccess: false,
	isSetSeenExchangeDocumentError: false,
	isSetSeenExchangeDocumentPending: false,
	isDownloadExchangeDocumentPending: false,
	isDownloadExchangeDocumentError: false,
	isDownloadExchangeDocumentSuccess: false,
	exchangeDocuments: [],
	seenDocuments: [],
	unseenDocuments: [],
	pdfUint8Array: [],
	selectedIndex: -1,
};

export default (state = INITIAL_STATE, action) => {
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
		case SET_SEENEXCHANGEDOCUMENT_PENDING:
			return {
				...state,
				isSetSeenExchangeDocumentPending: action.isSetSeenExchangeDocumentPending,
			};
		case SET_SEENEXCHANGEDOCUMENT_ERROR:
			return {
				...state,
				isSetSeenExchangeDocumentError: action.isSetSeenExchangeDocumentError,
			};
		case SET_SEENEXCHANGEDOCUMENT_SUCCESS:
			return {
				...state,
				isSetSeenExchangeDocumentSuccess: action.isSetSeenExchangeDocumentSuccess,
				seenDocuments: action.seenDocument
					? [
							...state.seenDocuments,
							{ title: action.seenDocument.title, patientUsername: action.seenDocument.patientUsername }, // Append the doc to seenDocuments
					  ]
					: state.seenDocuments,
				unseenDocuments: action.seenDocument
					? state.unseenDocuments.filter(doc => doc.title !== action.seenDocument.title) // Remove the doc from unseenDocuments
					: state.unseenDocuments,
			};
		case DOWNLOAD_EXCHANGEDOCUMENT_PENDING:
			return {
				...state,
				isDownloadExchangeDocumentPending: action.isDownloadExchangeDocumentPending,
			};
		case DOWNLOAD_EXCHANGEDOCUMENT_ERROR:
			return {
				...state,
				isDownloadExchangeDocumentError: action.isDownloadExchangeDocumentError,
			};
		case DOWNLOAD_EXCHANGEDOCUMENT_SUCCESS:
			return {
				...state,
				isDownloadExchangeDocumentSuccess: action.isDownloadExchangeDocumentSuccess,
			};
		case SET_PDF_CONTENT:
			// Set the content of the currently selected pdf for fast retrieval
			const pdfUint8Array = Array.apply(null, { length: state.seenDocuments.length + state.unseenDocuments.length });
			return {
				...state,
				pdfUint8Array:
					Array.isArray(state.pdfUint8Array) && state.pdfUint8Array.length === pdfUint8Array.length
						? state.pdfUint8Array.map((doc, idx) => {
								if (idx === action.selectedIndex) {
									return action.pdfUint8Array;
								} else {
									return doc;
								}
						  })
						: pdfUint8Array.map((doc, idx) => {
								if (idx === action.selectedIndex) {
									return action.pdfUint8Array;
								} else {
									return doc;
								}
						  }),
				selectedIndex: Number.isInteger(action.selectedIndex) ? action.selectedIndex : state.selectedIndex,
			};
		case SET_CURRENT_INDEX:
			return {
				...state,
				selectedIndex: action.selectedIndex,
			};
		default:
			return state;
	}
};
