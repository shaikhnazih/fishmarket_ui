import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { FusePageSimple } from '@fuse';
import withReducer from 'app/store/withReducer';
import RedemptionHistoryTable from './RedemptionHistoryTable';
import RedemptionHistoryHeader from './RedemptionHistoryHeader';
import reducer from './store/reducers/index';
import * as Actions from "./store/actions";


function RedemptionHistory(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Actions.getRedemptionHistory());
    }, [dispatch, props.match.params]);
    const pageLayout = useRef(null);


    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content: "flex flex-col h-full",
                    leftSidebar: "w-256 border-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <RedemptionHistoryHeader pageLayout={pageLayout} />
                }
                content={
                    <RedemptionHistoryTable />
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>
    );
}

export default withReducer('RedemptionHistoryApp', reducer)(RedemptionHistory);
