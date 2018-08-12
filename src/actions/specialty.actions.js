import axios from 'axios';
export const GET_SPECIALTY_SUCCESS = 'GET_SPECIALTY_SUCCESS';
export const GET_SPECIALTY_PENDING = 'GET_SPECIALTY_PENDING';
export const GET_SPECIALTY_ERROR   = 'GET_SPECIALTY_ERROR';
export const ADD_SPECIALTY_SUCCESS = 'ADD_SPECIALTY_SUCCESS';
export const ADD_SPECIALTY_PENDING = 'ADD_SPECIALTY_PENDING';
export const ADD_SPECIALTY_ERROR   = 'ADD_SPECIALTY_ERROR';
export const DELETE_SPECIALTY_SUCCESS = 'DELETE_SPECIALTY_SUCCESS';
export const DELETE_SPECIALTY_PENDING = 'DELETE_SPECIALTY_PENDING';
export const DELETE_SPECIALTY_ERROR = 'DELETE_SPECIALTY_ERROR';
export const GET_PRAC_TYPE_SPECIALTY_PENDING = 'GET_PRAC_TYPE_SPECIALTY_PENDING';
export const GET_PRAC_TYPE_SPECIALTY_SUCCESS = 'GET_PRAC_TYPE_SPECIALTY_SUCCESS';
export const GET_PRAC_TYPE_SPECIALTY_ERROR = 'GET_PRAC_TYPE_SPECIALTY_ERROR';

const ROOT_URL = 'http://localhost:8888/specialty';

function setGetSpecialtyPending(isGetSpecialtyPending) {
  return {
    type: GET_SPECIALTY_PENDING,
    isGetSpecialtyPending: isGetSpecialtyPending
  };
}

function setGetSpecialtySuccess(isGetSpecialtySuccess, q) {
  return {
    type: GET_SPECIALTY_SUCCESS,
    isGetSpecialtySuccess: isGetSpecialtySuccess,
	  specialties: q
  };
}

function setGetSpecialtyError(getSpecialtyError) {
  return {
    type: GET_SPECIALTY_ERROR,
    getSpecialtyError: getSpecialtyError
  }
}

export function getSpecialties() {
	return dispatch => {
		dispatch(setGetSpecialtyPending(true));
		dispatch(setGetSpecialtySuccess(false));
		dispatch(setGetSpecialtyError(null));

		axios.get(`${ROOT_URL}`,{
		  headers: {
			"x-access-token" : localStorage.getItem('localToken')
		  }
		})
		.then(res => {
			console.log('data', res.data);
			dispatch(setGetSpecialtyPending(false));
			dispatch(setGetSpecialtySuccess(true,res.data));
		})
		.catch(err => {
			dispatch(setGetSpecialtyPending(false));
			dispatch(setGetSpecialtySuccess(false,null));
			dispatch(setGetSpecialtyError(err.response));
		});
	}
}

function setAddSpecialtyPending(isAddSpecialtyPending) {
    return {
      type: ADD_SPECIALTY_PENDING,
      isAddSpecialtyPending: isAddSpecialtyPending
    };
}
  
function setAddSpecialtySuccess(isAddSpecialtySuccess, response) {
    return {
      type: ADD_SPECIALTY_SUCCESS,
      isAddSpecialtySuccess: isAddSpecialtySuccess,
      specialty: response
    };
}
  
function setAddSpecialtyError(addSpecialtyError) {
    return {
      type: ADD_SPECIALTY_ERROR,
      addSpecialtyError: addSpecialtyError
    }
}

