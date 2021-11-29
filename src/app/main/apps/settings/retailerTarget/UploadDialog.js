import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, TextField, TableCell, TableRow, TableBody, TableHead, Table, Card, CardContent, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar, Checkbox } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import * as RootActions from 'app/store/actions'

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import moment from 'moment';
import { FuseAnimate } from '@fuse';

import axios from 'axios';
import * as Constants from 'app/constants'
import { da } from 'date-fns/locale';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';



const defaultFormState = {
    fileURL: '',
    fileName: '',
};




function UploadDialog(props) {


    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: "100%",

        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const classes = useStyles();

    const dispatch = useDispatch();

    const searchText = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.searchText);
    const schemes = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.schemes);

    const uploadDialog = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.uploadDialog);
    const loading = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.loading);
    const uploadResponse = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.uploadResponse);



    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [selectedScheme, setSelectedScheme] = React.useState();

    const file = useSelector(({ fuse }) => fuse.file.file);



    const initDialog = useCallback(
        () => {


            dispatch(Actions.getSchemes())

            //dispatch(Actions.getAssociateAddRequest(enrollmentDialog.wfTaskId))

        },
        [uploadDialog],
    );

    useEffect(() => {
        console.log('==============loadingloading======================');
        console.log(loading);
        console.log('====================================');
    }, [loading])

    useEffect(() => {

        if (file != null && (file.fileName.split('.')[1] == 'xls' || file.fileName.split('.')[1] == 'xlsx')) {
            dispatch(Actions.showLoading());
            dispatch(Actions.retailerTargetBulkUpload(file.fileName, selectedScheme));
            setForm({
                ...form,
                fileURL: file.filePath,
                fileName: file.fileName
            });

        }
        else {
            dispatch(RootActions.showMessage({ message: "Please Select Excel File Only", variant: 'info' }))
        }
    }, [file]);


    function closeComposeDialog() {
        dispatch(Actions.closeUploadDialog())
    }


    useEffect(() => {
        if (uploadDialog.props.open) {
            initDialog();
        }
    }, [uploadDialog.props.open, initDialog]);



    useEffect(() => {
        console.log('================loadingloading====================');
        console.log(loading);
        console.log('====================================');
    }, [loading]);

    const handleSubmit = function (action) {
        //  dispatch(Actions.showloading())
        // dispatch(Actions.getRedemptionsExcel({ ...parameters, status: parameters.status.join(',') }))
    }

    function downloadErrorFile() {
        window.open(uploadResponse.errorFile, "_blank")
    }
    function setFile(e) {
        console.log(e.target.files[0])
        let excel = new FormData();
        var element = e.target.files[0];
        excel.append('file', element);
        excel.append('type', 'MemberTarget');

        dispatch(RootActions.uploadFile(excel));
    }
    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...uploadDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        Targets
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">

                    <Typography variant="h6" color="inherit" className="pt-8">
                        Upload
                        </Typography>

                </div>
            </AppBar>

            <DialogContent classes={{ root: "p-24" }}>

                <FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
                    <div>
                        <Card className="mx-auto  print:w-full print:p-8 shadow-none">

                            <CardContent className="print:p-0">

                                <Grid container>

                                    <Grid item xs={12} md={11}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-checkbox-label">Scheme</InputLabel>

                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedScheme}
                                                MenuProps={MenuProps}
                                                onChange={(e) => { setSelectedScheme(e.target.value) }}
                                            >
                                                {schemes && schemes.map((scheme) => (
                                                    <MenuItem key={scheme.id} value={scheme.id}>{scheme.schemeTitle}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <Grid container>

                                    <Grid item xs={12} md={4}>
                                        <input
                                            // accept="image/*"
                                            className="hidden"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={setFile}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button disabled={!selectedScheme} variant="contained" color="primary" component="span">
                                                Select File
                                                                            </Button>
                                        </label>
                                        {form.iconUrl &&
                                            <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                                <img className="max-w-none w-auto h-full" src={form.fileURL} alt="File" />
                                            </div>
                                        }
                                    </Grid>



                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        {loading && <div>Wait... <LinearProgress color="secondary" /> </div>}
                                        {uploadResponse && <div> <Typography >{uploadResponse.message} </Typography> {uploadResponse.errorFile && <p><a onClick={downloadErrorFile}>Click here</a> to download failed records </p>} </div>}
                                    </Grid>
                                </Grid>



                                {/* 
                                <div className="mt-64">
                                    <Typography variant="h4">
                                        Associates
                                      </Typography>
                                    <Table className="simple">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Retailer Code
                                            </TableCell>
                                                <TableCell>
                                                    Owner'Name
                                            </TableCell>
                                                <TableCell>
                                                    Approve
                                            </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {form.associates && form.associates.map((it) => (
                                                <TableRow >
                                                    <TableCell>
                                                        <Typography variant="subtitle1">{it.code}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subtitle1">{it.ownerName}</Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Checkbox checked={it.isActive} value={it.isActive} name={it.code} onChange={handleApproveCheckboxChange} ></Checkbox>
                                                    </TableCell>
                                                </TableRow>

                                            ))}


                                        </TableBody>
                                    </Table>

                                </div> */}

                            </CardContent>
                        </Card>

                    </div>
                </FuseAnimate>

            </DialogContent>

            <DialogActions className="justify-between p-8">
                <div className="px-16">
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={closeComposeDialog}
                    >Close</Button>
                </div>
            </DialogActions>


        </Dialog >
    );
}

export default UploadDialog;
