import React, { useEffect, useCallback, useState } from 'react';
import { Paper, Button, Input, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from './store/actions';

function FeedbackHeader(props) {
    const dispatch = useDispatch();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [searchInputValue, setSearchInputValue] = useState('');

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32">shopping_basket</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">Feedback </Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon color="action">search</Icon>

                            <Input
                                placeholder="Search"
                                className="flex flex-1 mx-8"
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
        </div>
    );
}

export default FeedbackHeader;
