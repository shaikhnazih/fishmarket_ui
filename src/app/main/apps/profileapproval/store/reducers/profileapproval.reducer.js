import * as Actions from '../actions/profileapproval.actions';
import _ from '@lodash';

const initialState = {
    entities: [
        {
            AccountNumber: { old: "unchanged", new: "unchanged" },
            AnniversaryDAte: { old: "old Anniversary DAte", new: "new Anniversary DAte" },
            BankName: { old: "unchanged", new: "unchanged" },
            ContactPersonName: { old: "old Contact Person Name", new: "new Contact Person Name" }
        },
        {
            AccountNumber: { old: "old Account Number", new: "new Account Number" },
            AnniversaryDAte: { old: "old Anniversary DAte", new: "new Anniversary DAte" },
            BankName: { old: "unchanged", new: "unchanged" },
            ContactPersonName: { old: "old Contact Person Name", new: "new Contact Person Name" }
        },
        {
            AccountNumber: { old: "old Account Number", new: "new Account Number" },
            AnniversaryDAte: { old: "unchanged", new: "unchanged" },
            BankName: { old: "old Bank Name", new: "new Bank Name" },
            ContactPersonName: { old: "old Contact Person Name", new: "new Contact Person Name" }
        },
        {
            AccountNumber: { old: "unchanged", new: "unchanged" },
            AnniversaryDAte: { old: "old Anniversary DAte", new: "new Anniversary DAte" },
            BankName: { old: "old Bank Name", new: "new Bank Name" },
            ContactPersonName: { old: "unchanged", new: "unchanged" }
        }
    ],
    searchText: '',
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    profileapprovalRoles: null,
};

const profileapprovalsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.PROFILEAPPROVAL_BULK_UPLOAD:
            {
                console.log(action.payload);
            }
        case Actions.GET_PROFILEAPPROVALS_ROLES:
            {
                return {
                    ...state,
                    profileapprovalRoles: JSON.stringify(action.payload.data)
                };
            }
        case Actions.GET_PROFILEAPPROVALS:
            {
                return {
                    ...state,
                    entities: action.payload.items,
                    pages: (Math.ceil(action.payload.totalRecords / action.payload.pageSize)),
                    routeParams: action.routeParams
                };
            }
        case Actions.GET_IS_PROFILEAPPROVALNAME_EXISTS:
            {
                return {
                    ...state,
                    isProfileApprovalnameExists: action.payload,

                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        default:
            {
                return state;
            }
    }
};

export default profileapprovalsReducer;
