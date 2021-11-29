import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography, Button, Tooltip } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import UsersMultiSelectMenu from './UserMultiSelectMenu';
import * as Constants from 'app/constants'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function UserList(props) {
    const dispatch = useDispatch();
    const users = useSelector(({ usersApp }) => usersApp.user.entities);
    const pages = useSelector(({ usersApp }) => usersApp.user.pages);
    const searchText = useSelector(({ usersApp }) => usersApp.user.searchText);
    const [filteredData, setFilteredData] = useState(null);
    const [loader, setLoader] = useState(true);
    const listQuery = useSelector(({ usersApp }) => usersApp.user.listQuery);


    useEffect(() => {
        dispatch(Actions.getUsers());
    }, [listQuery])



    useEffect(() => {

        if (users) {
            setFilteredData(users);
            setLoader(false);
        }
    }, [users]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no user!
                </Typography>
            </div>
        );
    }


    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>


            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditUserDialog(rowInfo.original));
                            }
                        }
                    }
                }}

                data={users}
                loading={loader}
                columns={[
                    {
                        Header: "Name",
                        id: "name",
                        accessor: (x => (x.displayName)),
                        sortable: false,

                    },
                    {
                        Header: "User Name",
                        id: "username",
                        accessor: (x => (x.username)),
                        sortable: false,
                    },
                    {
                        Header: "Membership Code",
                        id: "membershipcode",
                        accessor: (x => (x.membershipCode ? x.membershipCode : '-')),
                        sortable: false,
                    },
                    {
                        Header: "User Role",
                        id: "userroles",
                        accessor: (x => (x.roleNames)),
                        sortable: false,
                    },
                    {
                        Header: "Email",
                        id: "email",
                        accessor: (x => (x.email)),
                        sortable: false,
                    },
                    {
                        Header: "Mobile",
                        id: "mobile",
                        accessor: (x => (x.mobileNo)),
                        sortable: false,
                    },
                    {
                        Header: "Actions",
                        width: 300,
                        Cell: row => (
                            <div className="flex items-center">


                                <Tooltip id="edit-icon-1" title="Edit">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.openEditUserDialog(row.original))
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip id="edit-icon-2" title="Reset Password">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.openResetPasswordDialog(row.original))
                                        }}
                                    >
                                        <Icon>settings_backup_restore</Icon>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip id="edit-icon-13" title={row.original.isDisabled ? 'Activate' : 'Deactivate'}>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.updateUser({ ...row.original, isDisabled: !row.original.isDisabled }));
                                            setLoader(true);
                                        }}
                                    >
                                        <Icon>{row.original.isDisabled ? "check" : "cancel"}</Icon>
                                    </IconButton>
                                </Tooltip>
                                {row.original.membershipCode != null && !row.original.roleNames.includes('Employee') &&

                                    <Tooltip id="edit-icon-14" title="Reset Member">
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.resetMember({ ...row.original }));
                                                setLoader(true);
                                            }}
                                        >
                                            <Icon>sync</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }

                                {/* <Button
                                    onClick={(ev) => {

                                        ev.stopPropagation();
                                        // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                                        dispatch(Actions.updateUser({ ...row.original, isDisabled: !row.original.isDisabled }));
                                        setLoader(true);
                                    }}
                                >
                                    {row.original.isDisabled ? "Activate" : "Deactivate"}
                                </Button> */}
                                {/* <Button
                                    size="sm"

                                    onClick={(ev) => {

                                        ev.stopPropagation();
                                        dispatch(Actions.openResetPasswordDialog(row.original))
                                    }}
                                >
                                    {"Reset Password"}
                                </Button> */}
                                {/* {row.original.membershipCode != null && 
                                <Button
                                    onClick={(ev) => {

                                        ev.stopPropagation();
                                        // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                                        dispatch(Actions.resetMember({ ...row.original }));
                                        setLoader(true);
                                    }}
                                >
                                    {'Reset Member'}
                                </Button>} */}

                            </div>
                        )
                    }

                    // , {
                    //     Header: "Status",
                    //     id: "status",
                    //     accessor: (filteredData) => {
                    //         return filteredData.statusCode
                    //         // return (
                    //         //     (filteredData.statusCode.toString().trim() == "Pending") ?
                    //         //         (
                    //         //             <Icon className="text-green text-20">check_circle</Icon>) :
                    //         //         (
                    //         //             <Icon className="text-red text-20">remove_circle</Icon>
                    //         //         )
                    //         // )
                    //     },
                    // }
                ]}
                noDataText="No user found"
                className="-highlight"
                showPagination={true}
                showPaginationTop={false}
                showPaginationBottom={true}
                manual
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                pages={pages}
                defaultPageSize={10}
                onFetchData={(state, instance) => {

                    setLoader(true);
                    dispatch(Actions.setListQuery({ ...listQuery, pageSize: state.pageSize, currentPage: state.page + 1 }));
                }}
            />
        </FuseAnimate>


    );
}

export default UserList;
