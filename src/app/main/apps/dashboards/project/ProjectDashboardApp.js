import React, { useEffect, useRef, useState } from 'react';
import { Menu, MenuItem, Hidden, Icon, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import { FuseAnimateGroup, FusePageSimple } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';
import _ from 'lodash';
import clsx from 'clsx';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Widget10 from './widgets/Widget10';
import Widget11 from './widgets/Widget11';
import WidgetNow from './widgets/WidgetNow';
import DashboardSummaryWidget from './widgets/DashboardSummaryWidget';
import WidgetWeather from './widgets/WidgetWeather';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0'
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft: 1
    },
}));

function ProjectDashboardApp(props) {
    const dispatch = useDispatch();
    const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);

    const user = useSelector(({ auth }) => auth.user.data);

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);



    useEffect(() => {
        dispatch(Actions.getWidgets());
        dispatch(Actions.getWidgets1());
    }, [dispatch]);


    useEffect(() => {
        console.log(widgets);
    }, [widgets])


    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    if (!widgets.widgets) {
        return null;
    }

    if (!widgets.widgets1) {
        return null;
    }

    return (
        <FusePageSimple
            classes={{
                header: "min-h-160 h-160",
                toolbar: "min-h-48 h-48",
                rightSidebar: "w-288",
                content: classes.content,
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                    <div className="flex justify-between items-start">
                        <Typography className="py-0 sm:py-24" variant="h4">Welcome back, {user.displayName}</Typography>
                        <Hidden lgUp>
                            <IconButton
                                onClick={(ev) => pageLayout.current.toggleRightSidebar()}
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                        </Hidden>
                    </div>
                    <div className="flex items-end">
                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                >
                    <Tab className="text-14 font-600 normal-case" label="Home" />
                    <Tab className="text-14 font-600 normal-case" label="Summary" />
                    <Tab className="text-14 font-600 normal-case" label="Schemes" />
                    <Tab className="text-14 font-600 normal-case" label="My Approvals" />
                </Tabs>
            }
            content={
                <div className="p-12">
                    Hello
                </div>
            }

            ref={pageLayout}
        />
    );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
