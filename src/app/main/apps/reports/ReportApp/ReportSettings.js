import React, { useEffect, useRef, useState, useParams, useMemo } from 'react';
import { Button, Dividerm, Hidden, Icon, IconButton, Input, Paper, InputAdornment, Typography, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import MaterialTable from 'material-table';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HierarchySelector from '../../../customComponents/HierarchySelector'
import * as RootActions from 'app/store/actions'
import { useForm } from '@fuse/hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';




import ReportHeader from './ReportHeader'

import { FusePageCarded, DemoContent } from '@fuse';
import ReportSideMenu from './ReportSideMenu';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers'

function ReportSettings(props) {

    useEffect(() => {

        if (props.match.params.id) {
            dispatch(Actions.getReportById(props.match.params.id))
            // setFormDisabled(true);
        } else {
            dispatch(Actions.clearForm());
            setFormDisabled(false);
        }
    }, [props.match.params])


    ///////////////////////////////////////////////////

    const pageLayout = useRef(null);


    const defaultFormState = {
        startDate: null,
        endDate: null,
        settlementDate: null,
        memberType: 'retailer',
        reportType: 'base',
        areaOfOperationList: [],
        regions: null,
        branches: null,
        asMs: null,
        territories: null,
        distributors: null,
        retailers: null,
        productLineCode: '',
        reportTitle: '',
        budget: 0,
        channel: '',
        mouBenefit: '',
        distributorSource: '',
        calculationMethod: '',
        group: '',
        calculationBase: '',
        mouPeriodTo: null,
        mouPeriodFrom: null,
        growthPeriodTo: null,
        growthPeriodFrom: null,
        tripEntlFlg: false,
        mouAchvFlg: false,
        paSalesFlg: false,
        growthFlg: false,
        productCategories: null,
        productSubCategories: null,
        products: null
    };

    const defaultSlabState = {
        columns: [
            {
                name: 'StartFrom', title: 'Start From', field: 'slabStartFrom', type: 'numeric', initialEditValue: 0,
            },
            {
                name: 'EndTo', title: 'Slab End', field: 'slabEndTo', type: 'numeric', initialEditValue: 0
            },
            {
                name: 'points', title: 'Points', field: 'points', type: 'numeric', initialEditValue: 0
            }
            ,
            {
                name: 'multiple', title: 'Multiple', field: 'multiple', type: 'numeric', initialEditValue: 0
            }


        ],
        data: [

        ],
    }


    const { form, handleChange, setForm } = useForm(defaultFormState);

    //Basic 
    const [productLine, setProductLine] = useState([]);
    const [productCategoriesMaster, setProductCategoriesMaster] = useState([]);
    const [productSubCategoriesMaster, setProductSubCategoriesMaster] = useState([]);
    const [productsMaster, setProductsMaster] = useState([]);

    // const [selectedProdLine, setSelectedProdLine] = useState([]);


    // Geography
    const [regions, setRegions] = useState([]);
    const [branches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const [territories, setTerritories] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [retailers, setRetailers] = useState([]);

    const [formDisabled, setFormDisabled] = useState(false);
    const fromReducer = useSelector(state => state.reportApp.report);

    useEffect(() => {

        dispatch(RootActions.getBaseHierarchy());
        dispatch(RootActions.getProductLineMaster());
        dispatch(Actions.getTrips());


    }, [])



    //from api
    const trips = useSelector(state => state.reportApp.report.trips);

    const hierarchyMaster = useSelector(({ shared }) => shared.hierarchyMaster);
    const productMaster = useSelector(({ shared }) => shared.productMaster);


    useEffect(() => {
        console.log('================trips====================');
        console.log(trips);
        console.log('====================================');
    }, [trips])


    useEffect(() => {
        if (hierarchyMaster.distributors && hierarchyMaster.distributors != undefined) {
            setDistributors(hierarchyMaster.distributors);
        }

        if (hierarchyMaster.retailers && hierarchyMaster.retailers != undefined) {
            setRetailers(hierarchyMaster.retailers)
        }

        if (hierarchyMaster.territories && hierarchyMaster.territories != undefined) {
            setTerritories(hierarchyMaster.territories)
        }

        if (hierarchyMaster.regions && hierarchyMaster.regions != undefined) {
            setRegions(hierarchyMaster.fregions)
        }

        if (hierarchyMaster.branches && hierarchyMaster.branches != undefined) {
            setBranches(hierarchyMaster.branches)
        }

        if (hierarchyMaster.areas && hierarchyMaster.areas != undefined) {
            setAreas(hierarchyMaster.areas)
        }

    }, [hierarchyMaster])




    useEffect(() => {


        if (productMaster.prodLines && productMaster.prodLines != undefined) {
            setProductLine(productMaster.prodLines)
        }
        if (productMaster.productCategories && productMaster.productCategories != undefined) {

            setProductCategoriesMaster(productMaster.productCategories)
        }
        if (productMaster.productCategories && productMaster.productCategories != undefined) {

            setProductCategoriesMaster(productMaster.productCategories)
        }
        if (productMaster.productSubCategories && productMaster.productSubCategories != undefined) {

            setProductSubCategoriesMaster(productMaster.productSubCategories)
        }

        if (productMaster.products && productMaster.products != undefined) {

            setProductsMaster(productMaster.products)
        }



    }, [productMaster])





    useEffect(() => {
        console.log('==============fromReducer======================');
        console.log(fromReducer);
        console.log('====================================');
        setForm({
            ...fromReducer.data,
        });


        if (fromReducer.data.reportSlabs) { setSlab({ ...slab, data: fromReducer.data.reportSlabs }) } else { setSlab(defaultSlabState) }
        if (fromReducer.data.tripEntlFlg) {
            addTripColInSlab();

        }
        if (fromReducer.data.growthFlg) {
            addGrowthColInSlab();
        }

        if (fromReducer.data.reportType == 'bonus') {
            ChangeMultipleColLabel('Bonus %')
        }
    }, [fromReducer])


    function handleProductCategoryChange({ empty, ...data }) {

        if (empty) {
            setProductSubCategoriesMaster([]);
            setForm({ ...form, productCategories: null })
        } else {
            dispatch(RootActions.getProductSubCategories(data))
            setForm({ ...form, productCategories: data })

        }

    }
    function handleProductSubCategoryChange({ empty, ...data }) {

        if (empty) {
            setProductSubCategoriesMaster([]);
            setProductsMaster([]);
            setForm({ ...form, productSubCategories: null })
        } else {
            dispatch(RootActions.getProducts(data))
            setForm({ ...form, productSubCategories: data })

        }

    }
    function handleProductChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, products: null })
        } else {
            setForm({ ...form, products: data })

        }

    }



    function handleRegionChange({ empty, ...data }) {

        if (empty) {
            setBranches([]);
            setAreas([]);
            setTerritories([]);
            setDistributors([]);
            setRetailers([]);
            setForm({ ...form, regions: null, })
        } else {
            setForm({ ...form, regions: data, })
        }

    }
    function handleBranchChange({ empty, ...data }) {

        if (empty) {
            setAreas([]);
            setTerritories([]);
            setDistributors([]);
            setRetailers([]);
            setForm({ ...form, branches: null, })
        } else {
            setForm({ ...form, branches: data, })
        }

    }
    function handleAreaChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, asMs: null, })
            setTerritories([]);
            setDistributors([]);
            setRetailers([]);
        } else {
            dispatch(RootActions.getTerritoriesForAreas(data))
            setForm({ ...form, asMs: data, })
        }

    }
    function handleTerritoryChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, territories: null, })
            setDistributors([]);
            setRetailers([]);
            // reset retail    ers drop down
        } else {
            let type = (form.memberType == 'distributor') ? 'distributormembers' : 'distributors';
            dispatch(RootActions.getDistributorsForTerritories(data, type))
            setForm({ ...form, territories: data, })
        }


    }
    function handleDistributorChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, distributors: null, })
            setRetailers([]); // reset retailers drop down
        } else {


            dispatch(RootActions.getRetailersForDistributors(data))

            setForm({ ...form, distributors: data, })
        }

    }
    function handleRetailerChange({ empty, ...data }) {

        if (empty) {
            setForm({ ...form, retailers: null, })
        } else {
            setForm({ ...form, retailers: data, })
        }

    }

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
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        margin100: { marginTop: "100px" }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    //  const searchText = useSelector(({feedbackCategoryApp}) => feedbackCategoryApp.feedbackCategory.searchText);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }




    function handleSubmit(event) {
        event.preventDefault();

        console.log('==================handleSubmit==================');
        console.log(form);
        console.log('====================================');
        dispatch(Actions.addReport(form));
    }
    const [rightExpanded, setRightExpanded] = React.useState('reportSettings');
    const [leftExpanded, setLeftExpanded] = React.useState('basics');


    const handleRightPanelChange = (panel) => (event, isExpanded) => {

        setRightExpanded(isExpanded ? panel : false);
    };
    const handleLeftPanelChange = (panel) => (event, isExpanded) => {

        setLeftExpanded(isExpanded ? panel : false);
    };


    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


    const handleSelectChange = (e) => {
        if (e.target.name == 'productLineCode') {
            dispatch(RootActions.getProductCategories(e.target.value))
            //call to get products
        }
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };





    function ChangeMultipleColLabel(label) {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setSlab(prevState => {
                    const columns = [...prevState.columns];
                    var multipleIndex = columns.findIndex(it => it.field == 'multiple')
                    columns[multipleIndex].title = label;
                    const data = [...prevState.data];
                    data.forEach(row => {
                        if (row["multiple"] > 100) {
                            row["multiple"] = 0
                        }
                    });
                    return { ...prevState, columns, data };
                });
            }, 600);
        })

    }

    const handleReportTypeChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.value == "bonus") {
            ChangeMultipleColLabel('Bonus %')
        }
        else {
            ChangeMultipleColLabel('Multiple')
        }
    }
    function addGrowthColInSlab() {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setSlab(prevState => {
                    const columns = [...prevState.columns];
                    if (columns.findIndex(it => it.field == 'growthPercent') == -1) {

                        columns.push({
                            title: 'Growth %',
                            field: 'growthPercent',
                            type: 'numeric',
                            maxLength: '100'
                        });
                    }
                    const data = [...prevState.data];
                    //data.forEach(row => row["growthPercent"] = 0);

                    return { ...prevState, columns, data };
                });

            }, 600);
        })
    }

    function removeGrowthColInSlab() {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setSlab(prevState => {
                    const columns = [...prevState.columns];
                    columns.splice(columns.findIndex((e) => e.field == "growthPercent"), 1);
                    const data = [...prevState.data];
                    data.forEach(row => delete row["growthPercent"]);
                    return { ...prevState, columns, data };
                });
            }, 600);
        })
    }
    const handleGrowthFlagChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.checked });
        if (e.target.checked) {
            addGrowthColInSlab()
        }
        else {
            removeGrowthColInSlab()
        }
    }
    function addTripColInSlab() {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setSlab(prevState => {

                    var tripLookup = {};
                    trips.map(it => {
                        tripLookup[it.id] = it.giftName;
                    })
                    const columns = [...prevState.columns];
                    if (columns.findIndex(it => it.field == 'giftId') == -1 && trips.length > 0) {
                        columns.push(
                            {
                                name: 'giftId', title: 'Trip', field: 'giftId', lookup: tripLookup
                            });
                        const data = [...prevState.data];
                        //    data.forEach(row => row["giftId"] = '');
                        return { ...prevState, columns, data };
                    }
                    return { ...prevState }
                });
            }, 600);
        })

    }
    function removeTripColInSlab() {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setSlab(prevState => {
                    const columns = [...prevState.columns];
                    columns.splice(columns.findIndex((e) => e.field == "giftId"), 1);
                    const data = [...prevState.data];
                    data.forEach(row => delete row["giftId"]);
                    return { ...prevState, columns, data };
                });
            }, 600);
        })

    }

    const handleTripFlagChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.checked });
        e.target.checked ? addTripColInSlab() : removeTripColInSlab();

    }
    const handleCalculationBaseChange = function (e) {
        if ((e.target.value == 'value' && form.calculationMethod == 'perpc') || (e.target.value == 'quantity' && form.calculationMethod == 'per100')) {
            setForm({ ...form, [e.target.name]: e.target.value, calculationMethod: '' })
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

    }







    const [personName, setPersonName, age, setAge] = React.useState([]);
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




    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);

    }

    function handleChangeParseInt(e) {

        setForm({ ...form, [e.target.name]: parseInt(e.target.value) })

    }

    const [slab, setSlab] = React.useState(defaultSlabState);


    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <ReportHeader header={props.match.params.id ? 'Edit Report' : 'Add Report'} pageLayout={pageLayout} />
            }


            content={
                <div style={{ margin: '1% 1% 1% 1%', overflow: 'hidden' }}>
                    <Grid container spacing={2}>
                        <Grid item md={3} >

                            <div className=" ">
                                <ExpansionPanel expanded={leftExpanded === 'basics'} onChange={handleLeftPanelChange('basics')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography className={classes.heading}>Basic Details</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item md={12}>
                                                <FormControl className={classes.formControl}>
                                                    <TextField
                                                        className="mb-24"
                                                        label="Report Title"
                                                        id="reportTitle"
                                                        name="reportTitle"
                                                        value={form.reportTitle}
                                                        onChange={handleChange}
                                                        disabled={formDisabled}
                                                        //  variant="outlined"
                                                        fullWidth
                                                    />
                                                </FormControl></Grid>
                                            <Grid item md={12}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="memberType">Member Type</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}
                                                        labelId="memberType"
                                                        id="memberType"
                                                        name="memberType"
                                                        value={form.memberType}
                                                        onChange={handleChange}
                                                        fullWidth
                                                    >
                                                        <MenuItem value={'retailer'}>Retailer</MenuItem>
                                                        <MenuItem value={'distributor'}>Distributor</MenuItem>
                                                        <MenuItem value={'employee'}>Employee</MenuItem>
                                                        <MenuItem value={'dms'}>DMS</MenuItem>
                                                    </Select>
                                                </FormControl></Grid>
                                            <Grid item md={12}> <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Product Line</InputLabel>
                                                <Select
                                                    disabled={formDisabled}

                                                    labelId="demo-simple-select-label"
                                                    id="productLineCode"
                                                    name="productLineCode"
                                                    value={form.productLineCode}
                                                    onChange={handleSelectChange}

                                                >
                                                    {productLine.map((option) => (<MenuItem value={option.code} key={option.code}>{option.displayName}</MenuItem>))}
                                                </Select>


                                            </FormControl>
                                            </Grid>

                                            <Grid item md={12}>

                                                <FormControl className={classes.formControl}>
                                                    <TextField id="standard-basic" label="Budget"
                                                        name="budget"
                                                        id="budget"
                                                        value={form.budget}
                                                        onChange={handleChangeParseInt}
                                                        type="number"
                                                        disabled={formDisabled}

                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={12}> <FormControl className={classes.formControl}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                                    <KeyboardDatePicker
                                                        maxDate={form.endDate}
                                                        maxDateMessage={"Should be less than 'End Date'"}
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="endDate"
                                                        label="Report Start Date"
                                                        name="startDate"
                                                        value={form.startDate}
                                                        autoOk={true}
                                                        onChange={(date) => { setForm({ ...form, startDate: date }) }}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        disabled={formDisabled}

                                                    />
                                                </MuiPickersUtilsProvider>

                                            </FormControl>
                                            </Grid>
                                            <Grid item md={12}> <FormControl className={classes.formControl}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                                    <KeyboardDatePicker
                                                        minDate={form.startDate}
                                                        minDateMessage={"Should be greater than 'Start Date'"}
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="endDate"
                                                        label="Report End Date"
                                                        name="endDate"
                                                        value={form.endDate}
                                                        autoOk={true}
                                                        onChange={(date) => { setForm({ ...form, endDate: date }) }}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        disabled={formDisabled}

                                                    />
                                                </MuiPickersUtilsProvider>

                                            </FormControl>
                                            </Grid>
                                            <Grid item md={12}>
                                                <FormControl className={classes.formControl} >
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                                        <KeyboardDatePicker
                                                            minDate={form.endDate}
                                                            minDateMessage={"Should be greater than 'Report End Date'"}
                                                            disableToolbar
                                                            variant="inline"
                                                            format="MM/dd/yyyy"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            label="Settlement Date"
                                                            value={form.settlementDate}
                                                            autoOk={true}
                                                            onChange={(date) => { setForm({ ...form, settlementDate: date }) }}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                            disabled={formDisabled}

                                                        />
                                                    </MuiPickersUtilsProvider>

                                                </FormControl>
                                            </Grid>


                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <ExpansionPanel expanded={leftExpanded === 'geography'} onChange={handleLeftPanelChange('geography')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.heading}>Geography</Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className="p-10">
                                        <Grid container>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Region'} EnableExclude={false}
                                                    Items={regions} EnableExclude={true} value={form.regions} onSelectChange={handleRegionChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Branch'} EnableExclude={false}
                                                    Items={branches} EnableExclude={true} value={form.branches} onSelectChange={handleBranchChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Area'} EnableExclude={false}
                                                    Items={areas} EnableExclude={true} value={form.asMs} onSelectChange={handleAreaChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Territory'} EnableExclude={false}
                                                    Items={territories} EnableExclude={true} value={form.territories} onSelectChange={handleTerritoryChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Distributor'} EnableExclude={true}
                                                    Items={distributors} value={form.distributors} onSelectChange={handleDistributorChange}>
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                {retailers.length > 1 && (form.memberType == "retailer") &&
                                                    <HierarchySelector disabled={formDisabled} HeirarchyType={'Retailers'} Items={retailers} EnableExclude={true}
                                                        value={form.retailers} onSelectChange={handleRetailerChange}  >
                                                    </HierarchySelector>
                                                }
                                            </Grid>
                                        </Grid>


                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <ExpansionPanel expanded={leftExpanded === 'products'} onChange={handleLeftPanelChange('products')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                    >
                                        <Typography className={classes.heading}>Products</Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className="p-10">
                                        <Grid container>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Product Categories'} EnableExclude={false}
                                                    Items={productCategoriesMaster} EnableExclude={true} value={form.productCategories} onSelectChange={handleProductCategoryChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Product Sub Categories'} EnableExclude={false}
                                                    Items={productSubCategoriesMaster} EnableExclude={true} value={form.productSubCategories} onSelectChange={handleProductSubCategoryChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                            <Grid item md={12}>
                                                <HierarchySelector disabled={formDisabled} HeirarchyType={'Products'} EnableExclude={false}
                                                    Items={productsMaster} EnableExclude={true} value={form.products} onSelectChange={handleProductChange}
                                                >
                                                </HierarchySelector>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <ExpansionPanel expanded={leftExpanded === 'panel4'} onChange={handleLeftPanelChange('panel4')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography className={classes.heading}>Notification</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Notification Settings
            </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </div>


                        </Grid>
                        <Grid item md={9} >

                            <div className=" ">
                                <ExpansionPanel expanded={rightExpanded === 'reportSettings'} onChange={handleRightPanelChange('reportSettings')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography className={classes.heading}>Report Settings</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item md={3} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="CalculationBase">Base</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}

                                                        labelId="CalculationBase"
                                                        id="CalculationBase"
                                                        name="calculationBase"
                                                        value={form.calculationBase}
                                                        onChange={handleCalculationBaseChange}
                                                    >
                                                        <MenuItem value={'quantity'}>Quantity</MenuItem>
                                                        <MenuItem value={'value'}>Value</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item md={3} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="calculationMethod">Point Calucation Base</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}

                                                        labelId="calculationMethod"
                                                        id="calculationMethod"
                                                        name="calculationMethod"
                                                        value={form.calculationMethod}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={'fixed'}>Fixed</MenuItem>
                                                        <MenuItem disabled={form.calculationBase == 'quantity'} value={'per100'}>Per &#8377; 100</MenuItem>
                                                        <MenuItem disabled={form.calculationBase == 'value'} value={'perpc'}>Per Piece </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Distributor Source</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}

                                                        labelId="distributorSource"
                                                        id="distributorSource"
                                                        name="distributorSource"
                                                        value={form.distributorSource}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={'primary'}>Primary Sales</MenuItem>
                                                        <MenuItem value={'secondary'}>Secondary Sales</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="group">Group</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}

                                                        labelId="group"
                                                        id="group"
                                                        name="group"
                                                        value={form.group}
                                                        onChange={handleChange}
                                                    >


                                                        <MenuItem value={'group1'}>Group 1</MenuItem>
                                                        <MenuItem value={'group2'}>Group 2</MenuItem>
                                                        <MenuItem value={'group3'}>Group 3</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="Channel">Channel</InputLabel>
                                                    <Select
                                                        disabled={formDisabled}

                                                        labelId="Channel"
                                                        id="channel"
                                                        name="channel"
                                                        value={form.channel}
                                                        onChange={handleChange}
                                                    >


                                                        <MenuItem value={'channel1'}>Channel 1</MenuItem>
                                                        <MenuItem value={'channe2'}>Channel 2</MenuItem>
                                                        <MenuItem value={'channe3'}>Channel 3</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>



                                            <Grid item md={3}>
                                                <FormControl component="fieldset">
                                                    <FormLabel compo nent="legend">Report Type</FormLabel>
                                                    <RadioGroup disabled={formDisabled}
                                                        aria-label="reportType" id="reportType" name="reportType" onChange={handleReportTypeChange} value={form.reportType} row>


                                                        <FormControlLabel
                                                            value="base"
                                                            control={<Radio color="primary" />}
                                                            label="Base"
                                                            disabled={formDisabled}
                                                            labelPlacement="base"
                                                        />
                                                        <FormControlLabel
                                                            disabled={formDisabled}
                                                            value="bonus"
                                                            control={<Radio color="primary" />}
                                                            label="Bonus"
                                                            labelPlacement="bonus"
                                                        />

                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={9}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">&nbsp;</FormLabel>
                                                    <FormGroup aria-label="position" row>
                                                        <FormControlLabel
                                                            value="paSales"
                                                            control={<Checkbox checked={form.paSalesFlg} color="primary" />}
                                                            label="PA Sales"
                                                            labelPlacement="end"
                                                            name="paSalesFlg"
                                                            id="paSalesFlg"
                                                            onChange={handleChange}
                                                            value={form.paSalesFlg}
                                                            disabled={formDisabled}

                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>

                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br></br>
                                <ExpansionPanel expanded={rightExpanded === 'advance'} onChange={handleRightPanelChange('advance')}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography className={classes.heading}>Advace Settings</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>


                                            <Grid item md={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">&nbsp;</FormLabel>
                                                    <FormGroup aria-label="position" row>

                                                        <FormControlLabel
                                                            value="end"
                                                            control={<Checkbox checked={form.mouAchvFlg} color="primary" />}
                                                            label='MOU Achivement'
                                                            labelPlacement="end"
                                                            name="mouAchvFlg"
                                                            id="mouAchvFlg"
                                                            onChange={handleChange}
                                                            disabled={formDisabled}
                                                            value={form.mouAchvFlg}
                                                        />

                                                        <FormControlLabel
                                                            value="end"
                                                            control={<Checkbox checked={form.growthFlg} color="primary" />}
                                                            label='Growth'
                                                            labelPlacement="end"
                                                            name="growthFlg"
                                                            id="growthFlg"
                                                            onChange={handleGrowthFlagChange}
                                                            disabled={formDisabled}
                                                            value={form.growthFlg}
                                                        />

                                                        <FormControlLabel
                                                            value="end"
                                                            control={<Checkbox checked={form.tripEntlFlg} color="primary" />}
                                                            label="Trip Entitlement"
                                                            labelPlacement="end"
                                                            name="tripEntlFlg"
                                                            id="tripEntlFlg"
                                                            onChange={handleTripFlagChange}
                                                            value={form.tripEntlFlg}
                                                            disabled={formDisabled}

                                                        />

                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>


                                            <Grid item md={12} >
                                                {form.mouAchvFlg && <Grid container>

                                                    <Grid item md={4}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                maxDate={form.mouPeriodTo}
                                                                maxDateMessage={"Should be less than 'MOU Period To'"}
                                                                disableToolbar
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="mouPeriodFrom"
                                                                name="mouPeriodFrom"
                                                                label="MOU Period From"
                                                                value={form.mouPeriodFrom}
                                                                autoOk={true}
                                                                onChange={(date) => { setForm({ ...form, mouPeriodFrom: date }) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                                disabled={formDisabled}

                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                minDate={form.mouPeriodFrom}
                                                                minDateMessage={"Should be greater than 'MOU Period From'"}
                                                                disableToolbar
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="mouPeriodTo"
                                                                name="mouPeriodTo"
                                                                label="MOU Period To"
                                                                value={form.mouPeriodTo}
                                                                autoOk={true}
                                                                onChange={(date) => { setForm({ ...form, mouPeriodTo: date }) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                                disabled={formDisabled}

                                                            />
                                                        </MuiPickersUtilsProvider>

                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel id="mouBenefit">MOU Benefit</InputLabel>
                                                            <Select
                                                                disabled={formDisabled}

                                                                labelId="mouBenefit"
                                                                id="mouBenefit"
                                                                name="mouBenefit"
                                                                value={form.mouBenefit}
                                                                onChange={handleChange}
                                                            >

                                                                <MenuItem value={'FixedPoint'}>Fixed Point</MenuItem>
                                                                <MenuItem value={'Percentage'}>Percentage</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>}
                                            </Grid>

                                            <Grid item md={12} >
                                                {form.growthFlg && <Grid container>

                                                    <Grid item md={4}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                maxDate={form.growthPeriodTo}
                                                                maxDateMessage={"Should be less than 'Growth Period To'"}
                                                                disableToolbar
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="growthPeriodFrom"
                                                                name="growthPeriodFrom"
                                                                label="Growth Period From"
                                                                value={form.growthPeriodFrom}
                                                                autoOk={true}
                                                                onChange={(date) => { setForm({ ...form, growthPeriodFrom: date }) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                                disabled={formDisabled}

                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                minDate={form.growthPeriodFrom}
                                                                minDateMessage={"Should be greater than 'Growth Period From'"}
                                                                disableToolbar
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="growthPeriodEnd"
                                                                name="growthPeriodEnd"
                                                                label="Growth Period End"
                                                                value={form.growthPeriodTo}
                                                                autoOk={true}
                                                                onChange={(date) => { setForm({ ...form, growthPeriodTo: date }) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                                disabled={formDisabled}

                                                            />
                                                        </MuiPickersUtilsProvider>

                                                    </Grid>
                                                </Grid>}
                                            </Grid>

                                        </Grid>


                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <MaterialTable
                                    tableLayout="auto"
                                    style={{
                                        width: "100%",
                                        marginTop: "2%",
                                    }}

                                    options={{
                                        search: false, paging: false,
                                        headerStyle: {
                                            backgroundColor: 'lightgray',
                                            color: '#000',

                                        },


                                        actionsColumnIndex: -1

                                    }}
                                    title="Slabs"
                                    columns={slab.columns}
                                    data={slab.data}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {

                                                    resolve();
                                                    setSlab(prevState => {
                                                        const data = [...prevState.data];
                                                        newData.points = +newData.points;
                                                        newData.slabStartFrom = +newData.slabStartFrom;
                                                        newData.slabEndTo = +newData.slabEndTo;

                                                        if (newData.multiple) newData.multiple = +newData.multiple;
                                                        if (newData.growthPercent) newData.growthPercent = +newData.growthPercent;
                                                        if (newData.giftId) newData.giftId = +newData.giftId;


                                                        data.push(newData);

                                                        setForm({ ...form, reportSlabs: data })
                                                        return { ...prevState, data };
                                                    });
                                                }, 600);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    resolve();
                                                    if (oldData) {
                                                        newData.points = +newData.points;
                                                        newData.slabStartFrom = +newData.slabStartFrom;
                                                        newData.slabEndTo = +newData.slabEndTo;
                                                        if (newData.multiple) newData.multiple = +newData.multiple;
                                                        if (newData.growthPercent) newData.growthPercent = +newData.growthPercent;
                                                        if (newData.giftId) newData.giftId = +newData.giftId;

                                                        setSlab(prevState => {
                                                            const data = [...prevState.data];
                                                            data[data.indexOf(oldData)] = newData;
                                                            setForm({ ...form, reportSlabs: data })
                                                            return { ...prevState, data };
                                                        });
                                                    }
                                                }, 600);
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    resolve();
                                                    setSlab(prevState => {
                                                        const data = [...prevState.data];
                                                        data.splice(data.indexOf(oldData), 1);
                                                        setForm({ ...form, reportSlabs: data })
                                                        return { ...prevState, data };
                                                    });
                                                }, 600);
                                            }),
                                    }}
                                />

                                <br></br>
                                <Grid container>

                                    <Grid item md={1} >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<DeleteIcon />}
                                            size="medium"
                                            onClick={() => { dispatch(Actions.clearForm()) }}
                                            disabled={formDisabled}

                                        >
                                            Clear
                                 </Button>

                                    </Grid>
                                    <Grid item md={1} >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                            type="submit"
                                            startIcon={<SaveIcon />}
                                            size="medium"
                                            disabled={formDisabled}
                                        >
                                            Submit
                             </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                </div >

            }
        />
    )

}

//export default ReportSettings;
export default withReducer('reportApp', reducer)(ReportSettings);