import React, { useEffect, useState } from 'react';
import { Avatar, Table, TableHead, TableCell, TableRow, Typography, Paper, TableBody } from '@material-ui/core';
import ReactTable from "react-table";
import { Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import ProfileChangeDialog from '../approvalDialogs/ProfileChangeDialog';
import EnrollmentDialog from '../approvalDialogs/EnrollmentDialog';
import SchemeApprovalDialog from '../approvalDialogs/SchemeApprovalDialog';


import moment from 'moment'
function Widget11(props) {
    const [workflowItems, setWorkflowItems] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Actions.getWorkflowTasks())
    }, [])

    const workflows = useSelector(({ projectDashboardApp }) => projectDashboardApp.workflow);

    useEffect(() => {
        console.log('=========== workflows.items changed =========================');
        console.log(workflows.items);
        console.log('====================================');
        setWorkflowItems(workflows.items)
    }, [workflows])
    console.log('rendering')
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">Approval List</Typography>
                <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">{props.widget.table.rows.length + " Members"}</Typography>
            </div>
            <div className="table-responsive">

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <ReactTable
                        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                className: "cursor-pointer",
                                onClick: (e, handleOriginal) => {
                                    if (rowInfo) {
                                        //  dispatch(Actions.openEditNotificationsDialog(rowInfo.original));
                                    }
                                },
                            };
                        }}
                        data={workflowItems}
                        columns={[
                            {
                                Header: "Approval Type",
                                id: "eventType",
                                accessor: (data => data.event.recordType),
                            },
                            {
                                Header: "Title",
                                id: "Title",
                                accessor: (data => data.event.title),
                            },

                            {
                                Header: "Completed On",
                                id: "completedOn",
                                accessor: (data => (moment(data.completedOn).isValid() ? moment(data.completedOn).format("DD-MM-YYYY") : "-")),
                                className: "font-bold",
                            },
                            {
                                Header: "Status",
                                accessor: "statusDesc",
                            },
                            {
                                Header: "Actions",
                                width: 300,
                                Cell: row => (
                                    <div className="flex items-center">
                                        {/*                     
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.openEditGiftDialog(row.original))
                                            }}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.removeGift(row.original.id));
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton> */}
                                        <Button
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                console.log(row.original.recordType)
                                                var approvalType = row.original.event.recordType;
                                                if (approvalType == 'UpdateProfileRequest') {
                                                    dispatch(Actions.openProfileChangeDialog(row.original.id))
                                                }
                                                else if (approvalType == 'AddAssociateRequest') {
                                                    dispatch(Actions.openEnrollmentDialog(row.original.id))
                                                }
                                                else if (approvalType == 'Scheme') {
                                                    dispatch(Actions.openSchemeApprovalDialog({ wfTaskId: row.original.id }))
                                                }



                                                // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                                                //  dispatch(Actions.approveEvent({ ...row.original, isActive: row.original.isActive == 1 ? 0 : 1 }));
                                                //setLoader(true);
                                            }}
                                        >
                                            View
                                        </Button>
                                    </div>
                                )
                            }

                        ]}
                        defaultPageSize={10}
                        noDataText="No Approval Pending."
                    />
                </FuseAnimate>
                <ProfileChangeDialog />
                <EnrollmentDialog />
                <SchemeApprovalDialog />

            </div>
        </Paper>
    );
}

export default React.memo(Widget11);
