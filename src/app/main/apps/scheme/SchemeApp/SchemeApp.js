import React, { useEffect, useRef } from 'react';
import SchemeHeader from './SchemeHeader'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FusePageCarded, DemoContent } from '@fuse';
import SchemeSideMenu from './SchemeSideMenu';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers'
import { Grid } from '@material-ui/core';
import SchemeTable from './SchemeTable';
import SchemeSettings from './SchemeSettings'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { isWithinInterval } from 'date-fns';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


function SchemeApp(props) {
    const pageLayout = useRef(null);
    const useStyles = makeStyles({
        addButton: {
            position: 'absolute',
            right: 12,
            bottom: 12,
            zIndex: 99,
        }
    });
    const classes = useStyles(props);


    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <SchemeHeader header={'Scheme List'} pageLayout={pageLayout} />
            }


            content={
                <SchemeTable></SchemeTable>
            }
        />



    )
}


export default withReducer('schemeApp', reducer)(SchemeApp);