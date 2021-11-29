import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, TextField, TableCell, TableRow, TableBody, TableHead, Table, Card, CardContent, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar, Checkbox } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
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
    const dispatch = useDispatch();


    const uploadDialog = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.uploadDialog);
    const loading = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.loading);
    const uploadResponse = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.uploadResponse);



    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [selectedStatus, setSelectedStatus] = React.useState([]);

    const file = useSelector(({ fuse }) => fuse.file.file);



    const initDialog = useCallback(
        () => {


            //   dispatch(Actions.getRedemptionStatusMaster())

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
        console.log(file);
        console.log("header");
        if (file != null && (file.fileName.split('.')[1] == 'xls' || file.fileName.split('.')[1] == 'xlsx')) {
            dispatch(Actions.uploadExcel(file.fileName));
            setForm({
                ...form,
                fileURL: file.filePath,
                fileName: file.fileName
            });

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
        excel.append('type', 'RedemptionUpload');
        dispatch(Actions.showLoading());
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
                        Redemptions
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

                                    <Grid item xs={12} md={3}>
                                        <input
                                            // accept="image/*"
                                            className="hidden"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={setFile}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                Select File
                                                                            </Button>
                                        </label>
                                        {form.iconUrl &&
                                            <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                                <img className="max-w-none w-auto h-full" src={form.fileURL} alt="File" />
                                            </div>
                                        }
                                    </Grid>
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


        </Dialog>
    );
}

export default UploadDialog;
