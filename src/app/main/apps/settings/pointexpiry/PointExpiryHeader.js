import React from 'react';
import { Hidden, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function PointExpiryHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ PointExpiryApp }) => PointExpiryApp.PointExpiry.searchText);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
            <div className="flex flex-shrink items-center sm:w-224">
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32">account_box</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="mx-12 hidden sm:flex">Point Expiry </Typography>
                    </FuseAnimate>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4" elevation={1}>
                            <Icon color="action">search</Icon>
                            <Input
                                placeholder="Search for anything"
                                className="flex flex-1 px-16"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={ev => dispatch(Actions.setSearchText(ev))}
                            />
                        </Paper>
                    </FuseAnimate>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default PointExpiryHeader;
