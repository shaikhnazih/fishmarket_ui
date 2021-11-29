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


function EnrollmentDialog(props) {
    console.log('begining')
    const dispatch = useDispatch();
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [approvedCodes, setApprovedCodes] = useState([]);

    const enrollmentDialog = useSelector(({ projectDashboardApp }) => projectDashboardApp.workflow.enrollmentDialog);

    const initDialog = useCallback(
        () => {

            dispatch(Actions.getAssociateAddRequest(enrollmentDialog.wfTaskId))

        },
        [enrollmentDialog.wfTaskId],
    );


    useEffect(
        () => {
            console.log('===================enrollmentDialog.data=================');
            console.log(enrollmentDialog.data);

            console.log('====================================');
            if (enrollmentDialog.data) {
                setForm(enrollmentDialog.data.event.record)
            }

        },
        [enrollmentDialog.data],
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
        dispatch(Actions.closeEnrollmentDialog())
    }


    useEffect(() => {
        if (enrollmentDialog.props.open) {
            initDialog();
        }
    }, [enrollmentDialog.props.open, initDialog]);

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
        var data = enrollmentDialog.data;
        data.event.record = form;
        data.event.statusDesc = action==1?'Approved':'Rejected';
        data.event.statusCode = action;
        data.event.record.associates = form.approvedList;

        console.log('=================final Data===================');
        console.log(data);
        console.log('====================================');
        dispatch(Actions.updateAssociateWorkflow({ workflowTask: data, actionCode: action, comments: action == 1 ? 'Approved' : 'Rejected' }));
    }



    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...enrollmentDialog.props}
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
                        Enrollment Request
                        </Typography>

                </div>
            </AppBar>

            <DialogContent classes={{ root: "p-24" }}>

                <FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
                    <div>
                        <Card className="mx-auto  print:w-full print:p-8 shadow-none">

                            <CardContent className="p-88 print:p-0">

                                <div className="flex justify-between">

                                    <div>
                                        <table className="mb-16">
                                            <tbody>
                                                <tr>
                                                    <td className="pb-4">
                                                        <Typography className="font-light" variant="h6" color="textSecondary">
                                                            MembershipCode
                                                    </Typography>
                                                    </td>

                                                    <td className="pb-4 px-16">
                                                        <Typography className="font-light" variant="h6">
                                                            {form.membershipCode}
                                                        </Typography>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <Typography color="textSecondary">
                                                            Retailer Code
                                                    </Typography>
                                                    </td>
                                                    <td className="px-16">
                                                        <Typography>
                                                            {form.retailerCode}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Typography color="textSecondary">
                                                            Shop Name
                                                    </Typography>
                                                    </td>
                                                    <td className="px-16">
                                                        <Typography>
                                                            {form.shopName}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                    <td>
                                                        <Typography color="textSecondary">
                                                            DUE DATE
                                                    </Typography>
                                                    </td>
                                                    <td className="px-16">
                                                        <Typography>
                                                            {invoice.dueDate}
                                                        </Typography>
                                                    </td>
                                                </tr> */}
                                            </tbody>
                                        </table>


                                        <Typography color="textSecondary">
                                            Owners Name : {form.ownerName}
                                        </Typography>

                                        <Typography color="textSecondary">
                                            Mobile: {form.ownerMobile}
                                        </Typography>

                                        <Typography color="textSecondary">
                                            Email : {form.ownerEmail}
                                        </Typography>

                                    </div>

                                </div>

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
                        onClick={e=>handleSubmit(1)}
                    >Approve</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={e=>handleSubmit(2)}
                    >Reject</Button>
                </div>
            </DialogActions>


        </Dialog>
    );
}

export default EnrollmentDialog;
