

import * as Actions from '../../actions';

const initialState = {
    prodLines: null,
    productCategories: null,
    productSubCategories: null,
    distributorGroups:null,
    products: null
};

const productMaster = function (state = initialState, action) {
    switch (action.type) {


        case Actions.GET_PRODUCT_LINE_MASTER:
            {
                return {
                    ...state,
                    prodLines: action.payload.items
                };
            }

        case Actions.GET_PRODUCT_CATEGORIES:
            {

                return {
                    ...state,
                    productCategories: action.payload.items
                };
            }
        case Actions.GET_DIST_GROUPS_MASTER:
            {

                return {
                    ...state,
                    distributorGroups: action.payload.items
                };
            }
        case Actions.GET_PRODUCT_SUB_CATEGORIES:
            {

                return {
                    ...state,
                    productSubCategories: action.payload.items
                };
            }
        case Actions.GET_PRODUCTS:
            {

                return {
                    ...state,
                    products: action.payload.items
                };
            }


        default:
            {
                return state;
            }
    }
};

export default productMaster;

