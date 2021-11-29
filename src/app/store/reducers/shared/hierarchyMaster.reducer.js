

import * as Actions from '../../actions';

const initialState = {
    retailers: null,
    distributors: null,
    territories: null,
    areas: null,
    branches: null,
    regions: null,
};

const hierarchyMaster = function (state = initialState, action) {
    switch (action.type) {

        case Actions.GET_RETAILERS_FOR_DISTRIBUTORS:
            {
                console.log(action.payload)
                return {
                    ...state,
                    retailers: action.payload,
                };
            }
        case Actions.GET_DISTRIBUTORS_FOR_TERRITORIES:
            {
                console.log(action.payload)
                return {
                    ...state,
                    distributors: action.payload.items,
                };
            }
        case Actions.GET_TERRITORIES_FOR_BRANCHES:
            {
                console.log(action.payload)
                return {
                    ...state,
                    territories: action.payload,
                };
            }
        case Actions.GET_BASE_HIERARCHY:
            {
                return {
                    ...state,
                    regions: action.payload.regions,
                    branches: action.payload.branches,
                    areas: action.payload.areas,
                };
            }
        case Actions.GET_REGIONS:
            {
                return {
                    ...state,
                    regions: action.payload,
                };
            }
        case Actions.GERT_BRANCHS:
            {
                return {
                    ...state,
                    branches: action.payload,
                };
            }




        default:
            {
                return state;
            }
    }
};

export default hierarchyMaster;

