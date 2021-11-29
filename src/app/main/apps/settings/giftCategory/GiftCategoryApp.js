﻿import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import GiftsCategoryList from './GiftsCategoryList';
import GiftsCategoryHeader from './GiftsCategoryHeader';
import GiftCategoryDialog from './GiftCategoryDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';
import * as Constants from 'app/constants'
const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

function GiftsCategoryApp(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getGiftsCategory(Constants.listQuery));
    }, [dispatch, props.match.params]);

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
                    <GiftsCategoryHeader pageLayout={pageLayout} />
                }
                content={
                    <GiftsCategoryList />
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={ev => dispatch(Actions.openNewGiftCategoryDialog())}
                >
                    <Icon>add</Icon>
                </Fab>
            </FuseAnimate>
            <GiftCategoryDialog />
        </React.Fragment>
    )
}

export default withReducer('giftsCategoryApp', reducer)(GiftsCategoryApp);
