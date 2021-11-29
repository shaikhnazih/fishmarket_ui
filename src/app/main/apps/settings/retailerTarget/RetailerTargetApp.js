import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import RetailerTargetList from './RetailerTargetList';
import RetailerTargetHeader from './RetailerTargetHeader';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';
import * as Constants from 'app/constants'
import UploadDialog from './UploadDialog';
const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

function RetailerTargetApp(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    useEffect(() => {
        dispatch(Actions.getRetailerTarget());
        console.log("retailerTargetApp");
    }, [dispatch]);

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
                    <RetailerTargetHeader pageLayout={pageLayout} />
                }
                content={

                    <div>
                        <RetailerTargetList />

                        <UploadDialog />
                    </div>
                }
                // leftSidebarContent={
                //     <div></div>
                // }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />


        </React.Fragment>
    )
}

export default withReducer('retailerTargetApp', reducer)(RetailerTargetApp);
