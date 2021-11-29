import React from 'react';
import  SchemeHeader  from './SchemeHeader'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {FuseAnimate} from '@fuse';
import {Card, CardContent,Grid,TextField} from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 24, width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
  

function SchemeApp()
{

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
    const classes = useStyles();
    const [personName, setPersonName,age,setAge] = React.useState([]);
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
    const handleChange1 = (event) => {
        setPersonName(event.target.value);
        setAge(event.target.value);
      };

      const names = [
        'All',
        'Mumbai',
        'Delhi',
        'Chennai',
      ];
    return (

        <div className={classes.root}>
          <Grid container spacing={3}>
        <Grid item md={3}>
       
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Basic Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
        <Grid container>
            <Grid item md={6}><FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Scheme For</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Retailer</MenuItem>
          <MenuItem value={20}>Distributor</MenuItem>
          <MenuItem value={30}>Employee</MenuItem>
          <MenuItem value={40}>DMS</MenuItem>
        </Select>
      </FormControl></Grid>
            <Grid item md={6}> <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Product Line</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Fan</MenuItem>
          <MenuItem value={20}>Appliance</MenuItem>
          <MenuItem value={30}>Lighting</MenuItem>
          <MenuItem value={40}>Motors</MenuItem>
        </Select>
      

      </FormControl></Grid>

      <Grid item md={6}>

<FormControl  className={classes.formControl}>
<TextField id="standard-basic" label="Budget" />
</FormControl>
</Grid>
            <Grid item md={6}> <formControl className={classes.formControl}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
    
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Scheme Period"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
           </MuiPickersUtilsProvider>

      </formControl>
      </Grid>
      <Grid item md={6}> <formControl className={classes.formControl}>
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

      </formControl>
      </Grid>
          

        </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Geography</Typography>
           
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Producs</Typography>
          
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Notification</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Grid>
      </Grid>
      </div>
      
     
      
    )
}

export default SchemeApp;