import React, { useEffect, useRef } from 'react';

import withReducer from 'app/store/withReducer';
import reducer from './store/reducers/index';

import { Fab, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { FusePageSimple } from '@fuse';
import RedemptionTable from './RedemptionTable';
import RedemptionHeader from './RedemptionHeader';

import * as Actions from "./store/actions";
import DownlaodDialog from "./Dialogs/DownloadDialog"
import UploadDialog from "./Dialogs/UploadDialog"

function Redemption(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Actions.getRedemption());
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
                    <RedemptionHeader pageLayout={pageLayout} />
                }
                content={
                    <div>
                        <RedemptionTable />

                        <DownlaodDialog />
                        <UploadDialog />
                    </div>

                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>
    );
}

export default withReducer('RedemptionApp', reducer)(Redemption);
