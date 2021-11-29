import * as Actions from '../actions/';

const initialState = {
    items: [],
    pageSize: 10,
    totalRecords: null,
    pages: null,
    profileChangeDialog: {
        wfTaskId: '',
        props: {
            open: false
        },
        data: null
    },
    enrollmentDialog: {
        wfTaskId: '',
        props: {
            open: false
        },
        data: null
    },
    schemeApprovalDialog: {
        wfTaskId: '',
        props: {
            open: false
        },
        data: null
    }


};

const workflowTaskReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WORKFLOW_TASKS:
            return {
                ...state,
                items: action.payload
            };

        case Actions.OPEN_PROFILE_CHANGE_DIALOG:
            {
                return {
                    ...state,
                    profileChangeDialog: {
                        props: {
                            open: true
                        },
                        wfTaskId: action.wfTaskId
                    }
                };


            }
        case Actions.GET_PROFILE_UPDATE_REQUEST:
            {

                return {
                    ...state,
                    profileChangeDialog: {
                        ...state.profileChangeDialog,
                        data: action.payload
                    }
                };
            }
        case Actions.CLOSE_PROFILE_CHANGE_DIALOG:
            {
                return {
                    ...state,
                    profileChangeDialog: {
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_SCHEME_APPROVAL_DIALOG:
            {
                return {
                    ...state,
                    schemeApprovalDialog: {
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };


            }
        case Actions.CLOSE_SCHEME_APPROVAL_DIALOG:
            {
                return {
                    ...state,
                    schemeApprovalDialog: {
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_ENROLLMENT_DIALOG:
            {
                console.log('=============actionactionaction=======================');
                console.log(action);
                console.log('====================================');
                return {
                    ...state,
                    enrollmentDialog: {
                        props: {
                            open: true
                        }
                        , wfTaskId: action.wfTaskId
                    }

                };


            }
        case Actions.CLOSE_ENROLLMENT_DIALOG:
            {
                return {
                    ...state,
                    enrollmentDialog: {
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
       
        case Actions.GET_ASSOCIATE_ADD_REQUEST:
            {

                return {
                    ...state,
                    enrollmentDialog: {
                        ...state.enrollmentDialog,
                        data: action.payload
                    }
                };
            }
        case Actions.UPDATE_ASSOCIATE_WORKFLOW:
            {

                return {
                    ...state,

                    enrollmentDialog: {
                        props: {
                            open: false
                        },
                        data: null,
                        wfTaskId: '',
                    }
                };
            }









        default:
            return state;
    }
};

export default workflowTaskReducer;
