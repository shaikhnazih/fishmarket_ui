import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import PasswordTab from './tabs/PasswordTab';
import AboutTab from './tabs/AboutTab';
import * as Actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';


const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height: 320,
        minHeight: 320,
        [theme.breakpoints.down('md')]: {
            height: 240,
            minHeight: 240
        }
    }
}));

function ProfilePage() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getProfile());
    }, [dispatch]);

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <FusePageSimple
            classes={{
                header: classes.layoutHeader,
                toolbar: "px-16 sm:px-24"
            }}
            // header={
            //     <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            //         <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            //             <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            //                 <Typography className="md:mx-24" variant="h4" color="inherit">John Doe</Typography>
            //             </FuseAnimate>
            //         </div>
            //     </div>
            // }
            contentToolbar={
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="off"
                    classes={{
                        root: "h-64 w-full border-b-1"
                    }}
                >
                    <Tab
                        classes={{
                            root: "h-64"
                        }}
                        label="About" />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Change Password" />
                </Tabs>
            }
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 && (
                        <AboutTab />
                    )}
                    {selectedTab === 1 &&
                        (
                            <PasswordTab />
                        )}

                </div>
            }
        />
    )
}

export default withReducer('ProfilePage', reducer)(ProfilePage);
