import axios from 'axios';
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS';
export const GET_DOCUMENT_PENDING = 'GET_DOCUMENT_PENDING';
export const GET_DOCUMENT_ERROR   = 'GET_DOCUMENT_ERROR';
export const ADD_DOCUMENT_SUCCESS = 'ADD_DOCUMENT_SUCCESS';
export const ADD_DOCUMENT_PENDING = 'ADD_DOCUMENT_PENDING';
export const ADD_DOCUMENT_ERROR   = 'ADD_DOCUMENT_ERROR';
export const EDIT_DOCUMENT_SUCCESS = 'EDIT_DOCUMENT_SUCCESS';
export const EDIT_DOCUMENT_PENDING = 'EDIT_DOCUMENT_PENDING';
export const EDIT_DOCUMENT_ERROR = 'EDIT_DOCUMENT_ERROR';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_PENDING = 'DELETE_DOCUMENT_PENDING';
export const DELETE_DOCUMENT_ERROR = 'DELETE_DOCUMENT_ERROR';

const ROOT_URL = 'http://localhost:8888/document';


export function addDocument(newDocument,successCb) {
    console.log('new document:', newDocument);
    return dispatch => {
        dispatch(setAddDocumentPending(true));
        dispatch(setAddDocumentSuccess(false));
        dispatch(setAddDocumentError(null));
    
        axios.post(`${ROOT_URL}`,newDocument,{
          headers: {
            "x-access-token" : localStorage.getItem('localToken')
          }
        })
        .then(res => {
          console.log('new document data', res.data);
          dispatch(setAddDocumentPending(false));
          dispatch(setAddDocumentSuccess(true,res.data));
          successCb();        
        })
        .catch(err => {
          dispatch(setAddDocumentPending(false));
          dispatch(setAddDocumentSuccess(false, null));
          dispatch(setAddDocumentError(err.response));
        });
      }
    }

  function setAddDocumentPending(isAddDocumentPending) {
    return {
      type: ADD_DOCUMENT_PENDING,
      isAddDocumentPending: isAddDocumentPending
    };
  }
  
  function setAddDocumentSuccess(isAddDocumentSuccess, response) {
    return {
      type: ADD_DOCUMENT_SUCCESS,
      isAddDocumentSuccess: isAddDocumentSuccess,
      document: response
    };
  }
  
  function setAddDocumentError(addDocumentError) {
    return {
      type: ADD_DOCUMENT_ERROR,
      addDocumentError: addDocumentError
    }
  }