import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';

//The anatomy of an action includes a text property 'type' which corresponds literally to the enumeration type specified in 
//the 'ActionTypes' file, and a newly created data container object which will be sent to the reducer and used to update the 
//state.  Naturally, the contents of the container are arbitrary and called out in the 'pseudo-constructor' shown below directly
//preceding the arrow function.

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});


export const fetchCampsites = () => dispatch => {
  
    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
    
};


export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});







