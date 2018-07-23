import axios from 'axios';
export const GET_QUALIFICATION_SUCCESS = 'GET_QUALIFICATION_SUCCESS';
export const GET_QUALIFICATION_PENDING = 'GET_QUALIFICATION_PENDING';
export const GET_QUALIFICATION_ERROR   = 'GET_QUALIFICATION_ERROR';
export const ADD_QUALIFICATION_SUCCESS = 'ADD_QUALIFICATION_SUCCESS';
export const ADD_QUALIFICATION_PENDING = 'ADD_QUALIFICATION_PENDING';
export const ADD_QUALIFICATION_ERROR   = 'ADD_QUALIFICATION_ERROR';

const ROOT_URL = 'http://localhost:8888/qualification';

function setGetQualificationPending(isGetQualificationPending) {
  return {
    type: GET_QUALIFICATION_PENDING,
    isGetQualificationPending: isGetQualificationPending
  };
}

function setGetQualificationSuccess(isGetQualificationSuccess, q) {
  return {
    type: GET_QUALIFICATION_SUCCESS,
    isGetQualificationSuccess: isGetQualificationSuccess,
	  qualifications: q
  };
}

function setGetQualificationError(getQualificationError) {
  return {
    type: GET_QUALIFICATION_ERROR,
    getQualificationError: getQualificationError
  }
}

export function getQualifcations() {
	return dispatch => {
		dispatch(setGetQualificationPending(true));
		dispatch(setGetQualificationSuccess(false));
		dispatch(setGetQualificationError(null));

		axios.get(`${ROOT_URL}`,{
      headers: {
        "x-access-token" : localStorage.getItem('localToken')
      }
    })
		.then(res => {
			console.log('data', res.data);
			dispatch(setGetQualificationPending(false));
			dispatch(setGetQualificationSuccess(true,res.data));
		})
		.catch(err => {
			dispatch(setGetQualificationPending(false));
			dispatch(setGetQualificationSuccess(false,null));
			dispatch(setGetQualificationError(err.response));
		});
	}
}

function setAddQualificationPending(isAddQualificationPending) {
    return {
      type: ADD_QUALIFICATION_PENDING,
      isAddQualificationPending: isAddQualificationPending
    };
  }
  
  function setAddQualificationSuccess(isAddQualificationSuccess, response) {
    return {
      type: ADD_QUALIFICATION_SUCCESS,
      isAddQualificationSuccess: isAddQualificationSuccess,
      qualification: response
    };
  }
  
  function setAddQualificationError(addQualificationError) {
    return {
      type: ADD_QUALIFICATION_ERROR,
      addQualificationError: addQualificationError
    }
  }

  export function addQualifcation(newQualification,successCb) {
    console.log('new qualification', newQualification);
    return dispatch => {
      dispatch(setAddQualificationPending(true));
      dispatch(setAddQualificationSuccess(false));
      dispatch(setAddQualificationError(null));
  
      axios.post(`${ROOT_URL}`,newQualification,{
        headers: {
          "x-access-token" : localStorage.getItem('localToken')
        }
      })
      .then(res => {
        console.log('new qualification data', res.data);
        dispatch(setAddQualificationPending(false));
        dispatch(setAddQualificationSuccess(true,res.data));
        successCb();        
      })
      .catch(err => {
        dispatch(setAddQualificationPending(false));
        dispatch(setAddQualificationSuccess(false, null));
        dispatch(setAddQualificationError(err.response));
      });
    }
  }