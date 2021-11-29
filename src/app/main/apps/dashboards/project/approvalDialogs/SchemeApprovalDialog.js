import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, TextField, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as RootActions from 'app/store/actions'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment';

import axios from 'axios';
import * as Constants from 'app/constants'
import { da } from 'date-fns/locale';

const defaultFormState = {
    shopName: ''

};


function SchemeApprovalDialog(props) {
    const dispatch = useDispatch();
    const schemeApprovalDialog = useSelector(({ projectDashboardApp }) => projectDashboardApp.workflow.schemeApprovalDialog);

    const initDialog = useCallback(
        () => {
            console.log('===================schemeApprovalDialog=================');
            console.log(schemeApprovalDialog);
            console.log('====================================');

        },
        [schemeApprovalDialog.data],
    );

    function closeComposeDialog() {
        dispatch(Actions.closeSchemeApprovalDialog())
    }


    useEffect(() => {
        if (schemeApprovalDialog.props.open) {
            initDialog();
        }
    }, [schemeApprovalDialog.props.open, initDialog]);


    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...schemeApprovalDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        Approval
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">

                    <Typography variant="h6" color="inherit" className="pt-8">
                        SchemeApprovalRequest
                        </Typography>

                </div>
            </AppBar>

            <DialogContent classes={{ root: "p-24" }}>
                <div className="flex">
                    <Typography>

                        Content Here
                   </Typography>

                </div>

            </DialogContent>

            <DialogActions className="justify-between p-8">
                <div className="px-16">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Approve
                            </Button>
                </div>
            </DialogActions>


        </Dialog>
    );
}

export default SchemeApprovalDialog;
