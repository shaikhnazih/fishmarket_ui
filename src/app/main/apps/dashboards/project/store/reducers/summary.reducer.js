import * as Actions from '../actions/';

const initialState = {
    reportData: {},
    pageSize: 10,
    totalRecords: null,
    pages: null,
    reportTypes: []

};

const summaryReducer = function (state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case Actions.GET_REPORT_SCHEMA:
            {
                return {
                    ...state,
                    reportSchema: action.payload,
                };
            }

        case Actions.GET_DASHBOARD_REPORT_TYPES:
            {
                return {
                    ...state,
                    reportTypes: action.payload,
                };
            }

        case Actions.GET_DATA:
            return {
                ...state,
                reportData: action.payload
            };
            break;
        case Actions.GET_FILTER_BRANCHES:
            var branchFilter = state.reportSchema.filters.find(it => it.filterName == 'BranchCode');
            branchFilter.options = []
            for (let opt of action.payload) {
                branchFilter.options.push({ code: opt.code, description: opt.displayName });
            }
            return {
                ...state,
                reportSchema: { ...state.reportSchema }
            };
            break;
        default:
            return state;
    }
};

export default summaryReducer;
