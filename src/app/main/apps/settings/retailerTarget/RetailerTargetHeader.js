import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from '@fuse/hooks';
import { Hidden, Icon, IconButton, Input, Paper, Typography, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

import * as RootActions from 'app/store/actions'

const defaultFormState = {
    fileURL: '',
    fileName: '',
};

function RetailerTargetsHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.searchText);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const file = useSelector(({ fuse }) => fuse.file.file);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [searchInputValue, setSearchInputValue] = useState('');

    function setFile(e) {
        console.log(e.target.files[0])
        let excel = new FormData();
        var element = e.target.files[0];
        excel.append('file', element);
        excel.append('type', 'RetailerTargetBulkUpload');
        dispatch(RootActions.uploadFile(excel));
    }



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
                        <Icon className="text-32">account_box</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="mx-12 hidden sm:flex">Retailer Target</Typography>
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
            <div className="flex">
                <input
                    // accept="image/*"
                    className="hidden"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={setFile}
                />
                <label htmlFor="contained-button-file">

                    <Button onClick={ev => dispatch(Actions.openUploadDialog())}>Upload Excel</Button>
                    {/* 
                    <Button variant="contained" color="primary" component="span">
                        Bulk Upload
                            </Button> */}
                </label>
                {form.iconUrl &&
                    <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                        <img className="max-w-none w-auto h-full" src={form.fileURL} alt="File" />
                    </div>
                }
            </div>
        </div>
    );
}

export default RetailerTargetsHeader;
