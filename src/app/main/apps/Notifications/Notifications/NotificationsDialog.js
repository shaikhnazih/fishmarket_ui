import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, TextField, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as RootActions from 'app/store/actions'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HierarchySelector from './../../../customComponents/HierarchySelector'
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment';

import axios from 'axios';
import * as Constants from 'app/constants'
import { da } from 'date-fns/locale';

const defaultFormState = {
    notificationFor: 'retailer',
    title: '',
    productLineCode: '',
    notificationDetail: '',
    iconUrl: '',
    fileName: '',
    link: '',
    fileType: '',
    fileURL: '',
    areaOfOperationList: [],
    selectedRegions: null,
    selectedBranches: null,
    selectedAreas: null,
    selectedTerritories: null,
    selectedDistributors: null,
    selectedRetailers: null,
    sendDateTime: moment(Date.now()).utcOffset('+0530').format("YYYY-MM-DD[T]HH:mm")
};


function NotificationsDialog(props) {
    const dispatch = useDispatch();
    const notificationsDialog = useSelector(({ NotificationsApp }) => NotificationsApp.notifications.notificationsDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const file = useSelector(({ fuse }) => fuse.file.file);
    const [isNew, setIsNew] = useState(null);
    const [acceptTypes, setAcceptTypes] = useState("*");
    const productMaster = useSelector(({ shared }) => shared.productMaster);


    const [productLine, setProductLine] = useState([]);
    const [regions, setRegions] = useState([]);
    const [branches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const [territories, setTerritories] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [selectedDate, handleDateChange] = useState(new Date());

    //from api
    const hierarchyMaster = useSelector(({ shared }) => shared.hierarchyMaster);


    useEffect(() => {

        dispatch(RootActions.getRegions());
        dispatch(RootActions.getProductLineMaster());

        //        dispatch(RootActions.getBaseHierarchy());

    }, [])

    useEffect(() => {
        if (hierarchyMaster.distributors && hierarchyMaster.distributors != undefined) {
            setDistributors(hierarchyMaster.distributors)//.map((it) => it.code))
        }

        if (hierarchyMaster.retailers && hierarchyMaster.retailers != undefined) {
            setRetailers(hierarchyMaster.retailers)//.map((it) => it.code))
        }

        if (hierarchyMaster.territories && hierarchyMaster.territories != undefined) {
            setTerritories(hierarchyMaster.territories)//.map((it) => it.code))
        }

        if (hierarchyMaster.regions && hierarchyMaster.regions != undefined) {
            setRegions(hierarchyMaster.regions)//.map((it) => it.code))
        }

        if (hierarchyMaster.branches && hierarchyMaster.branches != undefined) {
            setBranches(hierarchyMaster.branches)//.map((it) => it.code))
        }

        if (hierarchyMaster.areas && hierarchyMaster.areas != undefined) {
            setAreas(hierarchyMaster.areas)//.map((it) => it.code))
        }

    }, [hierarchyMaster])

    useEffect(() => {


        if (productMaster.prodLines && productMaster.prodLines != undefined) {
            setProductLine(productMaster.prodLines)
        }

    }, [productMaster])

    const initDialog = useCallback(
        () => {

            if (notificationsDialog.type === 'edit' && notificationsDialog.data) {
                console.log(notificationsDialog.data.areaOfOperationList)
                setForm({
                    ...notificationsDialog.data,
                    selectedRegions: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Region'),
                    selectedBranches: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Branch'),
                    selectedAreas: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Area'),
                    selectedTerritories: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Territory'),
                    selectedDistributors: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Distributor'),
                    selectedRetailers: notificationsDialog.data.areaOfOperationList.find(o => o.heirarchyType === 'Retailer'),
                });
                handleDateChange(notificationsDialog.data.sendDateTime);

                setIsNew(true);
            }
            if (notificationsDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    // ...notificationsDialog.data,
                });
                handleDateChange(moment(Date.now()).utcOffset('+0530').format("YYYY-MM-DD[T]HH:mm"));
                setIsNew(false);
            }
        },
        [notificationsDialog.data, notificationsDialog.type],
    );

    useEffect(() => {

        if (form.fileType == "Image") {
            setAcceptTypes("image/*")
        }
        else {
            setAcceptTypes("application/pdf")
        }


    }, [form.fileType])


    useEffect(() => {

    }, [form.selectedAreas, form.selectedRegions])

    useEffect(() => {
        if (file != null) {
            setForm({
                ...form,
                fileURL: file.filePath,
                fileName: file.fileName
            });
        }
    }, [file]);

    useEffect(() => {
        if (notificationsDialog.props.open) {
            initDialog();
        }
    }, [notificationsDialog.props.open, initDialog]);


    const handleSelectChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    function closeComposeDialog() {
        notificationsDialog.type === 'edit' ? dispatch(Actions.closeEditNotificationsDialog()) : dispatch(Actions.closeNewNotificationsDialog());
    }

    function canBeSubmitted() {

        return (
            form.title.length > 0

        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (notificationsDialog.type === 'new') {
            dispatch(Actions.addNotifications(form));
        }
        else {
            dispatch(Actions.updateNotifications(form));
        }
        closeComposeDialog();
    }

    function setFile(e) {
        console.log(e.target.files[0])
        let file = new FormData();
        var element = e.target.files[0];
        file.append('file', element);
        file.append('type', 'notification');
        dispatch(RootActions.uploadFile(file));
    }

    function handleRemove() {
        dispatch(Actions.removeNotifications(form.id));
        closeComposeDialog();
    }

    function handleRegionChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, selectedRegions: null, areaOfOperationList: [] })

        } else {
            setForm({ ...form, selectedRegions: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
            dispatch(RootActions.getBranchesForRegions(data, form.productLineCode))

        }

    }

    function handleBranchChange({ empty, ...data }) {
        if (empty) {
            setForm({ ...form, selectedBranches: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
            setTerritories([]);
            setDistributors([]);
            setRetailers([]);
        } else {
            setForm({ ...form, selectedBranches: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
            dispatch(RootActions.getTerritoriesForBranches(data, form.productLineCode))
        }

    }
    function handleAreaChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, selectedAreas: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
            setDistributors([]); // reset retail    ers drop down
        } else {
            //dispatch(RootActions.getTerritoriesForAreas(data))
            setForm({ ...form, selectedAreas: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
        }

    }
    function handleTerritoryChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, selectedTerritories: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
            setDistributors([]); // reset retail    ers drop down
        } else {
            let type = (form.notificationFor == 'distributor') ? 'DistributorMember' : 'Distributor';
            dispatch(RootActions.getDistributorsForTerritories(data, type))
            setForm({ ...form, selectedTerritories: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
        }

    }
    function handleDistributorChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, selectedDistributors: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
            setRetailers([]); // reset retailers drop down
        } else {


            dispatch(RootActions.getRetailersForDistributors(data))

            setForm({ ...form, selectedDistributors: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
        }

    }
    function handleRetailerChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, selectedRetailers: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
        } else {
            setForm({ ...form, selectedRetailers: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
        }

    }
    function combineHierachy({ empty, ...data }) {

        let items = form.areaOfOperationList;
        var index = items.findIndex(item => item.heirarchyType == data.heirarchyType)
        console.log(index);
        if (index == -1) {
            return [...form.areaOfOperationList, data];
        }
        else {
            if (empty) { items.splice(index, 1) } else { items[index] = data; }
            return items;
        }

        // setAreas(['New Areass']);

    }


    useEffect(() => {
        setForm({ ...form, areaOfOperationList: [], selectedRegions: [], selectedBranches: [], selectedTerritories: [], selectedDistributors: [], selectedRetailers: [] });
        setRetailers([]);
        setDistributors([]);
        setTerritories([]);
        setBranches([]);
    }, [form.notificationFor])

    useEffect(() => {
        var dat = moment(selectedDate).utcOffset('+0530').format("YYYY-MM-DD[T]HH:mm");
        console.log('====================================');
        setForm({ ...form, sendDateTime: dat })
    }, [selectedDate])

    const disabled = "disabled"
    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...notificationsDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {notificationsDialog.type === 'new' ? 'New Notification' : 'View Notification'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {notificationsDialog.type === 'edit' && (
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {form.name}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <div>
                            <div className="makeStyles-formControl-1067">
                                <FormControl className="flex w-full MuiFormControl-fullWidth  ml-10 mb-10" variant="outlined">
                                    <InputLabel htmlFor="notificationFor">Notification For </InputLabel>
                                    <Select
                                        style={{ width: 1124 }}
                                        value={form.notificationFor}
                                        disabled={isNew}
                                        onChange={handleChange}
                                        input={
                                            <OutlinedInput
                                                labelWidth={("notificationFor".length * 9)}
                                                name="notificationFor"
                                                id="notificationFor" />
                                        }>
                                        {/* <MenuItem value="employee" key="employee">Employee</MenuItem> */}
                                        <MenuItem selected value="retailer" key="retailer">Retailer</MenuItem>
                                        <MenuItem value="distributor" key="distributor">Distributor</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <div>
                            <div className="makeStyles-formControl-1067">
                                <FormControl className="flex w-full MuiFormControl-fullWidth  ml-10 mb-10" variant="outlined">
                                    <InputLabel htmlFor="productLineCode">Product Line</InputLabel>
                                    <Select
                                        style={{ width: 1124 }}

                                        disabled={isNew}
                                        value={form.productLineCode}
                                        onChange={handleSelectChange}
                                        input={
                                            <OutlinedInput
                                                labelWidth={("productLineCode".length * 9)}
                                                name="productLineCode"
                                                id="productLineCode" />
                                        }>
                                        {productLine.map((option) => (<MenuItem value={option.code} key={option.code}>{option.displayName}</MenuItem>))}


                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>




                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <div>
                            <HierarchySelector HeirarchyType={'Region'} EnableExclude={false}
                                Items={regions} EnableExclude={true} disabled={isNew} value={form.selectedRegions} onSelectChange={handleRegionChange}
                            >
                            </HierarchySelector>
                        </div>
                        <div>
                            <HierarchySelector HeirarchyType={'Branch'} EnableExclude={false}
                                Items={branches} EnableExclude={true} disabled={isNew} value={form.selectedBranches} onSelectChange={handleBranchChange}
                            >
                            </HierarchySelector>
                        </div>
                        {/* <div>
                            <HierarchySelector HeirarchyType={'Area'} EnableExclude={false}
                                Items={areas} EnableExclude={true} disabled={isNew} value={form.selectedAreas} onSelectChange={handleAreaChange}
                            >
                            </HierarchySelector>
                        </div> */}
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <div>
                            <HierarchySelector HeirarchyType={'Territory'} EnableExclude={false}
                                Items={territories} EnableExclude={true} disabled={isNew} value={form.selectedTerritories} onSelectChange={handleTerritoryChange}
                            >
                            </HierarchySelector>
                        </div>
                        <div>
                            <HierarchySelector HeirarchyType={'Distributor'} EnableExclude={true}
                                disabled={isNew} Items={distributors} value={form.selectedDistributors} onSelectChange={handleDistributorChange}>
                            </HierarchySelector>
                        </div>
                        <div>
                            {retailers.length > 1 && form.notificationFor == 'retailer' && <HierarchySelector HeirarchyType={'Retailers'} Items={retailers} EnableExclude={true} disabled={isNew} value={form.selectedRetailers}
                                onSelectChange={handleRetailerChange}  ></HierarchySelector>}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <TextField
                            className="mb-24 ml-10 mt-10"
                            label="Title"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            disabled={isNew}
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <TextField
                            className="mb-24  ml-10"
                            label="Notification Detail"
                            id="notificationDetail"
                            name="notificationDetail"
                            value={form.notificationDetail}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            disabled={isNew}
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <TextField
                            className="mb-24  ml-10"
                            label="External Link"
                            id="link"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            disabled={isNew}
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <FormControl className="flex w-full MuiFormControl-fullWidth mb-24 ml-10" variant="outlined">
                            <InputLabel htmlFor="filetype">File Type</InputLabel>
                            <Select
                                value={form.fileType}
                                disabled={isNew}
                                onChange={handleChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={("fileType".length * 9)}
                                        name="fileType"
                                        id="fileType" />
                                }
                            >
                                <MenuItem value="File" key="File">File</MenuItem>
                                <MenuItem value="Image" key="Image">Image</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>

                        {isNew ?
                            <KeyboardDateTimePicker
                                disabled={true}
                                value={selectedDate}
                                onChange={handleDateChange}
                                id="SendDateTime"
                                name="SendDateTime"
                                label="Send Date Time"
                                format={'DD-MM-YYYY HH:mm:ss A'}
                            /> : <KeyboardDateTimePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                id="SendDateTime"
                                name="SendDateTime"
                                label="Send Date Time"
                                onError={console.log}

                                minDate={Date.now()}
                                format={'DD-MM-YYYY HH:mm:ss A'}
                            />}

                        {/* <DateTimePicker
                            id="SendDateTime"
                            name="SendDateTime"
                            label="Send Date Time"
                            inputVariant="outlined"
                            className="mb-24  ml-10"
                            value={selectedDate}
                            onChange={handleDateChange}

                        /> */}
                        {/* <TextField
                            id="SendDateTime"
                            name="SendDateTime"
                            label="Send Date Time"
                            type="datetime-local"
                            defaultValue="2020-01-01T00:00"
                            className="mb-24  ml-10"
                            value={form.SendDateTime}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                        &nbsp;&nbsp;
                        <input
                            accept={acceptTypes}
                            className="hidden"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={setFile}
                            disabled={!form.fileType || isNew}
                        />
                        {
                            notificationsDialog.type === 'new' ?
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" disabled={!form.fileType || isNew}>
                                        Upload
                            </Button>
                                </label> :
                                <p></p>
                        }

                        {form.fileName
                            ? (form.fileType == 'Image' ?
                                <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                    <img className="max-w-none w-auto h-full" src={form.fileURL} alt="GIFT" />
                                </div>
                                :
                                <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                    <a href={form.fileURL}>Preview</a>
                                </div>
                            )
                            : null
                        }

                    </div>

                </DialogContent>

                {notificationsDialog.type === 'new' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                type="submit"
                                disabled={!canBeSubmitted()}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between p-8">
                            {/* <div className="px-16">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!canBeSubmitted()}
                                >
                                    Save
                            </Button>
                            </div> */}
                            <IconButton
                                onClick={handleRemove}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </form>
        </Dialog>
    );
}

export default NotificationsDialog;
