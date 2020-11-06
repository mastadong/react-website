// import { COMMENTS } from '../shared/comments';
// import * as ActionTypes from './ActionTypes';

// export const Comments = (state = COMMENTS, action) => {
//     switch (action.type) {
//         case ActionTypes.ADD_COMMENT:
            
//             //The payload is the data container sent by the action creator class.  It closely resembles (not exact) the base 
//             //class for the comment object.
//             const comment = action.payload

//             //Some clarity is needed here.  Note that the base comment class (see 'shared' folder) includes properties that 
//             //are not included in the payload object created.  As such, they need to be generated here and added to the 
//             //payload object, which is finally added to the state comment array.  The newly bundled array is returned to the caller,
//             //who will be responsible for updating the state in the Data Store.  
//             comment.id = state.length;
//             comment.date = new Date().toISOString();
//             return state.concat(comment); 

//         default:
//             return state;
//     }
// };


import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};