export function addQualifcation(newSpecialty,successCb) {
    console.log('new specialty', newSpecialty);
    return dispatch => {
      dispatch(setAddSpecialtyPending(true));
      dispatch(setAddSpecialtySuccess(false));
      dispatch(setAddSpecialtyError(null));
  
      axios.post(`${ROOT_URL}`,newSpecialty,{
        headers: {
          "x-access-token" : localStorage.getItem('localToken')
        }
      })
      .then(res => {
        console.log('new specialty data', res.data);
        dispatch(setAddSpecialtyPending(false));
        dispatch(setAddSpecialtySuccess(true,res.data));
        successCb();        
      })
      .catch(err => {
        dispatch(setAddSpecialtyPending(false));
        dispatch(setAddSpecialtySuccess(false, null));
        dispatch(setAddSpecialtyError(err.response));
      });
    }
}
  
function setDeleteSpecialtyPending(isDeleteSpecialtyPending) {
    return {
        type: DELETE_SPECIALTY_PENDING,
        isDeleteSpecialtyPending: isDeleteSpecialtyPending
    };
}
  
function setDeleteSpecialtySuccess(isDeleteSpecialtySuccess, oldSpecialty,pos) {
    return {
        type: DELETE_SPECIALTY_SUCCESS,
        isDeleteSpecialtySuccess: isDeleteSpecialtySuccess,
        oldSpecialty: oldSpecialty,
	    position: pos
    };
}
  
function setDeleteSpecialtyError(deleteSpecialtyError) {
    return {
        type: DELETE_SPECIALTY_ERROR,
        deleteSpecialtyError: deleteSpecialtyError
    }
}

export function deleteSpecialty(deletedSpecialty, position,successCb){
    console.log('specialty to be deleted', deletedSpecialty);
    return dispatch => {
        dispatch(setDeleteSpecialtyPending(true));
        dispatch(setDeleteSpecialtySuccess(false));
        dispatch(setDeleteSpecialtyError(null));
		let {degree, institution, graduateYear} = deletedSpecialty;
		axios.delete(`${ROOT_URL}`,
		{
		  params: { degree, institution, graduateYear },
          headers: {
            "x-access-token" : localStorage.getItem('localToken')
		}
        })
        .then(res => {
            console.log('data from res', res.data);
            dispatch(setDeleteSpecialtyPending(false));
			dispatch(setDeleteSpecialtySuccess(true,res.data,position));
			successCb();        
		})
		.catch(err => {
			dispatch(setDeleteSpecialtyPending(false));
			dispatch(setDeleteSpecialtySuccess(false, null));
			dispatch(setDeleteSpecialtyError(err.response.data.message));
		});
    }
}
  
  
  
function setGetPracTypeSpecialtyPending(isGetSpecialtyPending) {
    return {
		type: GET_PRAC_TYPE_SPECIALTY_PENDING,
		isGetPracTypeSpecialtyPending: isGetSpecialtyPending
	};
}

function setGetPracTypeSpecialtySuccess(isGetSpecialtySuccess, q) {
	return {
		type: GET_PRAC_TYPE_SPECIALTY_SUCCESS,
		isGetPracTypeSpecialtySuccess: isGetSpecialtySuccess,
		pracTypeSpecialties: q
	};
}

function setGetPracTypeSpecialtyError(getSpecialtyError) {
  return {
    type: GET_PRAC_TYPE_SPECIALTY_ERROR,
    getPracTypeSpecialtyError: getSpecialtyError
  }
}

export function getPracTypeSpecialties(pracType) {
	return dispatch => {
		dispatch(setGetPracTypeSpecialtyPending(true));
		dispatch(setGetPracTypeSpecialtySuccess(false));
		dispatch(setGetPracTypeSpecialtyError(null));

		axios.get(`${ROOT_URL}/${pracType}`,{
		    headers: {
				"x-access-token" : localStorage.getItem('localToken')
			}
		})
		.then(res => {
			console.log('data', res.data);
			dispatch(setGetPracTypeSpecialtyPending(false));
			dispatch(setGetPracTypeSpecialtySuccess(true,res.data));
		})
		.catch(err => {
			dispatch(setGetPracTypeSpecialtyPending(false));
			dispatch(setGetPracTypeSpecialtySuccess(false,null));
			dispatch(setGetPracTypeSpecialtyError(err.response));
		});
	}
}