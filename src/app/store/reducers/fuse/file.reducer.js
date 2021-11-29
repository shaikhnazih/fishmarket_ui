

import * as Actions from '../../actions';

const initialState = {
    file  : null,
};

const file = function (state = initialState, action) {
    switch ( action.type )
    {
        
    case Actions.UPLOAD_FILE:
        {          
           
            console.log(action.payload)     
            return {
                ...state,
                file: action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default file;

