import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedInput, TextField, TableCell, TableRow, TableBody, TableHead, Table, Card, CardContent, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar, Checkbox } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { FuseAnimate } from '@fuse';

import axios from 'axios';
import * as Constants from 'app/constants'
import { da } from 'date-fns/locale';

const defaultFormState = {
    approvedList: []
};


function ProfileChangeDialog(props) {
    console.log('begining')
    const dispatch = useDispatch();
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [approvedCodes, setApprovedCodes] = useState([]);

    const profileChangeDialog = useSelector(({ projectDashboardApp }) => projectDashboardApp.workflow.profileChangeDialog);

    const initDialog = useCallback(
        () => {

            dispatch(Actions.getUpdateProfileRequest(profileChangeDialog.wfTaskId))

        },
        [profileChangeDialog.wfTaskId],
    );


    useEffect(
        () => {
            console.log('===================profileChangeDialog.data=================');
            console.log(profileChangeDialog.data);

            console.log('====================================');
            if (profileChangeDialog.data) {
                setForm(profileChangeDialog.data.event.record)
            }

        },
        [profileChangeDialog.data],
    );




    useEffect(
        () => {
            console.log('=================form==============');
            console.log(form);
            console.log('====================================');

        },
        [form],
    );
    function closeComposeDialog() {
        dispatch(Actions.closeProfileChangeDialog())
    }


    useEffect(() => {
        if (profileChangeDialog.props.open) {
            initDialog();
        }
    }, [profileChangeDialog.props.open, initDialog]);

    const handleApproveCheckboxChange = function (e) {

        var approvedList = form.approvedList ? form.approvedList : [];

        if (e.target.checked) {
            if (approvedList.findIndex(it => it.code === e.target.name) == -1) {
                approvedList.push({ code: e.target.name });
            }
        }
        else {
            var index = approvedList.findIndex(it => it.code === e.target.name);
            if (index != -1) {
                approvedList.splice(index, 1);
            }
        }
        setForm({ ...form, approvedList: approvedList });
    }
    const handleSubmit = function (action) {
        var data = profileChangeDialog.data;
        data.event.record = form;
        data.event.statusDesc = action == 1 ? 'Approved' : 'Rejected';
        data.event.statusCode = action;
        data.event.record.associates = form.approvedList;

        console.log('=================final Data===================');
        console.log(data);
        console.log('====================================');
        dispatch(Actions.updateProfileWorkflow({ workflowTask: data, actionCode: action, comments: action == 1 ? 'Approved' : 'Rejected' }));
    }



    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...profileChangeDialog.props}
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
                        Profile Update Request
                        </Typography>

                </div>
            </AppBar>

            <DialogContent classes={{ root: "p-24" }}>

                <FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
                    <div>
                        <Card className="mx-auto  print:w-full print:p-8 shadow-none">

                            <CardContent className="p-88 print:p-0">
                                <div className="mt-64">
                                    <Table className="simple">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Field</b></TableCell>
                                                <TableCell><b>Old Value</b></TableCell>
                                                <TableCell><b>New Value</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            profileChangeDialog.data &&
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Shop Name</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.shopName}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.shopName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Account No</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.accountNo}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.accountNo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Bank Name</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.bankName}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.bankName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Contact Name</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.contactPersonName}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.contactPersonName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Date of Birth</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.dateOfBirth}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.dateOfBirth}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Aniversary Date</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.aniversaryDate}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.aniversaryDate}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>IFSC Code</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.ifscCode}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.ifscCode}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Mobile No</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.oldProfile.mobileNo}</TableCell>
                                                    <TableCell>{profileChangeDialog.data.event.record.newProfile.mobileNo}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>

                                </div>
                                {/* 
                                <div className="mt-96">

                                    <Typography className="mb-24 print:mb-12" variant="body1">Please pay within 15 days. Thank you for your business.</Typography>

                                    <div className="flex">

                                        <div className="flex-shrink-0">
                                            <img className="w-32" src="assets/images/logos/fuse.svg" alt="logo" />
                                        </div>

                                        <Typography className="font-medium mb-64 px-24" variant="caption" color="textSecondary">
                                            In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque
                                            scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit
                                            quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia.
                                            Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero
                                            tincidunt lacinia et eget eros.
                                    </Typography>
                                    </div>
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
                        onClick={e => handleSubmit(1)}
                    >Approve</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={e => handleSubmit(2)}
                    >Reject</Button>
                </div>
            </DialogActions>


        </Dialog>
    );
}

export default ProfileChangeDialog;
