import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import FeedbackCategoryList from './FeedbackCategoryList';
import FeedbackCategoryHeader from './FeedbackCategoryHeader';
import FeedbackCategorySidebarContent from './FeedbackCategorySidebarContent';
import FeedbackCategoryDialog from './FeedbackCategoryDialog';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';


function FeedbackCategoryApp(props) {
    const dispatch = useDispatch();

    const useStyles = makeStyles({
        addButton: {
            position: 'absolute',
            right: 12,
            bottom: 12,
            zIndex: 99
        }
    });
    const classes = useStyles(props);
    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getFeedbackCategory(props.match.params));
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
                    <FeedbackCategoryHeader pageLayout={pageLayout} />
                }
                content={
                    <FeedbackCategoryList />
                }
                //leftSidebarContent={
                //    <div></div>
                //}
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={ev => dispatch(Actions.openNewFeedbackCategoryDialog())}
                >
                    <Icon>add</Icon>
                </Fab>
            </FuseAnimate>
            <FeedbackCategoryDialog />
        </React.Fragment>
    )
}

export default withReducer('feedbackCategoryApp', reducer)(FeedbackCategoryApp);
