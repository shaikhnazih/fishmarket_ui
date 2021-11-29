import ReportHeader from './ReportHeader'
import React, { useEffect, useRef, useState, useParams, useMemo } from 'react';
import { Button, Dividerm, Hidden, Icon, IconButton, Input, Paper, InputAdornment, Typography, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HierarchySelector from '../../../customComponents/HierarchySelector'
import FormControl from '@material-ui/core/FormControl';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';
import ListItemText from '@material-ui/core/ListItemText';
import * as rootActions from 'app/store/actions';
import moment from 'moment';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FusePageCarded, DemoContent, FuseAnimateGroup } from '@fuse';
import ReportSideMenu from './ReportSideMenu';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import DateFnsUtils from '@date-io/date-fns';

function ReportApp(props) {
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [parameters, setParameter] = useState([]);
    var reportTypes = useSelector(({ reportApp }) => reportApp.report.reportTypes);
    var reportSchema = useSelector(({ reportApp }) => reportApp.report.reportSchema);

    useEffect(() => {
        dispatch(Actions.getReportTypes());
    }, [])

    const [open, setOpen] = React.useState(true);


    const handleReportTypeChange = (event, index) => {


        dispatch(Actions.getReportSchema({
            reportTypeCode: reportTypes[index].reportTypeCode
        }));


        setSelectedIndex(index);
        var params = [];
        reportTypes[index].filters.map((item, i) => {
            params.push({ name: item.filterName, value: null })

        })

        setParameter(params)

    };
    const handleDownload = () => {
        if (selectedIndex != null) {
            // dispatch(Actions.downloadExcel({ reportDetails: reportTypes[selectedIndex], parameters: parameters }));



            var query = {
                parameters: parameters,
                reportDetails: reportSchema
            }
            dispatch(Actions.exportToExcel(query))



        }
        else {

            dispatch(rootActions.showMessage({ message: "Please Select Report Type", variant: 'info' }))

        }
    }

    const handleDateFilterChange = (name, value1) => {

        var dat = moment(value1).utcOffset('+0530').format("MM-DD-YYYY");


        var index = parameters.findIndex(it => it.name == name);
        let newArray = [...parameters]
        newArray[index] = { ...newArray[index], value: dat }
        setParameter(newArray)
    }


    const handleFilterChange = (e) => {
        console.log('====================================');
        console.log(e.target.value);
        console.log('====================================');
    }



    const pageLayout = useRef(null);
    const useStyles = makeStyles({
        addButton: {
            position: 'absolute',
            right: 12,
            bottom: 12,
            zIndex: 99,
        }
    });
    const classes = useStyles(props);


    if (!reportTypes) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There Are No Reports Available!
        </Typography>{" "}
            </div>
        );
    }
    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <ReportHeader header={'Reports'} pageLayout={pageLayout} />
            }


            content={
                <div style={{ margin: '1% 1% 1% 1%', overflow: 'hidden' }}>
                    <Grid container spacing={2}>
                        <Grid item md={3} >

                            <ExpansionPanel expanded={true}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography className={classes.heading}>Report Types</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <List style={{ width: "100%" }}>
                                        <FuseAnimateGroup
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                            leave={{
                                                animation: "transition.slideUpBigOut"
                                            }}
                                        >
                                            {
                                                reportTypes.map((item, i) => (


                                                    < ListItem component="nav" selected={i === selectedIndex} onClick={(event) => handleReportTypeChange(event, i)} key={item.reportTypeCode} >
                                                        <ListItemIcon>
                                                            <ListIcon />
                                                        </ListItemIcon>

                                                        <ListItemText
                                                            primary={item.reportTypeName}

                                                        />


                                                    </ListItem>
                                                )
                                                )
                                            }
                                        </FuseAnimateGroup>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>




                        </Grid>
                        <Grid item md={9} >


                            <ExpansionPanel expanded={true} >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography className={classes.heading}>Report Filters</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container >
                                        {selectedIndex == null && <Typography>  Select Report Type</Typography>}
                                        {reportTypes.length > 0 && selectedIndex != null && reportTypes[selectedIndex].filters.map((item, i) => (

                                            <Grid item xs={12} md={3}>

                                                {item.filterDataType == "Datetime" && <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="endDate"
                                                        label={item.filterLabel}
                                                        name={item.filterName}
                                                        value={parameters[i].value}
                                                        autoOk={true}
                                                        onChange={(value) => { handleDateFilterChange(item.filterName, value) }}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    //   disabled={formDisabled}

                                                    />
                                                </MuiPickersUtilsProvider>}

                                                {item.filterDataType == "Text" && <FormControl className={classes.formControl}>
                                                    <TextField
                                                        className="mb-24"
                                                        id={item.filterName}
                                                        label={item.filterLabel}
                                                        name={item.filterName}
                                                        // value={parameters[i].value}
                                                        onChange={handleFilterChange}
                                                        // disabled={formDisabled}
                                                        //  variant="outlined"
                                                        fullWidth
                                                    />
                                                </FormControl>}

                                            </Grid>


                                        ))}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <Grid container>

                                <Grid item md={1} >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        size="medium"
                                        onClick={handleDownload}

                                    >
                                        Download
                             </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </ div >

            }
        />



    )
}


export default withReducer('reportApp', reducer)(ReportApp);
