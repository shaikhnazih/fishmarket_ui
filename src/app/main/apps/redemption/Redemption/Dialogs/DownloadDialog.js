import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, FormControlLabel, TextField, TableCell, TableRow, TableBody, TableHead, Table, Card, CardContent, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar, Checkbox } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
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





const defaultFormState = {
    approvedList: []
};


function DownloadDialog(props) {


    var fromDateInitialValue = new Date();
    fromDateInitialValue.setDate(fromDateInitialValue.getDate() - 90);


    const dispatch = useDispatch();
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [approvedCodes, setApprovedCodes] = useState([]);
    const [categoryToggleAll, setCategoryToggleAll] = useState(true);
    const [statusToggleAll, setStatusToggleAll] = useState(true);
    const downloadDialog = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.downloadDialog);
    const redemptionStatusMaster = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.redemptionStatusMaster);
    const giftCategoryMaster = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.giftCategoryMaster);

    const loading = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.loading);


    const [selectedStatus, setSelectedStatus] = React.useState([]);
    const [selectedGiftCategory, setSelectedGiftCategory] = React.useState([]);

    const [parameters, setParameters] = React.useState({ fromDate: fromDateInitialValue, toDate: new Date() });
    const [fromDate, setFromDate] = useState(fromDateInitialValue);
    const [toDate, setToDate] = useState(new Date());



    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
            maxWidth: 300,
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


    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };


    const handleGiftCategoryChange = (event) => {
        setSelectedGiftCategory(event.target.value);
    };


    useEffect(() => {
        setParameters({ ...parameters, status: selectedStatus, giftCategories: selectedGiftCategory })

    }, [selectedStatus, selectedGiftCategory])

    useEffect(() => {
        console.log('=============parametersparametersparameters=======================');
        console.log(parameters);
        console.log('====================================');
    }, [parameters])


    const initDialog = useCallback(
        () => {
            dispatch(Actions.getRedemptionStatusMaster())
            dispatch(Actions.getGiftCategorySelectOptions())
        },
        [downloadDialog],
    );

    useEffect(() => {
        selectAllStatus();
    }, [redemptionStatusMaster])

    var selectAllStatus = () => {

        var selected = [];
        if (redemptionStatusMaster != null && redemptionStatusMaster.length > 0) {
            redemptionStatusMaster.map((item) => {
                selected.push(item.statusCode);
            })
        }

        setSelectedStatus(selected);// select all by default 
        setParameters({ ...parameters, status: selected })
    }



    var toggleSelectAllStatus = () => {
        if (categoryToggleAll) {
            setSelectedStatus([])
        } else {
            selectAllStatus()
        }
        setStatusToggleAll(!statusToggleAll)
    }

    useEffect(() => {
        selectAllCategory();
    }, [giftCategoryMaster])



    var toggleSelectAllCategory = () => {
        if (categoryToggleAll) {
            setSelectedGiftCategory([])
        } else {
            selectAllCategory()
        }
        setCategoryToggleAll(!categoryToggleAll)
    }




    var selectAllCategory = () => {
        var selected = [];
        if (giftCategoryMaster != null && giftCategoryMaster.length > 0) {
            giftCategoryMaster.map((item) => {
                selected.push(item.id);
            })
        }

        setSelectedGiftCategory(selected);// select all by default 
        setParameters({ ...parameters, status: selected })


    }

    function closeComposeDialog() {
        dispatch(Actions.closeDownloadDialog())
    }


    useEffect(() => {
        if (downloadDialog.props.open) {
            initDialog();
        }
    }, [downloadDialog.props.open, initDialog]);

    const handleSubmit = function (action) {
        dispatch(Actions.showLoading())
        dispatch(Actions.getRedemptionsExcel({ ...parameters, status: parameters.status.join(',') }))
    }

    const reset = () => {

        var selected = [];
        if (redemptionStatusMaster != null && redemptionStatusMaster.length > 0) {
            redemptionStatusMaster.map((item) => {
                selected.push(item.statusCode);
            })
        }


        setToDate(new Date());
        setFromDate(fromDateInitialValue);
        setSelectedStatus(selected);

    }
    useEffect(() => {
        var fd = moment(fromDate).utcOffset('+0530').format("YYYY-MM-DD[T]HH:mm");
        var td = moment(toDate).utcOffset('+0530').format("YYYY-MM-DD[T]HH:mm");
        setParameters({ ...parameters, fromDate: fd, toDate: td })
    }, [fromDate, toDate])
    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...downloadDialog.props}
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
                        Download
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

                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-checkbox-label">Gift Category</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={selectedGiftCategory}
                                                onChange={handleGiftCategoryChange}

                                                input={<Input />}
                                                renderValue={(selected) => selected.length + " selected"}
                                                MenuProps={MenuProps}
                                            >
                                                {giftCategoryMaster && giftCategoryMaster.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        <Checkbox checked={selectedGiftCategory.indexOf(category.id) > -1} />
                                                        <ListItemText primary={category.giftCategoryName} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormControlLabel
                                                value="start"
                                                control={<Checkbox checked={categoryToggleAll} onChange={toggleSelectAllCategory} color="primary" />}
                                                label={categoryToggleAll ? "Deselect All" : "Select All"}
                                                labelPlacement="start"
                                            />
                                        </FormControl>


                                    </Grid>
                                    <Grid item xs={12} md={3}>

                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-checkbox-label">Redemption Status</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                                input={<Input />}
                                                renderValue={(selected) => selected.length + " selected"}
                                                MenuProps={MenuProps}
                                            >
                                                {redemptionStatusMaster && redemptionStatusMaster.map((status) => (
                                                    <MenuItem key={status.statusCode} value={status.statusCode}>
                                                        <Checkbox checked={selectedStatus.indexOf(status.statusCode) > -1} />
                                                        <ListItemText primary={status.status} />
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            <FormControlLabel
                                                value="start"
                                                control={<Checkbox checked={statusToggleAll} onChange={toggleSelectAllStatus} color="primary" />}
                                                label={statusToggleAll ? "Deselect All" : "Select All"}
                                                labelPlacement="start"
                                            />
                                        </FormControl>


                                    </Grid>
                                    <Grid item xs={12} md={3}>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="fromDate"
                                                label="From Date"
                                                name="fromdate"
                                                value={fromDate}
                                                //autoOk={true}
                                                onChange={setFromDate} //{(value) => { handleDateFilterChange('fromDate', value) }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            //   disabled={formDisabled}

                                            />
                                        </MuiPickersUtilsProvider>

                                    </Grid>
                                    <Grid item xs={12} md={3}>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="toDate"
                                                label="To Date"
                                                name="todate"
                                                value={parameters.toDate}
                                                autoOk={true}
                                                onChange={setToDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            //   disabled={formDisabled}

                                            />
                                        </MuiPickersUtilsProvider>

                                    </Grid>
                                    <Grid item xs={12} md={3}>

                                        {loading && <div><CircularProgress /> Wait....</div>}
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
                        type="submit"
                        onClick={handleSubmit}
                    >Download</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={reset}
                    >Reset</Button>
                </div>
            </DialogActions>


        </Dialog>
    );
}

export default DownloadDialog;
