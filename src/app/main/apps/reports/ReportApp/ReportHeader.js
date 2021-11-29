﻿import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from '@fuse/hooks';
import { Hidden, Icon, IconButton, Input, Paper, Typography, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import * as RootActions from 'app/store/actions'

function UsersHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ reportApp }) => reportApp.report.searchText);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [searchInputValue, setSearchInputValue] = useState('');



    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

            <div className="flex flex-shrink items-center sm:w-224">
                <Hidden lgUp>
                    <IconButton
                        onClick={(ev) => {
                            props.pageLayout.current.toggleLeftSidebar()
                        }}
                        aria-label="open left sidebar"
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>

                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32">list</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="mx-12 hidden sm:flex">{props.header}</Typography>
                    </FuseAnimate>
                </div>
            </div>
            {props.enableSearch &&
                <div className="flex flex-1 items-center justify-center px-8 sm:px-12">

                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                            <Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4" elevation={1}>

                                <Icon color="action">search</Icon>

                                <Input
                                    placeholder="Search Report"
                                    className="flex flex-1 px-16"
                                    disableUnderline
                                    fullWidth
                                    value={searchInputValue}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => setSearchInputValue(ev.target.value)}
                                    onBlur={ev => dispatch(Actions.setSearchText(searchInputValue))}
                                />
                            </Paper>
                        </FuseAnimate>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
}

export default UsersHeader;
