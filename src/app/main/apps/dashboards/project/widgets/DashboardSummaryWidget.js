import React, { useEffect, useRef, useState, useParams, useMemo } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Dividerm, Hidden, Icon, IconButton, Input, Paper, InputAdornment, Typography, Grid, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '../../../../../../@fuse';
import ReactTable from "react-table";
import { actions } from 'react-table';
import ReportHeaderFieldWidget from './ReportHeaderFieldWidget';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function DashboardSummaryWidget(props) {
    const defaultFormState = {
        startDate: null
    }
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [formDisabled,] = useState(false);
    const [filterExpanded, setFilterExpanded] = useState('basics');

    const [reportItems, setReportItems] = useState([]);
    const dispatch = useDispatch();
    var reportSchema = useSelector(({ projectDashboardApp }) => projectDashboardApp.reportState.reportSchema);
    var reportTypes = useSelector(({ projectDashboardApp }) => projectDashboardApp.reportState.reportTypes);
    const [loadingBackdrop, setLoadingBackdrop] = React.useState(false);

    const [parameters, setParameter] = useState([]);

    useEffect(() => {
        // dispatch(Actions.getReportSchema({
        //     reportTypeCode: "SCHMDASHSUMMARY"
        // }));
        dispatch(Actions.getDashboardReportTypes());


    }, [])

    useEffect(() => {
        console.log('==========reportTypes==========================');
        console.log(reportTypes);
        console.log('====================================');
    }, [reportTypes])

    const reportData = useSelector(({ projectDashboardApp }) => {
        console.log(projectDashboardApp.reportState);
        return projectDashboardApp.reportState.reportData;
    });
    useEffect(() => {
        console.log('=========== items changed =========================');
        //console.log(reportData.data.detail);
        console.log('====================================');
        setReportItems(reportData.detail)
        setLoadingBackdrop(false);
    }, [reportData])

    const useStyles = makeStyles((theme) => ({

        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            padding: 24, width: '100%',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: "90%",
            maxWidth: "95%",
        },
        width30: {
            margin: theme.spacing(1),
            minWidth: "30%",
            maxWidth: "30%",

        },
        fullWith: { width: '100%', marginBottom: '10px' },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        }
        ,
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        }, filterHeading: {
            fontSize: '2rem',
            flexBasis: '33.33%',
            flexShrink: 0,
            fontWeight: 'bold',
            textAlign: 'center'
        },

        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        margin100: { marginTop: "100px" }
        , backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

    const classes = useStyles();

    const filters = []
    function getFilters() {
        //var items =[]
        if (!reportSchema) return [];
        for (let filter of reportSchema.filters) {
            filters.push(<FormControl className={classes.formControl}>
                <InputLabel id="CalculationBase">{filter.filterLabel}</InputLabel>
                <Select
                    disabled={formDisabled}

                    labelId="CalculationBase"
                    id="CalculationBase"
                    name="calculationBase"
                    onChange={(value) => { handleFilterChange(filter.filterName, value.target.value) }}
                    value={form.calculationBase} >
                    {filter.options.map((value, index) => {
                        return <MenuItem value={value.code}>{value.description}</MenuItem>
                    })}

                </Select>
            </FormControl>)
        }
    }

    function handleExport(e) {

        var query = {
            parameters: parameters,
            reportDetails: reportSchema
        }
        dispatch(Actions.exportToExcel(query))
        //        dispatch(Actions.exportToExcel({ reportDetails: reportTypes[selectedIndex], parameters: parameters }));
    }

    function getHeaderValue(field) {
        console.log(field)
        if (reportData && reportData.header && reportData.header[field]) return reportData.header[field];
        else return '';
    }

    function getDetail() {
        console.log(reportData);
        return reportData.detail;

    }
    function handleApplyFilter() {
        //alert()
        var query = {
            parameters: parameters,
            reportDetails: reportSchema
        }
        dispatch(Actions.getReportData(query))
        setLoadingBackdrop(true)
    }

    //const handleDateFilterChange = (name, value1) => {

    //    var dat = moment(value1).utcOffset('+0530').format("MM-DD-YYYY");


    //    var index = parameters.findIndex(it => it.name == name);
    //    let newArray = [...parameters]
    //    newArray[index] = { ...newArray[index], value: dat }
    //    setParameter(newArray)
    //}

    const handleFilterChange = (name, value1) => {
        //   alert(value1)
        var index = parameters.findIndex(it => it.name == name);
        if (index == -1) {
            parameters.push({ name: name, value: value1 })
            let newArray = [...parameters]
            setParameter(newArray)
        }
        else {
            let newArray = [...parameters]
            newArray[index] = { ...newArray[index], value: value1 }
            setParameter(newArray)
        }
        try {
            if (name == 'RegionCode') {
                let plPara = parameters.find(it => it.name == 'PL');
                dispatch(Actions.getBranchesForRegions(value1, plPara ? plPara.value : ''));
            }
            if (name == 'PL') {
                let plPara = parameters.find(it => it.name == 'RegionCode');
                dispatch(Actions.getBranchesForRegions(plPara.value, value1));
            }
        }
        catch (ex) {
        }
    }

    const handleFilterExpansion = () => (isExpanded) => {

        setFilterExpanded(filterExpanded ? false : true);
    };

    const handleReportTypeChange = (value) => {
        dispatch(Actions.getReportSchema({
            reportTypeCode: value
        }));
    }
    getFilters();
    return (



        <Paper className="w-full rounded-8 shadow-none border-1" >
            <div className="flex items-center justify-between px-16 h-64 ">

                <FormControl className={classes.width30}>
                    <InputLabel id="CalculationBase">Report Type</InputLabel>
                    <Select

                        labelId="ReportType"
                        id="ReportType"
                        name="ReportType"
                        onChange={(value) => { handleReportTypeChange(value.target.value) }}
                        value={form.calculationBase} >
                        {reportTypes.map((value, index) => {
                            return <MenuItem value={value.reportTypeCode}>{value.reportTypeName}</MenuItem>
                        })}

                    </Select>
                </FormControl>


            </div>

            <div className="flex items-center  px-16 h-64 border-b-1">
                <Grid item md={1} className={classes.filterHeading} >Filters</Grid>

                {filters.map((filter) => { return <Grid item md={1}>{filter}</Grid> })}

                <Grid item md={3} >
                    <Button variant="contained" color="primary" onClick={() => handleApplyFilter()} >Apply Filters</Button>
                    <Button variant="contained" color="secondary" onClick={(e) => handleExport(e)}>Export </Button>
                </Grid>

            </div>

            <div className="h-400 w-full p-32" style={{ display: 'table' }}>
                <div>

                    {reportSchema && reportSchema.headerFields && reportSchema.headerFields.length > 0 && (
                        <Grid container spacing={0}
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '12vh' }}>
                            {

                                reportSchema.headerFields.map((value, index) => {


                                    return (<Grid item md={3}> <ReportHeaderFieldWidget label={value.label} value={getHeaderValue(value.fieldName)} /> </Grid>)
                                    // return (<div className="flex flex-1 items-center justify-between" style={{ 'width': '300px' }}>
                                    //     <div className="flex items-center">{value.label}</div>
                                    //     <div className="flex items-center"> {getHeaderValue(value.fieldName)}</div>
                                    // </div>)
                                })
                            }
                        </Grid>)}
                    <div className="table-responsive">
                        {reportSchema && (
                            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                                <ReactTable

                                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                                    getTrProps={(state, rowInfo, column) => {
                                        return {
                                            className: "cursor-pointer",
                                        };
                                    }}
                                    data={reportItems}
                                    columns={
                                        reportSchema.detailFields.map(field => { return { Header: field.label, id: field.fieldName, accessor: (data => data[field.fieldName]), }; })

                                    }
                                    defaultPageSize={10}
                                    noDataText="No records to display."
                                />
                            </FuseAnimate>)
                        }
                    </div>

                </div>
            </div>
            <Backdrop className={classes.backdrop} open={loadingBackdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Paper >

    );
}

export default React.memo(DashboardSummaryWidget);
