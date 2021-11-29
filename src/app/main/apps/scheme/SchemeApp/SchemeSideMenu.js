import React, { useEffect, useRef, useState } from 'react';
import { Button, Dividerm, Hidden, Icon, IconButton, Input, Paper, InputAdornment, Typography, Grid, TextField } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';

import { useForm } from '@fuse/hooks';

import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HierarchySelector from '../../../customComponents/HierarchySelector'
import * as RootActions from 'app/store/actions'



import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function SchemeSideMenu(props) {
  const defaultFormState = {
    schemeFor: 'retailer',
    areaOfOperationList: [],
    selectedRegions: null,
    selectedBranches: null,
    selectedAreas: null,
    selectedTerritories: null,
    selectedDistributors: null,
    selectedRetailers: null,
    productLineCode: null,
    schemeTitle: null,
    budget: null

  };


  // function saveandcontinue() {
  //   //  dispatch(Actions.setSideMenuData(form));
  //   alert('')
  //   props.changeTab(1);

  // }

  const { form, handleChange, setForm } = useForm(defaultFormState);


  //Basic 
  const [productLine, setProductLine] = useState([]);

  // const [selectedProdLine, setSelectedProdLine] = useState([]);


  // Geography
  const [regions, setRegions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [retailers, setRetailers] = useState([]);
  useEffect(() => {
    dispatch(RootActions.getBaseHierarchy());
    dispatch(RootActions.getProductLineMaster());

  }, [])

  //from api
  const hierarchyMaster = useSelector(({ shared }) => shared.hierarchyMaster);

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
      setRegions(hierarchyMaster.regions)
    }

    if (hierarchyMaster.branches && hierarchyMaster.branches != undefined) {
      setBranches(hierarchyMaster.branches)
    }

    if (hierarchyMaster.areas && hierarchyMaster.areas != undefined) {
      setAreas(hierarchyMaster.areas)
    }

    if (hierarchyMaster.pl && hierarchyMaster.pl != undefined) {
      setProductLine(hierarchyMaster.pl)
    }

  }, [hierarchyMaster])




  const selectList = ['Region', 'Branch', 'Area', 'Territory', 'Distributor', 'Retailer'];
  const productSelectList = ['Product Category', 'Product Sub Category', 'Product',];



  const completeForm = useSelector(state => state.schemeApp.scheme);

  useEffect(() => {
    console.log('==============completeForm======================');
    console.log(completeForm);
    console.log('====================================');

    setForm({ ...completeForm })
  }, [completeForm])




  function handleRegionChange({ empty, ...data }) {

    if (empty) {
      setBranches([]);
      setAreas([]);
      setTerritories([]);
      setDistributors([]);
      setRetailers([]);
      setForm({ ...form, selectedRegions: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
    } else {
      setForm({ ...form, selectedRegions: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
    }

  }
  function handleBranchChange({ empty, ...data }) {

    if (empty) {
      setAreas([]);
      setTerritories([]);
      setDistributors([]);
      setRetailers([]);
      setForm({ ...form, selectedBranches: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
    } else {
      setForm({ ...form, selectedBranches: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
    }

  }
  function handleAreaChange({ empty, ...data }) {

    if (empty) {
      setForm({ ...form, selectedAreas: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
      setTerritories([]);
      setDistributors([]);
      setRetailers([]);
    } else {
      // dispatch(RootActions.getTerritoriesForAreas(data))
      setForm({ ...form, selectedAreas: data, areaOfOperationList: combineHierachy({ ...data, empty }) })
    }

  }
  function handleTerritoryChange({ empty, ...data }) {

    if (empty) {
      setForm({ ...form, selectedTerritories: null, areaOfOperationList: combineHierachy({ ...data, empty }) })
      setDistributors([]);
      setRetailers([]);
      // reset retail    ers drop down
    } else {
      let type = (form.NotificationFor == 'distributor') ? 'distributormembers' : 'distributors';
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
  const useStyles = makeStyles((theme) => ({
    root: {
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
    //dispatch(authActions.submitLogin(model));
  }
  const [expanded, setExpanded] = React.useState('panel2');

  const handlePanelChange = (panel) => (event, isExpanded) => {

    setExpanded(isExpanded ? panel : false);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


  const handleSelectChange = (e) => {
    if (e.target.name == 'productLineCode') {
      //call to get products
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const styleClasses = {
    width100percent: {
      width: 500
    }
  }
  const handleChange1 = (event) => {
    //dispatch(Actions.getRegions())
    // c1onsole.log(payLoad)
    //setPersonName(event.target.value);
    //  setAge(event.target.value);
  };
  const pageLayout = useRef(null);

  return (

    <div className=" ">
      <form noValidate >
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handlePanelChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Basic Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item md={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                    className="mb-24"
                    label="Scheme Title"
                    id="schemeTitle"
                    name="schemeTitle"
                    value={form.schemeTitle}
                    onChange={handleChange}

                    //  variant="outlined"
                    fullWidth
                  />
                </FormControl></Grid>
              <Grid item md={2}><FormControl className={classes.formControl}>
                <InputLabel id="schemeFor">Scheme For</InputLabel>
                <Select
                  labelId="schemeFor"
                  id="schemeFor"
                  name="schemeFor"
                  value={form.schemeFor}
                  onChange={handleChange}
                >
                  <MenuItem value={'retailer'}>Retailer</MenuItem>
                  <MenuItem value={'distributor'}>Distributor</MenuItem>
                  <MenuItem value={'employee'}>Employee</MenuItem>
                  <MenuItem value={'dms'}>DMS</MenuItem>
                </Select>
              </FormControl></Grid>
              <Grid item md={2}> <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Product Line</InputLabel>
                <Select
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

              <Grid item md={2}>

                <FormControl className={classes.formControl}>
                  <TextField id="standard-basic" label="Budget"
                    name="budget"
                    id="budget"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item md={2}> <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Scheme Start Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>

              </FormControl>
              </Grid>
              <Grid item md={2}> <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Scheme End Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>

              </FormControl>
              </Grid>
              <Grid item md={2}>
                <FormControl className={classes.formControl} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Settlement Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                </FormControl>
              </Grid>


            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br></br>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Geography</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="p-10">
            <Grid container>
              <Grid item md={3}>
                <HierarchySelector HeirarchyType={'Region'} EnableExclude={false}
                  Items={regions} EnableExclude={true} value={form.selectedRegions} onSelectChange={handleRegionChange}
                >
                </HierarchySelector>
              </Grid>
              <Grid item md={3}>
                <HierarchySelector HeirarchyType={'Branch'} EnableExclude={false}
                  Items={branches} EnableExclude={true} value={form.selectedBranches} onSelectChange={handleBranchChange}
                >
                </HierarchySelector>
              </Grid>
              <Grid item md={3}>
                <HierarchySelector HeirarchyType={'Area'} EnableExclude={false}
                  Items={areas} EnableExclude={true} value={form.selectedAreas} onSelectChange={handleAreaChange}
                >
                </HierarchySelector>
              </Grid>
              <Grid item md={3}>
                <HierarchySelector HeirarchyType={'Territory'} EnableExclude={false}
                  Items={territories} EnableExclude={true} value={form.selectedTerritories} onSelectChange={handleTerritoryChange}
                >
                </HierarchySelector>
              </Grid>
              <Grid item md={3}>
                <HierarchySelector HeirarchyType={'Distributor'} EnableExclude={true}
                  Items={distributors} value={form.selectedDistributors} onSelectChange={handleDistributorChange}>
                </HierarchySelector>
              </Grid>
              <Grid item md={3}>
                {retailers.length > 1 && (form.for == "retailer") &&
                  <HierarchySelector HeirarchyType={'Retailers'} Items={retailers} EnableExclude={true}
                    value={form.selectedRetailers} onSelectChange={handleRetailerChange}  >
                  </HierarchySelector>
                }
              </Grid>
            </Grid>
            {/* <Grid container>
         
            <Grid item >
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Region</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange1}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {regionList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
           

          </Grid> */}

          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br></br>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handlePanelChange('panel3')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Products</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              {productSelectList.map((control) => (
                <Grid item md={4} >
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">{control}</InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange1}
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {/* {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))} */}
                    </Select>
                  </FormControl> <br></br>

                  <Button variant="contained" color="primary">
                    Exclude
      </Button>
                </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br></br>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={handlePanelChange('panel4')}>
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


      </form>
      <Button
        variant="contained"
        color="primary"
        // onClick={() => { dispatch(Actions.setSideMenuData(form)); props.changeTab(1); }}
        type="button"

      >
        Save And Continue
    </Button>
    </div>


  );
}

export default SchemeSideMenu;
